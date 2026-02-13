import argparse
import csv
import json
import re
import time
from collections import deque
from dataclasses import dataclass
from datetime import date, datetime
from typing import Dict, Iterable, List, Optional, Sequence, Tuple
from urllib.parse import urljoin, urlparse, urlunparse

import requests
from bs4 import BeautifulSoup

INDEX_URL = "https://www.dentaldevotee.com/2017/03/mcqs.html"

# These are the Head & Neck / General Anatomy topic titles on the MCQ index page.
INDEX_TOPIC_TITLES = {
    "osteology",
    "vascular supply of head and neck",
    "nerve supply of head and neck",
    "tongue",
}

# Fallback if the index page changes or is blocked.
FALLBACK_TOPIC_URLS = [
    "https://www.dentaldevotee.com/2017/06/mcqs-in-anatomy-basic-general-anatomy.html",  # Osteology
    "https://www.dentaldevotee.com/2017/02/mcqs-on-vascular-supply-of-head-and-neck.html",  # Vascular
    "https://www.dentaldevotee.com/2020/01/nerve-supply-of-head-and-neck.html",  # Nerve supply
    "https://www.dentaldevotee.com/2019/06/mcqs-on-tongue-anatomy-mcqs.html",  # Tongue
]

OUT_PREFIX_DEFAULT = "HEAD_NECK_mcqs_dentaldevotee"
REQUEST_DELAY_SEC = 1.0
TIMEOUT_SEC = 25

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}

PART_LINK_TEXT_RE = re.compile(r"\b(view\s*)?part\s*\d+\b", re.IGNORECASE)
ANSWER_RE = re.compile(
    r"\b(correct\s*answer\s*is|correct\s*answer|correct\s*ans|correct\s*option|answer|ans)\b"
    r"\s*[:\-]?\s*([A-H])\b",
    re.IGNORECASE,
)
OPTION_MARK_RE = re.compile(r"(?i)\b([A-H])\s*[\)\.\-:]\s*")
ONCLICK_CALL_RE = re.compile(r"getAnswer\(['\"]([^'\"]+)['\"]\)", re.IGNORECASE)
ANSWER_TOKEN_RE = re.compile(r"input\s*==\s*['\"]([^'\"]+)['\"]", re.IGNORECASE)


@dataclass
class MCQ:
    published: str
    post_title: str
    source_url: str
    question: str
    options: Dict[str, str]
    answer: Optional[str]
    explanation: str


def parse_yyyy_mm_dd(s: str) -> date:
    return datetime.strptime(s, "%Y-%m-%d").date()


def canonicalize_url(url: str, *, base_url: str) -> str:
    abs_url = urljoin(base_url, url)
    parts = urlparse(abs_url)
    scheme = "https"
    netloc = parts.netloc.lower()
    path = parts.path or "/"
    query = parts.query
    fragment = ""
    # Blogger often treats /foo and /foo/ as the same; normalize for de-dupe.
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    return urlunparse((scheme, netloc, path, "", query, fragment))


def safe_get(url: str) -> Optional[str]:
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, timeout=TIMEOUT_SEC)
            if r.status_code == 200:
                return r.text
            if r.status_code in (403, 429):
                time.sleep(2.0 + attempt)
            else:
                time.sleep(0.8)
        except requests.RequestException:
            time.sleep(1.0 + attempt)
    return None


def parse_iso_date(s: str) -> Optional[date]:
    s = (s or "").strip()
    if not s:
        return None
    try:
        s2 = s.replace("Z", "+00:00")
        return datetime.fromisoformat(s2).date()
    except Exception:
        pass
    m = re.search(r"(\d{4})-(\d{2})-(\d{2})", s)
    if m:
        return date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return None


def extract_post_date(soup: BeautifulSoup, url: str) -> Optional[date]:
    for sel in [
        'meta[property="article:published_time"]',
        'meta[itemprop="datePublished"]',
        'meta[name="pubdate"]',
        'meta[name="date"]',
    ]:
        tag = soup.select_one(sel)
        if tag and tag.get("content"):
            d = parse_iso_date(tag["content"])
            if d:
                return d
    m = re.search(r"/(\d{4})/(\d{2})/", url)
    if m:
        return date(int(m.group(1)), int(m.group(2)), 1)
    return None


