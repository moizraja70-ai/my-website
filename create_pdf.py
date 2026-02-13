from fpdf import FPDF
import re

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 10)
        self.set_text_color(80, 80, 80)
        self.cell(0, 10, 'Preventive and Community Dentistry - Comprehensive Notes', 0, 0, 'C')
        self.ln(5)
        self.line(10, 20, 200, 20)
        self.ln(5)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()

# Title
pdf.set_font('Arial', 'B', 20)
pdf.set_text_color(0, 51, 102)
pdf.cell(0, 15, 'PREVENTIVE AND COMMUNITY DENTISTRY', 0, 1, 'C')
pdf.set_font('Arial', 'B', 16)
pdf.cell(0, 10, 'Comprehensive Exam Notes', 0, 1, 'C')
pdf.ln(10)

# Content
content = """
SECTION B: EPIDEMIOLOGY

1. BASIC DEFINITIONS

Health (WHO 1948)
- "A state of complete physical, mental and social well-being and not merely the absence of disease or infirmity"
- Ecological Concept: Dynamic equilibrium between human organism and environment

Disease
- Condition of body where functions are disturbed
- Spectrum: Subclinical -> Mild illness -> Severe illness -> Fatal illness

Epidemiology (John M Last)
- "Study of distribution and determinants of health-related states in populations, and application to control health problems"

2. DYNAMICS OF DISEASE TRANSMISSION

Chain of Infection:
+----------+-------------------+----------------------------------------+
| Link     | Component         | Description                            |
+----------+-------------------+----------------------------------------+
| 1st      | Reservoir         | Person/animal/plant where agent lives  |
| 2nd      | Mode of Transmission | Direct/indirect/airborne/vector     |
| 3rd      | Susceptible Host  | Individual with inadequate immunity    |
+----------+-------------------+----------------------------------------+

Types of Reservoirs:
+-------------------+------------------+----------------------------------+
| Type              | Definition       | Examples                         |
+-------------------+------------------+----------------------------------+
| Human             | Infected humans  | Most important source            |
| Animal            | Zoonoses source  | Rabies, yellow fever, influenza  |
| Non-living        | Soil/objects     | Tetanus, anthrax                 |
+-------------------+------------------+----------------------------------+

Types of Carriers:
- Incubatory: Sheds agent during incubation period
- Convalescent: Sheds during convalescence  
- Healthy: Harbors agent but never develops disease
- Chronic: Sheds for months/years

3. MODES OF TRANSMISSION

A. DIRECT TRANSMISSION
+-------------------+--------------------------------------------------+
| Mode              | Examples                                         |
+-------------------+--------------------------------------------------+
| Direct Contact    | STDs, AIDS, leprosy, leptospirosis               |
| Droplet Infection | Diphtheria, whooping cough, TB, meningitis       |
| Contact with Soil | Hookworm, tetanus                                |
| Inoculation       | Rabies (dog bite), Hepatitis B (needles)         |
| Transplacental    | TORCH infections                                 |
+-------------------+--------------------------------------------------+

B. INDIRECT TRANSMISSION (5 Fs)
- Flies, Fingers, Fomites, Food, Fluid

4. STAGES OF INFECTIOUS DISEASE

1. Incubation Period: Time between invasion and first symptom
2. Prodromal Stage: First symptoms appear
3. Period of Advance/Fastigium: Symptoms increasing
4. Defervescence: Symptoms decreasing
5. Convalescence: Complete recovery

5. IMMUNITY

ACTIVE IMMUNITY
- Definition: Individual develops immunity after infection/immunization
- Duration: Long-lasting
- Types: Natural (clinical/subclinical) or Artificial (vaccines)

PASSIVE IMMUNITY
- Definition: Readymade antibodies transferred
- Duration: Temporary (days to months)
- Types: Natural (maternal antibodies) or Artificial (immunoglobulins)

Types of Immunoglobulins:
+-------------------+--------------------------------+-------------------------------+
| Type              | Source                         | Uses                          |
+-------------------+--------------------------------+-------------------------------+
| Normal Human Ig   | Pool of 1000+ donors           | Measles, Hepatitis A          |
| Specific Human Ig | Recovered/immunized donors     | Chickenpox, Hep B, Rabies     |
| Antisera          | Animals (horses)               | Tetanus, diphtheria, snake    |
+-------------------+--------------------------------+-------------------------------+

6. SCREENING

Definition: Identification of unrecognized disease (not from patient's request)

Uses:
- Case Detection: Diabetes, iron deficiency anemia screening
- Disease Control: Screening immigrants for TB/syphilis
- Research: Cancer prevalence studies
- Education: Public awareness creation


SECTION C: INFECTION CONTROL

1. NATIONAL HEALTH POLICY (NHP-2002)

Main Objectives:
- Achieve acceptable standard of good health
- Increase access to decentralized public health system
- Ensure equitable access to health services

Key Goals to be Achieved by 2015:
+---------------------------------------------+-------------+
| Goal                                        | Target Year |
+---------------------------------------------+-------------+
| Eradicate Polio and Yaws                    | 2005        |
| Eliminate Leprosy                           | 2005        |
| Eliminate Kala-azar                         | 2010        |
| Eliminate Lymphatic Filariasis              | 2015        |
| Zero level growth of HIV/AIDS               | 2007        |
| Reduce TB, Malaria mortality by 50%         | 2010        |
| Reduce blindness prevalence to 0.5%         | 2010        |
| Reduce IMR to 30/1000, MMR to 100/Lakh      | 2010        |
+---------------------------------------------+-------------+

2. HEALTH CARE SYSTEM IN INDIA

Five Major Sectors:
1. Public Health Sector - PHCs, Subcentres, Hospitals, CHCs
2. Private Sector - Private hospitals, clinics, GPs
3. Indigenous Systems - Ayurveda, Siddha, Unani, Homeopathy
4. Voluntary Health Agencies - NGOs, charitable organizations
5. National Health Programmes

Primary Health Care - 8 Essential Components (Alma-Ata):
1. Education concerning health problems
2. Promotion of food supply and proper nutrition
3. Adequate supply of safe water and basic sanitation
4. Maternal and child health care including family planning
5. Immunization against major infectious diseases
6. Prevention and control of locally endemic diseases
7. Appropriate treatment of common diseases and injuries
8. Provision of essential drugs

Principles of Primary Health Care:
+-----------------------+------------------------------------------------+
| Principle             | Description                                    |
+-----------------------+------------------------------------------------+
| Equitable Distribution| Services shared equally by all                 |
| Community Participation| Involvement in planning and implementation    |
| Intersectoral Coordination| Planning with other sectors                |
| Appropriate Technology| Scientifically sound, locally adaptable        |
+-----------------------+------------------------------------------------+

3. VILLAGE LEVEL HEALTH WORKERS

Village Health Guide (VHG):
- Introduced: 2nd October 1977
- Education: Minimum 6th standard
- Training: 200 hours over 3 months
- Target: 1 per village/1000 rural population

Local Dai (Traditional Birth Attendant):
- Training: 30 working days
- Provision: Delivery kit and certificate

Anganwadi Worker (ICDS):
- Coverage: 1 per 1000 population
- Training: 4 months
- Services: Health checkup, immunization, nutrition

ASHA (Accredited Social Health Activist):
- Selection: Woman aged 25-45 years, 8th class education
- Norm: 1 per 1000 population
- Roles: Health activist, DOTS provider, depot holder

4. HEALTH CARE HIERARCHY

+----------------+------------------------+------------------------------+
| Level          | Coverage               | Staff                        |
+----------------+------------------------+------------------------------+
| Subcentre      | 3,000/5,000 population | 1 Male + 1 Female MPW        |
| PHC            | 30,000/20,000          | Medical officers, nurses     |
| CHC            | 80,000-1,20,000        | 30 beds, 4 specialists       |
| District Hosp  | District level         | Multi-specialty services     |
+----------------+------------------------+------------------------------+


CHAPTER 12: INDICES FOR ORAL DISEASES

1. DEFINITIONS AND IDEAL REQUISITES

Definition (Russell AL):
"A numerical value describing the relative status of a population on a graduated scale with definite upper and lower limits, which is designed to permit and facilitate comparison with other populations"

Ideal Requisites of an Index:
- Clarity/Simplicity: Easy to carry out
- Validity: Measures what it intends to measure
- Reliability: Consistent results under various conditions
- Quantifiability: Amenable to statistical analysis
- Sensitivity: Detects small shifts
- Acceptability: Not painful or demeaning

Classification of Indices:
+-------------------+---------------------------------------------------+
| Category          | Examples                                          |
+-------------------+---------------------------------------------------+
| Simple Index      | Plaque presence                                   |
| Cumulative Index  | DMF Index                                         |
| Irreversible      | DMF                                               |
| Reversible        | Plaque index                                      |
| Composite Index   | Russell Periodontal Index                         |
+-------------------+---------------------------------------------------+

2. PLAQUE INDICES

Plaque Index (PlI) - Silness and Loe (1964):
+-------+---------------------------------------------------------------+
| Score | Criteria                                                      |
+-------+---------------------------------------------------------------+
| 0     | No plaque                                                     |
| 1     | Film of plaque at free gingival margin                        |
| 2     | Moderate accumulation within gingival pocket                  |
| 3     | Abundance of soft matter within pocket/gingival margin        |
+-------+---------------------------------------------------------------+

Rating Scale:
+-----------+-------------+
| Rating    | Score       |
+-----------+-------------+
| Excellent | 0           |
| Good      | 0.1-0.9     |
| Fair      | 1.0-1.9     |
| Poor      | 2.0-3.0     |
+-----------+-------------+

Patient Hygiene Performance (PHP) - Podshadley & Haley (1968):
- Teeth Examined: 16, 11, 26, 36, 31, 46
- Score per tooth: 0-5 (5 subdivisions)

Oral Hygiene Index (OHI) - Greene & Vermillion (1960):
+-------+------------------+---------------------------------------------+
| Score | Debris Criteria  | Calculus Criteria                           |
+-------+------------------+---------------------------------------------+
| 0     | No debris/stain  | No calculus                                 |
| 1     | Debris <=1/3     | Supragingival <=1/3                         |
| 2     | Debris 1/3-2/3   | Supragingival 1/3-2/3 or flecks subgingival |
| 3     | Debris >2/3      | Supragingival >2/3 or heavy subgingival     |
+-------+------------------+---------------------------------------------+
Score Range: 0-12

Simplified Oral Hygiene Index (OHI-S) - Greene & Vermillion (1964):
- Teeth: 6 specific (1 per sextant)
- Score Range: 0-6

Rating Scale:
+-----------+-------------+
| Rating    | Score       |
+-----------+-------------+
| Excellent | 0           |
| Good      | 0.1-1.2     |
| Fair      | 1.3-3.0     |
| Poor      | 3.1-6.0     |
+-----------+-------------+

3. GINGIVAL INDICES

Sulcus Bleeding Index (SBI) - Muhlemann & Son (1971):
+-------+----------------------------------------------------------------+
| Score | Criteria                                                       |
+-------+----------------------------------------------------------------+
| 0     | Healthy gingiva, no bleeding on probing                        |
| 1     | Healthy appearance but bleeding on probing                     |
| 2     | Bleeding on probing + change of color, no swelling             |
| 3     | Bleeding on probing + change of color + slight swelling        |
| 4     | Bleeding on probing + obvious swelling                         |
| 5     | Spontaneous bleeding + marked swelling +/- ulceration          |
+-------+----------------------------------------------------------------+

Gingival Index (GI) - Loe & Silness (1963):
+-------+----------------------------------------------------------------+
| Score | Criteria                                                       |
+-------+----------------------------------------------------------------+
| 0     | Normal gingiva                                                 |
| 1     | Mild inflammation (slight edema, color change), no bleeding    |
| 2     | Moderate inflammation (redness, edema, glazing), bleeding      |
| 3     | Severe inflammation (marked redness, edema), spontaneous bleed |
+-------+----------------------------------------------------------------+

4. PERIODONTAL INDICES

Periodontal Index (PI) - Russell (1956):
+-------+---------------------------------------------------------------+
| Score | Criteria                                                      |
+-------+---------------------------------------------------------------+
| 0     | Negative examination (gingiva normal)                         |
| 1     | Mild gingivitis (no pockets, no bone loss)                    |
| 2     | Mild gingivitis (mild pocket, no bone loss)                   |
| 6     | Severe gingivitis (pocket, bone loss)                         |
| 8     | Advanced destructive periodontal disease                      |
+-------+---------------------------------------------------------------+

Community Periodontal Index (CPITN/CPI):
WHO Probe markings: 3.5 - 5.5 - 8.5 - 11.5 mm

+-------+------------------+-------------------+
| Score | Criteria         | Treatment Need    |
+-------+------------------+-------------------+
| 0     | Healthy          | No treatment      |
| 1     | Bleeding on prob | OHI               |
| 2     | Calculus         | OHI + cleaning    |
| 3     | Pocket 4-5 mm    | Subgingival clean |
| 4     | Pocket >=6 mm    | Complex treatment |
| X     | Excluded sextant | -                 |
+-------+------------------+-------------------+

Sextants examined: 12, 11, 22, 23, 32, 31, 42, 43

5. DENTAL CARIES INDICES

DMFT (Decayed, Missing, Filled Teeth):
Formula: DMFT = D + M + F
- D: Untreated decayed teeth
- M: Missing teeth due to caries
- F: Filled/restored teeth

DMFS (Decayed, Missing, Filled Surfaces):
- Permanent teeth: 5 surfaces per tooth (4 for incisors/canines)
- Higher sensitivity than DMFT

dft/dfs (Primary Teeth):
- dft: Decayed and filled teeth in primary dentition
- dfs: Decayed and filled surfaces in primary dentition
- Note: "M" not used as exfoliation is normal

SIC Index (Significant Caries Index):
Mean DMFT of one-third population with highest caries scores

6. DENTAL FLUOROSIS INDICES

Dean's Fluorosis Index:
+-------+------------------+------------------------------------------+
| Score| Classification   | Description                              |
+-------+------------------+------------------------------------------+
| 0     | Normal           | Normal enamel                            |
| 0.5   | Questionable     | -                                        |
| 1     | Very mild        | Small opaque areas                       |
| 2     | Mild             | White opaque areas <50% of surface       |
| 3     | Moderate         | Marked wear, brown stain                 |
| 4     | Severe           | Marked hypoplasia, extensive brown stain |
+-------+------------------+------------------------------------------+

Community Fluorosis Index (CFI):
Measure of fluorosis severity at community level

7. PLAQUE vs CALCULUS COMPARISON

+----------------+---------------+---------------+
| Feature        | Supragingival | Subgingival   |
+----------------+---------------+---------------+
| Location       | Above margin  | Below margin  |
| Attachment     | Enamel        | Cementum      |
| Bacteria       | Aerobic       | Anaerobic     |
| Tenacity       | Not much      | Very tenacious|
| Color          | Light         | Dark          |
+----------------+---------------+---------------+


SECTION E: PREVENTIVE DENTISTRY

1. LEVELS OF PREVENTION

+-------------------+--------------------------------+---------------------------+
| Level             | Definition                     | Examples                  |
+-------------------+--------------------------------+---------------------------+
| Primary           | Action before disease onset    | Health education, fluoride|
| Secondary         | Early diagnosis & treatment    | Screening, early detection|
| Tertiary          | Disability limitation          | Prosthetic rehabilitation |
+-------------------+--------------------------------+---------------------------+

2. FLUORIDE RECOMMENDATIONS

+-------------------------+-------------------+
| Source                  | Optimal Level     |
+-------------------------+-------------------+
| Community water         | 0.7-1.2 ppm       |
| Toothpaste (adults)     | 1000-1500 ppm     |
| Toothpaste (children)   | 500 ppm           |
| Mouth rinse (daily)     | 0.05%             |
| Mouth rinse (weekly)    | 0.2%              |
| Professional varnish    | 2.26% NaF         |
+-------------------------+-------------------+

3. PIT AND FISSURE SEALANTS

Indications:
- Deep pits and fissures
- High caries risk patients
- Recently erupted permanent molars
- History of caries in primary teeth

Types:
- Resin-based: Most common, requires etching
- Glass ionomer: Fluoride release, chemical adhesion
- Polyacid-modified composite: Combined benefits

4. ORAL CANCER SCREENING

High-Risk Groups:
- Age >50 years
- Heavy smokers
- Alcoholics
- Betel nut chewers
- Family history

Screening Sites:
- Lips (especially lower lip)
- Tongue lateral borders
- Floor of mouth
- Soft palate and tonsillar pillars
- Buccal mucosa
- Retromolar area


SECTION F: APPLIED BIOSTATISTICS

1. TYPES OF DATA

+-------------+------------------+---------------------------+
| Type        | Characteristics  | Examples                  |
+-------------+------------------+---------------------------+
| Nominal     | No order         | Gender, blood group       |
| Ordinal     | Ordered          | Pain severity             |
| Interval    | Equal intervals  | Temperature               |
| Ratio       | True zero        | Height, weight, DMFT      |
+-------------+------------------+---------------------------+

2. MEASURES OF CENTRAL TENDENCY

+---------------+-------------------+--------------+----------------+
| Feature       | Mean              | Median       | Mode           |
+---------------+-------------------+--------------+----------------+
| Definition    | Arithmetic avg    | Middle value | Most frequent  |
| Extremes?     | Affected          | Not affected | Not affected   |
| Math use?     | Yes               | No           | No             |
| All values?   | Yes               | No           | No             |
+---------------+-------------------+--------------+----------------+

3. MEASURES OF DISPERSION

+-------------------+-----------------------------------+
| Measure           | Description                       |
+-------------------+-----------------------------------+
| Range             | Xmax - Xmin                       |
| Quartile Dev      | (Q3 - Q1) / 2                     |
| Mean Deviation    | Average of deviations from mean   |
| Standard Dev      | Root mean square deviation        |
| Standard Error    | SD / sqrt(n)                      |
+-------------------+-----------------------------------+

SD vs SE:
- SD: Shape of distribution, data spread
- SE: Reliability of mean, decreases with larger sample

4. NORMAL DISTRIBUTION

Characteristics:
- Bell-shaped, symmetrical
- Mean = Median = Mode
- Total area = 1 (100%)

Confidence Limits:
+--------------------+-------------+
| Range              | % of Values |
+--------------------+-------------+
| Mean +/- 1 SD      | 68%         |
| Mean +/- 2 SD      | 95%         |
| Mean +/- 3 SD      | 99.7%       |
+--------------------+-------------+

5. PROBABILITY AND SIGNIFICANCE

P-Value Interpretation:
+-----------+------------------------+
| P Value   | Interpretation         |
+-----------+------------------------+
| < 0.001   | Very highly significant|
| < 0.01    | Highly significant     |
| < 0.05    | Significant            |
| > 0.05    | Not significant        |
+-----------+------------------------+

Formula: P = Events occurring / Total trials

6. SENSITIVITY AND SPECIFICITY

+----------------+---------------------------+
| Term           | Formula                   |
+----------------+---------------------------+
| Sensitivity    | TP / (TP + FN)            |
| Specificity    | TN / (TN + FP)            |
| PPV            | TP / (TP + FP)            |
| NPV            | TN / (TN + FN)            |
+----------------+---------------------------+

2x2 Table:
+------------+----------+----------+
|            | Disease +| Disease -|
+------------+----------+----------+
| Test +     | TP       | FP       |
| Test -     | FN       | TN       |
+------------+----------+----------+

7. KEY FORMULAS

Mean = Sum of observations / Number of observations
Standard Deviation = sqrt(Sum of squared deviations / n-1)
Standard Error = SD / sqrt(n)

8. STUDY DESIGNS

+------------------+--------------------------------+
| Type             | Description                    |
+------------------+--------------------------------+
| Cross-sectional  | Snapshot at one time           |
| Cohort           | Follow groups over time        |
| Case-control     | Cases vs controls              |
| RCT              | Randomized controlled trial    |
| Experimental     | Researcher controls variables  |
+------------------+--------------------------------+


KEY MNEMONICS

DISEASE TRANSMISSION (5 Fs):
- Flies, Fingers, Fomites, Food, Fluid

TORCH Infections:
- Toxoplasma, Rubella, Cytomegalovirus, Herpes

8 Components of PHC (Alma-Ata):
- Education, Food/Nutrition, Water/Sanitation,
- Maternal & Child Health, Immunization,
- Endemic disease control, Treatment, Essential drugs

EXAM HIGH-YIELD POINTS

1. Epidemiology definition - John M Last
2. Chain of infection - Reservoir -> Transmission -> Host
3. Incubation period - Time between invasion and first symptom
4. Screening - Identifies unrecognized disease
5. PHC - Alma-Ata declaration, 8 essential components
6. DMFT - Missing only if due to caries
7. OHI-S - 6 teeth examined, score 0-6
8. CPITN - WHO probe: 3.5-5.5-8.5-11.5 mm
9. Gingival Index - 0-3 scale by Loe & Silness
10. Mean +/- 2 SD - Includes 95% of values
11. P < 0.05 - Statistically significant
12. Sensitivity - True positive rate
13. Specificity - True negative rate

Compiled from Textbook of Preventive and Community Dentistry
"""

