export const IMPRESSION_KEY_POINTS = [
    "Alginate/Agar (Hydrocolloids) are unstable; pour immediately due to syneresis/imbibition.",
    "Condensation reactions release by-products (Water for Polysulfide, Alcohol for C-Silicone) causing shrinkage.",
    "Addition Silicone (PVS) is the most stable (No by-product) but inhibited by Sulfur in Latex gloves.",
    "Polyether is the most hydrophilic elastomer but is very stiff (careful with undercuts).",
    "Thixotropic materials flow under pressure but stay in place when static.",
    "Rapid 'snap' removal of viscoelastic materials reduces permanent deformation."
];

export const IMPRESSION_MATERIALS_NOTES = `
# Impression Materials — Detailed impression like cements are one of the highest yield topics so detail of them must DO

### Why impressions matter

* An impression is a **negative** reproduction of teeth and oral tissues.
* A cast/model is the **positive** reproduction poured from the impression. Accurate prostheses (crowns, RPDs, complete dentures) depend on an accurate impression and a stable cast.

---

## 1) Key glossary (high-yield meanings)

### Polymer / setting chemistry

* **Accelerator:** compound that speeds a reaction (often loosely used for “catalyst” in impression materials).
* **Catalyst:** reduces activation energy and is not consumed (in dentistry the term is sometimes misused for the “reactor/initiator” component).
* **Initiator:** starts polymerization (chemical / heat / photo).
* **Polymerization:** small molecules → long chains (polymers).
* **Addition reaction (chain-growth):** chains grow to maximum length **without by-products** (classic idea).
* **Condensation reaction (step-growth):** monomers form dimers → trimers → long chains; condensation impression materials produce **by-products** (e.g., water/alcohol).
* **Cross-linking:** joining polymer chains into a 3-D network (turns a paste into an elastic “rubber”).

![Polymerization Chemistry](assets/impression_chemistry.png)

![Rheology Diagram](assets/rheology_diagram.png)

### Material behavior terms you’re tested on

1. **Rheology:** science of flow/viscosity.

   **Pseudoplasticity (shear thinning):** viscosity ↓ immediately when shear ↑; returns **immediately** when shear stops.(toothpaste example it becomes thin/flows when u squeeze it )

2. **Thixotropy (time-dependent shear thinning):**

   **Under continuous stress/shear → viscosity gradually decreases (gets more fluid).**
   **When stress stops → it doesn’t snap back; it thickens slowly over time (time-dependent recovery).**

| Feature | Pseudoplasticity | Thixotropy |
| :--- | :--- | :--- |
| **Reaction to Shear** | Becomes Thinner | Becomes Thinner |
| **Recovery Speed** | Immediate (Instant) | Delayed (Takes Time) |
| **Clinical Feel** | Flows when pushed, freezes when stopped. | Flows when pushed, stays runny for a moment, then thickens. |
| **Key Word** | "Shear Rate" dependent | "Time" dependent |

3. **Viscoelasticity:** acts more like an elastic solid when strained quickly, but **deforms over time** (creep) when the load is slow or prolonged — so **fast “snap” removal reduces distortion** (good for impression as no distortion=accuracy), while slow removal increases deformation.
4. **Set:** rigid/elastic enough to remove without permanent deformation.
5. **Setting time:** mixing start → loss of flow/plasticity (clinically: safe removal time).part to flow, causing permanent distortion.

### Tear Energy vs. Tear Strength

* **Tear Strength:** Force needed to break the material.
* **Tear Energy:** Accounts for how much the material stretches before breaking.

* **Polysulfide** has high tear energy (stretches a lot).
* **PVS** has lower tear energy but better recovery

**Hydrocolloid water balance (common MCQ traps)**

![Hydrocolloid Water Balance](assets/syneresis_imbibition.png)

6. **Syneresis:** gel **loses** fluid onto its surface → **shrinkage**.
7. **Imbibition:** gel **absorbs** water when immersed → **swelling**.
8. **Gelation:** sol → gel transformation.
9. **Micelle / fibrils:** the “brush-heap” network that traps water inside the gel structure.

### Clinical geometry

* **Undercuts:** recessed areas that make removal harder and increase tearing/distortion risk.
* **Inelastic:** cannot sustain meaningful elastic deformation; fractures if forced over undercuts. It will fracture instead of flexing — it breaks like glass, not deforms like rubber.

---

## 2) “Ideal impression material” requirements (7-point checklist)

To produce accurate replicas, impression materials should be:

1. Fluid enough to adapt to tissues
2. Viscous enough to stay in the tray
3. Set in a reasonable time (commonly targeted < 7 min)
4. Resist tearing/distortion on removal
5. Dimensionally stable long enough to pour casts (sometimes multiple pours)
6. Biocompatible
7. Cost-effective (time + equipment)

### Critical question answers ()

* **Which criteria relate to time in the mouth?**
  Mainly (3) setting within a reasonable time and (the practical side of) (1–2) handling during working time so it can be seated before setting progresses too far.
* **Which one is mainly about the set impression?**
  (4) resistance to tearing/distortion during removal and (5) dimensional stability after set (these are “set material” performance).

---

## 3) Classification of impression materials (the clean way to remember)

### A) By setting mechanism

**Reversible (physical change; can soften again with heat)**

* **Impression compound** (thermoplastic)
* **Agar** (reversible hydrocolloid; sol↔gel by temperature)

**Irreversible (chemical reaction; cannot revert in clinic)**

* **Alginate** (irreversible hydrocolloid)
* **Elastomers:** polysulfide, silicones, polyether
* **ZOE paste, impression plaster**

### B) By mechanical behavior after set

**Inelastic (rigid; fractures over undercuts)**

* Impression plaster, ZOE, impression compound

**Elastic (flexible; can pass mild undercuts and rebound)**

* Hydrocolloids (agar/alginate) + elastomers

### C) By Pressure Applied on Tissues

This divides materials based on whether they push (displace) the gum tissue or record it in a resting state.

1. **Mucostatic (Non-Pressure)**

* **Concept:** Records the tissue in its passive, resting state without displacing it.
* **Characteristics:** These materials are very runny (low viscosity) and flow easily.
* **Examples:**
  * Impression Plaster (The classic example)
  * Zinc Oxide Eugenol (ZOE)
  * Light Body Elastomers (very thin mix)

2. **Mucocompressive (Pressure / Displacement)**

* **Concept:** Compresses and displaces the soft tissue while taking the impression.
* **Characteristics:** These materials are thick (high viscosity) and require force to seat the tray.
* **Examples:**
  * Impression Compound (The classic example)
  * Putty Elastomers
  * Soft Liners (when used functionally)

### The 6 big clinical steps (fixed prosthetic workflow) <span style="color: red; font-weight: bold;">can skip this</span>

1. **Tray selection/prep** (adhesive, rigidity, custom vs stock)
2. **Tissue management** (retraction, hemostasis, moisture control)
3. **Mixing / loading** (hand, static automix, dynamic)
4. **Impression technique** (multiple-mix, monophase, putty-wash)
5. **Removal** (proper set + snap removal)
6. **Pouring casts/dies** (stone compatibility, surfactants for silicones)

![Clinical Steps](assets/clinical_steps.png)

# 5) Each impression material — composition, setting, pros/cons, handling

## A) Alginate (Irreversible hydrocolloid)

### What it is

* **Elastic, hydrophilic**, easy/cheap for study models, preliminary impressions, many removable cases.

### Composition essentials (<span style="color: red">what you must know</span>)

* **Soluble alginate** (e.g., sodium/potassium alginate) = main polymer
* **Calcium sulfate** = provides Ca²⁺ to cross-link (reactor)
* **Trisodium phosphate** = **retarder** (controls working time)
* **Fillers** (diatomaceous earth) = strength/body
* **Potassium titanium fluoride** = gypsum surface hardener/accelerator for better stone surface

### Setting reaction (classic exam explanation)

1. Retarder stage: Ca²⁺ reacts **first** with phosphate (slows gelation)
2. After phosphate is used up: Ca²⁺ cross-links alginate chains → **calcium alginate gel**

### Controlling setting time (safe vs unsafe)

* **Safe:** change **water temperature** (warmer = faster set; cooler = slower).
* **Not ideal:** changing W/P ratio or mixing time too much → can weaken gel, change elasticity/tear behavior.

### Proper mixing (why water-first matters)

* **Water first, then powder:** prevents dry pockets at the bottom, reduces lumps, shortens mixing time—especially important for fast-set alginate.

### Removal & distortion control

* Don’t remove too early: alginate’s strength/elasticity improves shortly after gelation.
* Remove with a **quick snap** (viscoelastic material: shorter strain time = less permanent deformation).

### Dimensional stability (big pitfall)

* **Syneresis (shrink) in air + imbibition (swell) in water** → pour **immediately** whenever possible.
* If you must delay: wrap in a **damp** towel + sealed bag (humid environment), don’t soak in water.

### Disinfection (practical, minimal distortion)

* Prefer **spray + wrap + sealed bag (≈10 min)** rather than long immersion (immersion can distort). Keep immersion short if used.

### Typical uses

* Diagnostic casts, orthodontic models, preliminary impressions, many removable partial denture impressions (when ultra-fine detail isn’t critical).

---

## B) Agar (Reversible hydrocolloid)

### What it is

* **Elastic, hydrophilic**, very accurate detail, but needs **special equipment** (conditioning unit + water-cooled trays often).

### Sol ↔ gel mechanism

* **Heat** → gel becomes sol (liquefaction)
* **Cooling** → sol becomes gel (gelation)

### The 3-bath conditioning unit (a favorite theory question)

* **Boil ~100°C (≈10 min):** liquefy
* **Store ~65°C:** keep as sol until needed
* **Temper ~46°C (short time):** cool to safe handling temp before seating

### Key problems

* **Syneresis + evaporation** → shrinkage if left out
* **Imbibition** → swelling if immersed
* Must **pour immediately** (or maintain near-100% humidity if delayed).

### Clinical note (why it’s less common now)

* Technique-sensitive, extra equipment, tears more easily vs elastomers.

---

## Elastomeric impression materials (rubber impressions)

### What makes an elastomer an elastomer?

* Polymer-based materials that **cross-link** on setting into a rubbery network.
* Typically supplied as **base + catalyst/accelerator** systems in different viscosities (light, medium, heavy, putty).

### C) Polysulfide (Elastomer; condensation-type)

**Composition essentials**

* **Base paste:** polysulfide polymer with mercaptan (-SH), fillers, plasticizer; may include sulfur accelerator.
* **Catalyst/accelerator paste:** traditionally includes **lead dioxide** (brown color) + fillers/plasticizer; retarders (oleic/stearic acid) to control set.

**Setting reaction + by-product**

* Cross-linking occurs; **water is produced as by-product** (important for stability).
* Loss of this by-product over time → dimensional change → **pour early**.

**Properties (how it behaves clinically)**

* **High tear resistance** (good for thin sulcus areas)
* More flexible / lower stiffness vs many elastomers → easier removal from undercuts
* <span style="color: red">Odor, can stain</span>, longer working/setting times
* Often benefits from **custom tray** to reduce bulk and shrink-related distortion

**Best for**

* Cases where tear resistance and flexibility matter, but you can pour promptly and manage odor/handling.

---

### D) Condensation silicone

**Key idea**

* Sets by cross-linking and produces a volatile by-product (alcohol) → evaporation → shrinkage → **pour immediately** is the rule.

**Clinical technique tied to the chemistry**

* **Putty-wash** was popular to reduce shrink effects (less wash bulk; putty acts like an intraoral custom tray).

**Main disadvantage**

* Hydrophobic + by-product → stability issues if delayed.

---

## E) Addition silicone (PVS / VPS)

**Why it’s loved**

* Addition polymerization: **no classic volatile by-product**, so it’s **dimensionally stable** and can be poured multiple times (clinically very forgiving).

**Practical pitfalls to remember**

* **Hydrogen gas release** can create bubbles/voids in stone if poured too soon (many products include scavengers; otherwise delay pour).
* **Latex/sulfur inhibition:** sulfur compounds can inhibit set if the prep/tooth was touched with latex gloves (very testable).

**Hydrophobicity vs “hydrophilized PVS”**

* Standard PVS is hydrophobic; “hydrophilized” versions add surfactants to improve wettability during pouring.

**Best for**

* Fixed prosthesis (crowns/bridges), implant impressions (with proper technique), multiple pours, when you need maximum stability.

---

### F) Polyether

**What makes it different?**

* Generally the <span style="color: red">most hydrophilic</span> elastomer group → good wetting, good detail in moist environments compared with silicones.
* Typically <span style="color: red">stiffer</span> (higher modulus) than many others → can be harder to remove from significant undercuts.
* Must avoid long immersion disinfection (water uptake → distortion).

**Slide points to remember**

* Base + catalyst pastes; good mechanical/compressive properties; available in viscosities.

**Best for**

* Accurate impressions where moisture control is challenging, and undercuts are controlled/blocked.

---

# 6) Inelastic impression materials

## A) ZOE (Zinc Oxide–Eugenol) impression paste

**What it’s used for**

* Edentulous mucostatic impressions, bite registrations, surgical dressings, etc.

**Why it sets faster in humidity (the exam explanation)**

* Setting is **moisture-assisted**: zinc oxide hydrolyzes toward zinc hydroxide; eugenol reacts to form zinc eugenolate. More moisture → faster progress.

**Pros/cons**

* **Very stable dimensionally** once set (great for storing).
* **Rigid/inelastic** → not for undercuts.
* Eugenol can irritate/sting; EBA substitutes reduce irritation.

## B) Impression plaster <span style="color: red">not used</span>

* Very fluid → mucostatic soft-tissue impressions.
* Brittle → may need to fracture to remove over undercuts, then reassemble.
* Useful in some implant splinting/transfer contexts because rigidity can stabilize components.

## C) Impression compound (modeling plastic)

**Temperature behavior is everything**

* **Thermoplastic:** soft on heating, hard on cooling (reversible).
* Low thermal conductivity → needs **uniform slow heating** and thorough cooling before removal to avoid warping.

**Clinical uses**

* Primary impressions for edentulous cases (tray compound)
* Border molding for custom trays
* Often combined with a “wash” material (ZOE, plaster, hydrocolloid, elastomer) for secondary impression.

---

# 7) Mixing system <span style="color: red; font-weight: bold;">can skip</span>

## Hand mixing

* Equal lengths of base/catalyst; mix to uniform color, avoid streaks.

## Static automix (cartridge + mixing tip)

* Stationary helical elements **split and recombine** streams repeatedly → many thin layers → uniform mix with fewer voids.

## Dynamic mechanical mixing

* The motor-driven device uses an **impeller** inside tip to mix as it extrudes (good for high viscosity materials.

**Main difference (static vs dynamic):** static has **no moving parts** inside the tip; dynamic has a **motor-driven** mixer/impeller.

---

# 8) Impression techniques (and why they fail)

## Multiple-mix (light body + heavy body)

* Light body syringed around margins; heavy body in tray seats over it.
* If either material goes past working time before seating → poor bonding and distortion risk.

## Monophase

* Same material used in tray + syringe.
* Relies on **shear thinning**: in syringe it becomes less viscous; in tray it holds shape.

## Putty-wash

* Putty forms “tray”; wash captures detail.
* Too little wash space or too much seating pressure can cause rebound distortion (short/narrow dies).

### The classic failure mechanism (important)

* Seating when material has begun developing elasticity → compresses → rebounds (“spring back”) → dies become too narrow/short (fixed prosthetic misfit).

---

# 9) Removal rules (viscoelastic logic)

* Do **not** remove until adequately set (test leftover material outside the field).
* Break the seal first, then remove with a <span style="color: red">quick snap:</span>
  * Less time under strain → less permanent deformation.
* Avoid rocking/teasing as the main removal method (teasing increases time-dependent deformation).

---

# 10) Dimensional inaccuracy — the “6 causes” list

1. Polymerization shrinkage
2. Loss of by-product (water/alcohol)
3. Thermal contraction (37°C → room temp)
4. Water/disinfectant absorption over time
5. Incomplete recovery (viscoelastic)
6. Plastic deformation (true permanent change)

**High yield:** condensation silicone + polysulfide are more affected by (2); polyether is more affected by (4) if stored wet; PVS is strong on (5–6) recovery.

---

# 11) Quick selection guide (clinical use)

* **Diagnostic casts / ortho models:** Alginate (fast, hydrophilic, cheap)(also for dentate patient)
* **High-accuracy fixed prosthesis:** PVS (addition silicone) or polyether
* **Moist field challenge:** Polyether (better wetting than silicone families)
* **Deep sulcus / thin areas where tearing is risky:** Polysulfide (high tear resistance)
* **Edentulous mucostatic:** ZOE paste or impression plaster (when undercuts are minimal)
* **Border molding / preliminary edentulous tray shaping:** Impression compound

---

# 12) Common failure patterns (what to check first)

* **Bubbles/voids:** air during mixing, syringe tip not kept within material, moisture/debris on tooth
* **Rough surface / unset patches:** wrong ratio, incomplete mixing, contamination (latex with PVS), premature removal
* **Distortion:** tray flexure, movement during set, too much bulk, seating after working time, delayed pour for unstable materials
* **Tearing in sulcus:** inadequate bulk, premature removal, thin wash in deep sulcus, severe undercuts, wrong removal direction

---

## Summary table <span style="color: red">VVIMP</span>

**If u cannot remember all just remember the first one in the order at least**

Important to note that polysulphide will not tear easily but that doesn't help much because it deforms it has the lowest elastic recovery

| Property | Ranking (Best/Most/Greatest/Longest → Worst/Least/Shortest) |
| :--- | :--- |
| **Working time & setting time** | Polysulfide > Silicones (addition & condensation) > Polyether |
| **Stiffness** | Polyether > Addition silicone (PVS) > Condensation silicone > Polysulfide |
| **Tear strength** | Polysulfide > Addition silicone (PVS) > Polyether > Condensation silicone |
| **Elastic recovery** | Addition silicone (PVS) > Condensation silicone > Polyether > Polysulfide |
| **Dimensional stability** | Addition silicone (PVS) > Polyether > Polysulfide > Condensation silicone |
| **Wettability** | Hydrocolloids > Polyether > Hydrophilic addition silicone > Polysulfide > Hydrophobic addition silicone > Condensation silicone |

**Addition silicon is the best elastomeric material over all just keep sulfur away and also**

| Material Condition | Effect on Addition Silicone (PVS) |
| :--- | :--- |
| **Old/Fully Cured Composite** | No Effect. Safe to take impression. |
| **Fresh Composite (Cut/Prepped)** | No Effect. Safe to take impression. |
| **Fresh Composite (Uncut Surface)** | **INHIBITION.** PVS will not set (stays gooey).the platinum catalyst will be poisoned |

<br/>

---

**Above portion over all properties and uses similar for all dental fields other subjects now we see only dm aspect**

**Below is one single coherent exam note for ALL impression materials (composition + setting mechanism + key points).**

# Impression Materials — One Coherent Exam Note
**(Composition + Setting + Key Points)**

### A) HYDROCOLLOIDS

**1) Agar (Reversible Hydrocolloid)**
**Type:** Elastic, reversible, hydrophilic
**Setting (reaction system):** Physical gelation (temperature)
* **Heat:** gel → sol
* **Cool:** sol → gel

**Composition (main):**
* **Agar + water** (major)
* **Borax** (strengthens gel)
* **K₂SO₄** (improves gypsum set)
* **Fillers**, plasticizers, preservatives, color/flavor

**Key points (exam):**
* **No chemical by-product**, but water movement causes distortion
* **Syneresis/imbibition** → pour immediately

**The "Hysteresis" Loop (Agar)**
* **Liquefaction:** We boil it at 100°C to turn it into a Sol (Liquid).
* **Storage:** We keep it ready in a bath at 65°C.
* **Tempering:** Before putting it in the mouth, we cool it to 45°C (so it doesn't burn the patient).
* **Gelation (Setting):** It turns back to a Gel at 43°C.
  * Note: This requires Water-Cooled Trays to lower the temperature quickly. The mouth is too warm to set it efficiently.
Its basically heating a gel and then cooling a gel to get an impression

**2) <span style="color: red">Alginate (Irreversible Hydrocolloid)</span>**
**Type:** Elastic, irreversible, hydrophilic
**Setting (reaction system):** Chemical gelation (Ca²⁺ crosslinking)
* **Retarder stage:** CaSO₄ + Na₃PO₄ → Ca₃(PO₄)₂ (delays set)
* **Final gel:** Soluble alginate + Ca²⁺ → calcium alginate gel (insoluble)

**Composition (main):**
* **Sodium/potassium alginate** (soluble)
* **Calcium sulfate** (reactor)
* **Trisodium phosphate** (retarder)
* **Diatomaceous earth** (filler/strength)
* **Potassium titanium fluoride** (better gypsum surface)

**Key points (exam):**
* **No volatile by-product**, but syneresis/imbibition → pour ASAP
* Generally less accurate than elastomers (not for fine crown margins)

The reaction of sodium alginate is very fast, leaving no working time. Therefore, a Retarder (Sodium Phosphate) is added. The reactor (CaSO4) reacts with the retarder first, keeping it occupied. Once the retarder is finished, the reactor then reacts with the alginate to form CALCIUM Alginate (the Gel)."

### B) THERMOPLASTIC (RIGID) MATERIALS

**3) <span style="color: red">Impression Compound</span>**
**Type:** Rigid when set, thermoplastic
**Setting (reaction system):** Physical change (heat softens, cooling hardens)

**Composition (main):**
* **Resins/waxes** (softening + flow)
* <span style="color: red">**Stearic acid**</span>/plasticizers
* **Fillers** (talc/diatomaceous earth)

**Key points (exam):**
* **High thermal contraction** → distortion risk
* Used for preliminary edentulous impressions + border molding, not crown margins
This is a thermoplastic material its like a wax(technically it is a wax)

When heated (~55–60 °C): it softens and becomes moldable (high flow).
When cooled to mouth temperature (~37 °C): it hardens/sets by physical cooling (low flow).
No chemical reaction and no by-product — it just changes state with temperature.

### C) RIGID CHEMICAL PASTES

**4) ZOE Impression Paste (Zinc Oxide–Eugenol)(already in detail in cemenets)**
**Type:** Rigid, mucostatic, accurate for edentulous
**Setting (reaction system):** Acid–base chelation
* **ZnO + eugenol** → zinc eugenolate

**Composition:**
* **Base paste:** ZnO + oils/resins/fillers
* **Catalyst paste:** eugenol + accelerators (often zinc acetate) + fillers

**Key points (exam):**
* **No by-product** → good stability
* **Brittle** → avoid undercuts
* **Eugenol** may irritate/burn

### D) ELASTOMERS (RUBBER IMPRESSION MATERIALS)

**5) Polysulfide**
**Type:** Elastic, hydrophobic-ish, high tear strength, messy
**Setting (reaction system):** Condensation polymerization

**Key chemicals:**
* **Base:** mercaptan (–SH)
* **Catalyst:** <span style="color: red">lead dioxide (PbO₂)</span>
**By-product:** <span style="color: red">Water</span>

**Key points (exam):**
* **Water evaporates** → shrinkage → pour early (~within 1 hour)
* **PbO₂** → brown color + stains, –SH → bad odor

**6) Condensation Silicone (C-silicone)**
**Type:** Elastic, hydrophobic, moderate accuracy
**Setting (reaction system):** Condensation polymerization

**Key chemicals:**
* **Base:** hydroxyl-terminated PDMS (–OH)
* **Cross-linker:** alkyl silicate
* **Catalyst:** <span style="color: red">stannous octoate (tin)</span>
**By-product:** <span style="color: red">Ethyl alcohol</span>

**Key points (exam):**
* **Alcohol evaporates fast** → highest shrinkage among elastomers
* **Pour ASAP** (~within 30 min)

**7) Addition Silicone (PVS/VPS)**
**Type:** Elastic, very accurate, excellent stability
**Setting (reaction system):** Addition (hydrosilylation)

**Key chemicals:**
* **Base:** vinyl-terminated polysiloxane
* **Cross-linker:** Si–H (poly(methylhydrogen siloxane))
* **Catalyst:** <span style="color: red">platinum (Pt)</span>
**By-product:** None

**Key points (exam):**
* **Excellent dimensional stability** (can delay pour)
* **Sulfur inhibits Pt** (latex gloves, some materials) → incomplete set

**8) Polyether**
**Type:** Elastic but very rigid/stiff, hydrophilic (good wetting)
**Setting (reaction system):** Cationic ring-opening polymerization

**Key chemicals:**
* **Base:** polyether with aziridine rings
* **Initiator:** aromatic sulfonate ester
**By-product:** None

**Key points (exam):**
* **Very stable**
* **Hard to remove from undercuts** due to stiffness

### EXAM SUPER-SUMMARY (Most Tested)
**By-product → shrinkage risk**
* **Polysulfide** → water → shrink
* **C-silicone** → alcohol → shrink (worst)
* **PVS** → none → stable
* **Polyether** → none → stable
* **Agar/Alginate** → water movement (syneresis/imbibition) → pour immediately

**When to pour (high yield)**
* **Alginate/Agar:** immediately
* **C-silicone:** ~30 min
* **Polysulfide:** ~1 hour
* **PVS/Polyether:** stable (delayed pour acceptable

**Disinfection Protocol**
* **Alginate/Polyether (Hydrophilic):** Spray with disinfectant (chlorine/iodophor), wrap in damp paper towel for <10 mins. **Do not immerse.**
* **Silicones/Polysulfides (Hydrophobic):** Can be immersed in glutaraldehyde or phenol solutions for the required time (usually 10+ mins).

### Type of Failure Causes (Agar vs Alginate)

| Type of Failure | Causes: Agar (Reversible) | <span style="color: red">Causes: Alginate (Irreversible)imp</span> |
| :--- | :--- | :--- |
| **Grainy Material** | • Inadequate boiling<br>• Storage temperature too low<br>• **Storage time too long** | • **Improper mixing**<br>• Prolonged mixing<br>• Excessive gelation<br>• Water/powder ratio too low |
| **Separation of Syringe Materials** | • **Water-soaked tray** material surface not removed<br>• Premature gelation of either material | • Not applicable |
| **Tearing** | • **Inadequate bulk**<br>• Premature removal from mouth<br>• Syringe material partially gelled when tray was seated | • **Inadequate bulk**<br>• Moisture contamination<br>• **Premature removal** from mouth<br>• Prolonged mixing |
| **External Bubbles** | • **Gelation of syringe material**, preventing flow | • **Undue gelation**, preventing flow<br>• **Air incorporated** during mixing |
| **Irregularly Shaped Voids** | • Material **too cold** | • **Moisture or debris** on tissue |
| **Rough or Chalky Stone Model** | • Inadequate cleansing of impression<br>• Excess water or hardening solution left in impression<br>• Premature removal of die<br>• Improper manipulation of stone | • **Air drying of impression** before pouring (Major cause)<br>• Inadequate cleaning of impression<br>• Excess water left in impression<br>• Premature removal of impression<br>• Model left in impression too long<br>• Improper manipulation of stone |
| **Distortion** | • Impression not poured within **30 min**<br>• Movement of tray during gelation<br>• Premature removal from mouth<br>• Improper removal from mouth<br>• Use of ice water during initial gelation | • Impression **not poured immediately**<br>• Movement of tray during gelation<br>• Premature removal from mouth<br>• Improper removal from mouth |

![Impression Materials Summary Table](assets/impression_downloadable_summary.png)
`;

// Easy Questions: Direct Recall, Basic Definitions, Short Questions