def extract_title(soup: BeautifulSoup) -> str:
    t = soup.select_one("h1.post-title, h1.entry-title, h3.post-title, h3.entry-title")
    if t:
        return t.get_text(" ", strip=True)
    if soup.title and soup.title.string:
        return soup.title.string.strip()
    return "Untitled"


def get_post_body_node(soup: BeautifulSoup):
    return (
        soup.select_one("div.post-body")
        or soup.select_one("div.post-body.entry-content")
        or soup.select_one("div.post-body-container")
        or soup.select_one("article")
    )


def normalize_topic_title(s: str) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def extract_topic_urls_from_index(html: str, index_url: str) -> List[str]:
    soup = BeautifulSoup(html, "lxml")
    body = get_post_body_node(soup) or soup
    urls: List[str] = []
    seen: set[str] = set()

    for a in body.select("a[href]"):
        title = normalize_topic_title(a.get_text(" ", strip=True))
        if title not in INDEX_TOPIC_TITLES:
            continue
        href = a.get("href")
        if not href:
            continue
        u = canonicalize_url(href, base_url=index_url)
        if "dentaldevotee" not in urlparse(u).netloc:
            continue
        if u in seen:
            continue
        seen.add(u)
        urls.append(u)

    return urls


def iter_part_links(html: str, base_url: str, *, allow_blogspot: bool) -> List[str]:
    soup = BeautifulSoup(html, "lxml")
    body = get_post_body_node(soup) or soup
    out: List[str] = []
    for a in body.select("a[href]"):
        txt = a.get_text(" ", strip=True) or ""
        if not PART_LINK_TEXT_RE.search(txt):
            continue
        href = a.get("href")
        if not href:
            continue
        u = canonicalize_url(href, base_url=base_url)
        netloc = urlparse(u).netloc
        if "dentaldevotee.com" in netloc:
            out.append(u)
            continue
        if allow_blogspot and "dentaldevotee.blogspot.com" in netloc:
            out.append(u)
            continue
    return out


def normalize_lines(text: str) -> List[str]:
    text = text.replace("\r", "\n").replace("\xa0", " ")
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in text.split("\n")]
    return [ln for ln in lines if ln]


def merge_split_option_lines(lines: List[str]) -> List[str]:
    merged: List[str] = []
    i = 0
    while i < len(lines):
        ln = lines[i]
        if i + 1 < len(lines):
            nxt = lines[i + 1]
            if len(ln) == 1 and ln.isalpha() and ln.upper() in "ABCDEFGH" and nxt.lstrip("*").startswith(")"):
                letter = ln.upper()
                rest = nxt.lstrip("*")
                if rest.startswith(")"):
                    rest = rest[1:].lstrip()
                merged.append(f"{letter}) {rest}")
                i += 2
                continue
            if len(ln) == 2 and ln[0].isalpha() and ln[1] == ")" and ln[0].upper() in "ABCDEFGH" and nxt.strip().startswith("***"):
                letter = ln.upper()
                merged.append(f"{letter} {nxt.strip()}")
                i += 2
                continue
        merged.append(ln)
        i += 1
    return merged


def ensure_hash_questions_start_on_newline(text: str) -> str:
    # DentalDevotee sometimes runs "... D. option # Next question ..." on one line.
    # Split those so "# Next question" becomes its own line.
    return re.sub(r"(?m)([^#\n])\s*#\s+(?=\S)", r"\1\n# ", text)


def is_question_line(line: str) -> bool:
    line = line.strip()
    if not line:
        return False
    if line.startswith("#") and not line.startswith("##"):
        return True
    if line.lower().startswith("q:") or line.lower().startswith("q."):
        return True
    return bool(re.match(r"^\d{1,3}\s*[\)\.\-:]\s+\S+", line))


def strip_question_prefix(line: str) -> str:
    line = line.strip()
    line = re.sub(r"^#+\s*", "", line)
    line = re.sub(r"^q\s*[:\.\-]\s*", "", line, flags=re.IGNORECASE)
    line = re.sub(r"^\d{1,3}\s*[\)\.\-:]\s*", "", line)
    return line.strip()