# Parse and add content
lines = content.split('\n')
i = 0
while i < len(lines):
    line = lines[i].strip()
    
    # Section headers
    if line.startswith('SECTION') or line.startswith('CHAPTER'):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 12, line, 0, 1, 'L')
        pdf.set_text_color(0, 0, 0)
        pdf.ln(3)
    
    # Numbered subsections
    elif re.match(r'^\d+\.', line):
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 8, line, 0, 1, 'L')
        pdf.ln(1)
    
    # Table headers
    elif line.startswith('+--') and i+1 < len(lines) and '|' in lines[i+1]:
        # Skip table formatting lines
        i += 1
        continue
    
    # Table content
    elif line.startswith('|') and len(line) > 5:
        pdf.set_font('Arial', '', 8)
        # Clean up table row
        row = line.replace('|', '  ').strip()
        if row and not row.replace('-', '').strip() == '':
            pdf.cell(0, 5, row, 0, 1, 'L')
    
    # Bullet points
    elif line.startswith('-') or line.startswith('+'):
        pdf.set_font('Arial', '', 10)
        pdf.cell(5, 6, '', 0, 0)  # indent
        pdf.cell(0, 6, line, 0, 1, 'L')
    
    # Bold definitions
    elif ':' in line and len(line.split(':')[0]) < 30 and not line.startswith('http'):
        pdf.set_font('Arial', 'B', 10)
        parts = line.split(':', 1)
        pdf.cell(0, 6, parts[0] + ':', 0, 1, 'L')
        if len(parts) > 1 and parts[1].strip():
            pdf.set_font('Arial', '', 10)
            pdf.cell(5, 6, '', 0, 0)
            pdf.multi_cell(0, 6, parts[1].strip())
    
    # Regular text (non-empty)
    elif line and not line.startswith('+') and not (line.startswith('|') and len(line) < 10):
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 6, line)
    
    i += 1

# Save PDF
pdf.output('PREVENTIVE_COMMUNITY_DENTISTRY_NOTES.pdf')
print("PDF created successfully: PREVENTIVE_COMMUNITY_DENTISTRY_NOTES.pdf")