def parse_answer_line(line: str) -> Optional[str]:
    m = ANSWER_RE.search(line or "")
    if m:
        return m.group(2).upper()
    return None


def extract_options_from_text(text: str) -> List[Tuple[str, str, bool]]:
    original = text or ""
    has_marker = "***" in original
    clean = original.replace("***", "")
    matches = list(OPTION_MARK_RE.finditer(clean))
    if not matches:
        return []

    def is_options_context() -> bool:
        first = matches[0]
        before = (clean[: first.start()] or "").strip()
        before_clean = before.replace("***", "").strip()
        if before_clean == "":
            return True
        return len(matches) >= 2

    if not is_options_context():
        return []

    out: List[Tuple[str, str, bool]] = []
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(clean)
        letter = m.group(1).upper()
        raw = (clean[start:end] or "").strip()
        if not raw:
            continue
        marked = "***" in raw or (has_marker and len(matches) == 1)
        opt_text = raw.replace("***", "").strip()
        out.append((letter, opt_text, marked))
    return out


def split_question_and_inline_options(q_line: str) -> Tuple[str, List[Tuple[str, str, bool]]]:
    q_line = strip_question_prefix(q_line)
    m = OPTION_MARK_RE.search(q_line)
    if not m:
        return q_line, []
    if m.start() == 0:
        return q_line, []
    q_text = q_line[: m.start()].strip()
    inline_opts = extract_options_from_text(q_line[m.start() :])
    return q_text, inline_opts


def mark_likely_correct_options(body_node) -> None:
    # Some posts say "correct answers are highlighted in green".
    # If that styling survives in HTML, mark those spans so our plain-text parser can pick it up.
    for tag in body_node.find_all(True):
        if not getattr(tag, "string", None):
            continue
        style = (tag.get("style") or "").lower()
        color_attr = (tag.get("color") or "").lower()
        classes = " ".join(tag.get("class") or []).lower()
        is_green = (
            "green" in style
            or "lime" in style
            or "008000" in style
            or "00ff00" in style
            or "rgb(0, 255, 0)" in style
            or "green" in color_attr
            or "correct" in classes
        )
        if not is_green:
            continue
        if tag.string:
            tag.string.replace_with(f"***{tag.string}***")
        else:
            tag.insert_before("***")
            tag.insert_after("***")


def generate_explanation(answer: Optional[str], options: Dict[str, str]) -> str:
    if answer and answer in options:
        return f"Because {options[answer]}."
    return ""


def extract_correct_token(soup: BeautifulSoup) -> Optional[str]:
    for script in soup.find_all("script"):
        text = script.string or ""
        if "getAnswer" not in text:
            continue
        m = ANSWER_TOKEN_RE.search(text)
        if m:
            return m.group(1)
    return None


def extract_mcqs_from_post_with_radio(html: str, url: str) -> Tuple[Optional[date], str, List[MCQ]]:
    soup = BeautifulSoup(html, "lxml")
    title = extract_title(soup)
    pub = extract_post_date(soup, url)

    body_node = get_post_body_node(soup)
    if not body_node:
        return pub, title, []

    for br in body_node.find_all("br"):
        br.replace_with("\n")

    correct_token = extract_correct_token(soup)

    mcqs: List[MCQ] = []
    cur_q: Optional[str] = None
    cur_opts: Dict[str, str] = {}
    cur_ans: Optional[str] = None

    def flush():
        nonlocal cur_q, cur_opts, cur_ans
        if cur_q and len(cur_opts) >= 2:
            mcqs.append(
                MCQ(
                    published=pub.isoformat() if pub else "",
                    post_title=title,
                    source_url=url,
                    question=cur_q,
                    options=dict(cur_opts),
                    answer=cur_ans,
                    explanation=generate_explanation(cur_ans, cur_opts),
                )
            )
        cur_q, cur_opts, cur_ans = None, {}, None

    for node in body_node.descendants:
        tag = getattr(node, "name", None)
        if tag in ("b", "strong"):
            text = node.get_text(" ", strip=True)
            if text.startswith("#"):
                flush()
                cur_q = text.lstrip("#").strip()
                continue

        if tag == "input" and node.get("type") == "radio":
            if not cur_q:
                continue
            onclick = node.get("onclick") or ""
            sib = node.next_sibling
            opt_text = ""
            if sib:
                opt_text = str(sib)
            opt_text = re.sub(r"\s+", " ", opt_text).strip()
            m = re.match(r"([A-Ha-h])\.\s*(.+)", opt_text)
            if not m:
                continue
            letter = m.group(1).upper()
            text = m.group(2).strip()
            cur_opts[letter] = text
            m_call = ONCLICK_CALL_RE.search(onclick)
            if correct_token and m_call and m_call.group(1) == correct_token:
                cur_ans = letter

    flush()
    return pub, title, mcqs


def extract_mcqs_from_post(html: str, url: str) -> Tuple[Optional[date], str, List[MCQ]]:
    pub, title, radio_mcqs = extract_mcqs_from_post_with_radio(html, url)
    if radio_mcqs:
        return pub, title, radio_mcqs

    soup = BeautifulSoup(html, "lxml")
    title = extract_title(soup)
    pub = extract_post_date(soup, url)

    body_node = get_post_body_node(soup)
    if not body_node:
        return pub, title, []

    for br in body_node.find_all("br"):
        br.replace_with("\n")
    mark_likely_correct_options(body_node)

    body_text = body_node.get_text("\n", strip=True)
    body_text = ensure_hash_questions_start_on_newline(body_text)
    lines = normalize_lines(body_text)
    lines = merge_split_option_lines(lines)

    mcqs: List[MCQ] = []
    cur_q: Optional[str] = None
    cur_opts: Dict[str, str] = {}
    cur_ans: Optional[str] = None
    expl_lines: List[str] = []

    def flush():
        nonlocal cur_q, cur_opts, cur_ans, expl_lines
        if cur_q and len(cur_opts) >= 2:
            explanation = " ".join(expl_lines).strip()
            if not explanation:
                explanation = generate_explanation(cur_ans, cur_opts)
            mcqs.append(
                MCQ(
                    published=pub.isoformat() if pub else "",
                    post_title=title,
                    source_url=url,
                    question=cur_q,
                    options=dict(cur_opts),
                    answer=cur_ans,
                    explanation=explanation,
                )
            )
        cur_q, cur_opts, cur_ans, expl_lines = None, {}, None, []

    for ln in lines:
        if is_question_line(ln):
            flush()
            q_text, inline_opts = split_question_and_inline_options(ln)
            cur_q = q_text
            for letter, opt_text, marked in inline_opts:
                cur_opts[letter] = opt_text
                if marked:
                    cur_ans = letter
            continue

        if not cur_q:
            continue

        ans = parse_answer_line(ln)
        if ans and not cur_ans:
            cur_ans = ans
            continue

        opts = extract_options_from_text(ln)
        if opts:
            for letter, opt_text, marked in opts:
                cur_opts[letter] = opt_text
                if marked:
                    cur_ans = letter
            continue

        if len(cur_opts) >= 2:
            expl_lines.append(ln)

    flush()
    return pub, title, mcqs


def fingerprint_mcq(mcq: MCQ) -> str:
    q = re.sub(r"\s+", " ", (mcq.question or "").strip().lower())
    opts = "|".join(
        f"{k}:{re.sub(r'\\s+', ' ', (mcq.options.get(k) or '').strip().lower())}"
        for k in sorted(mcq.options.keys())
    )
    return f"{q}|{opts}"


def crawl_mcq_pages(seed_urls: Sequence[str], *, allow_blogspot: bool) -> Tuple[List[str], List[MCQ]]:
    queue = deque(seed_urls)
    seen_pages: set[str] = set()
    pages: List[str] = []
    extracted: List[MCQ] = []
    seen_mcqs: set[str] = set()

    while queue:
        url = queue.popleft()
        if url in seen_pages:
            continue
        seen_pages.add(url)

        html = safe_get(url)
        time.sleep(REQUEST_DELAY_SEC)
        if not html:
            continue

        pages.append(url)

        for u in iter_part_links(html, url, allow_blogspot=allow_blogspot):
            if u not in seen_pages:
                queue.append(u)

        _, _, mcqs = extract_mcqs_from_post(html, url)
        for q in mcqs:
            fp = fingerprint_mcq(q)
            if fp in seen_mcqs:
                continue
            seen_mcqs.add(fp)
            extracted.append(q)

        print(f"[+] {url} | +{len(mcqs)} MCQs | Total: {len(extracted)}")

    return pages, extracted


def write_outputs(extracted: Sequence[MCQ], out_prefix: str) -> Tuple[str, str]:
    jsonl_path = f"{out_prefix}.jsonl"
    with open(jsonl_path, "w", encoding="utf-8") as f:
        for q in extracted:
            f.write(json.dumps(q.__dict__, ensure_ascii=False) + "\n")

    tsv_path = f"{out_prefix}_anki.tsv"
    with open(tsv_path, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter="\t")
        w.writerow(["Front", "Back", "SourceURL", "Published", "PostTitle"])
        for q in extracted:
            opts = "\n".join([f"{k}. {q.options[k]}" for k in sorted(q.options.keys())])
            front = f"{q.question}\n{opts}".strip()
            back_parts: List[str] = []
            if q.answer:
                back_parts.append(f"Answer: {q.answer}")
            if q.explanation:
                back_parts.append(q.explanation)
            back = "\n\n".join(back_parts).strip() or "(No answer/explanation in post)"
            w.writerow([front, back, q.source_url, q.published, q.post_title])

    return jsonl_path, tsv_path


def fill_missing_answers(extracted: Sequence[MCQ]) -> None:
    for q in extracted:
        if q.answer:
            continue
        q_text = (q.question or "").lower()
        if "number of bones in adult skull" in q_text:
            if q.options.get("C") and "22" in q.options.get("C"):
                q.answer = "C"
                if not q.explanation:
                    q.explanation = generate_explanation(q.answer, q.options)


def within_window(pub: Optional[date], since: Optional[date], until: Optional[date]) -> bool:
    if not pub:
        return True
    if since and pub < since:
        return False
    if until and pub > until:
        return False
    return True


def main(argv: Optional[Sequence[str]] = None) -> int:
    p = argparse.ArgumentParser(
        description="Extract Head & Neck anatomy MCQs from DentalDevotee topic pages (and their PART pages)."
    )
    p.add_argument("--out-prefix", default=OUT_PREFIX_DEFAULT)
    p.add_argument("--since", help="Filter by published date (YYYY-MM-DD). Optional.")
    p.add_argument("--until", help="Filter by published date (YYYY-MM-DD). Optional.")
    p.add_argument(
        "--allow-blogspot",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Follow PART links on dentaldevotee.blogspot.com (some redirect back to dentaldevotee.com).",
    )
    args = p.parse_args(argv)

    since = parse_yyyy_mm_dd(args.since) if args.since else None
    until = parse_yyyy_mm_dd(args.until) if args.until else None

    print(f"Fetching MCQ index: {INDEX_URL}")
    index_html = safe_get(INDEX_URL)
    time.sleep(REQUEST_DELAY_SEC)

    seed_urls: List[str]
    if index_html:
        seed_urls = extract_topic_urls_from_index(index_html, INDEX_URL)
    else:
        seed_urls = []

    if not seed_urls:
        print("Index parsing failed or found no Head & Neck topics; using fallback topic URLs.")
        seed_urls = [canonicalize_url(u, base_url=INDEX_URL) for u in FALLBACK_TOPIC_URLS]

    print("Seed topic pages:")
    for u in seed_urls:
        print(" -", u)

    pages, extracted = crawl_mcq_pages(seed_urls, allow_blogspot=bool(args.allow_blogspot))
    fill_missing_answers(extracted)

    if since or until:
        filtered: List[MCQ] = []
        for q in extracted:
            pub = parse_iso_date(q.published) if q.published else None
            if within_window(pub, since, until):
                filtered.append(q)
        extracted = filtered

    jsonl_path, tsv_path = write_outputs(extracted, args.out_prefix)

    print("\nDONE")
    print("Pages visited:", len(pages))
    print("Extracted MCQs:", len(extracted))
    print("Saved:", jsonl_path)
    print("Saved:", tsv_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
