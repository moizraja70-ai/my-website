from fpdf import FPDF

pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# Title
pdf.set_font('Helvetica', 'B', 20)
pdf.set_text_color(0, 51, 102)
pdf.cell(0, 15, 'PREVENTIVE AND COMMUNITY DENTISTRY', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.set_font('Helvetica', 'B', 16)
pdf.cell(0, 10, 'Comprehensive Exam Notes', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(5)
pdf.set_text_color(0, 0, 0)

pdf.set_font('Helvetica', '', 10)

# Content sections
sections = [
    ("SECTION B: EPIDEMIOLOGY", True),
    ("", False),
    ("1. BASIC DEFINITIONS", True),
    ("Health (WHO 1948): A state of complete physical, mental and social well-being and not merely the absence of disease or infirmity", False),
    ("Disease: Condition of body where functions are disturbed", False),
    ("Epidemiology (John M Last): Study of distribution and determinants of health-related states in populations", False),
    ("", False),
    ("2. CHAIN OF INFECTION", True),
    ("Link 1 - Reservoir: Person, animal, plant where infectious agent lives", False),
    ("Link 2 - Mode of Transmission: Direct, indirect, airborne, vector-borne", False),
    ("Link 3 - Susceptible Host: Individual with inadequate immunity", False),
    ("", False),
    ("3. TYPES OF RESERVOIRS", True),
    ("Human Reservoir: Most important source (cases or carriers)", False),
    ("Animal Reservoir: Zoonoses - Rabies, yellow fever, influenza", False),
    ("Non-living Reservoir: Soil - Tetanus, anthrax", False),
    ("", False),
    ("Types of Carriers:", True),
    ("- Incubatory: Sheds agent during incubation period", False),
    ("- Convalescent: Sheds during convalescence", False),
    ("- Healthy: Harbors agent but never develops disease", False),
    ("- Chronic: Sheds for months/years", False),
    ("", False),
    ("4. MODES OF TRANSMISSION", True),
    ("DIRECT TRANSMISSION:", True),
    ("- Direct Contact: STDs, AIDS, leprosy", False),
    ("- Droplet Infection: Diphtheria, whooping cough, TB, meningitis", False),
    ("- Contact with Soil: Hookworm, tetanus", False),
    ("- Inoculation: Rabies (dog bite), Hepatitis B (needles)", False),
    ("- Transplacental: TORCH infections", False),
    ("", False),
    ("INDIRECT TRANSMISSION (5 Fs):", True),
    ("Flies, Fingers, Fomites, Food, Fluid", False),
    ("", False),
    ("5. STAGES OF INFECTIOUS DISEASE", True),
    ("1. Incubation Period: Time between invasion and first symptom", False),
    ("2. Prodromal Stage: First symptoms appear", False),
    ("3. Fastigium: Symptoms increasing in severity", False),
    ("4. Defervescence: Symptoms decreasing", False),
    ("5. Convalescence: Complete recovery", False),
    ("", False),
    ("6. IMMUNITY", True),
    ("ACTIVE IMMUNITY:", True),
    ("- Definition: Individual develops immunity after infection/immunization", False),
    ("- Duration: Long-lasting", False),
    ("- Types: Natural (infection) or Artificial (vaccines)", False),
    ("", False),
    ("PASSIVE IMMUNITY:", True),
    ("- Definition: Readymade antibodies transferred", False),
    ("- Duration: Temporary (days to months)", False),
    ("- Types: Natural (maternal) or Artificial (immunoglobulins)", False),
    ("", False),
    ("Immunoglobulins:", True),
    ("- Normal Human Ig: Pool of 1000+ donors - Measles, Hep A", False),
    ("- Specific Human Ig: High antibody content - Chickenpox, Hep B, Rabies", False),
    ("- Antisera: Animal sources (horses) - Tetanus, diphtheria, snake bite", False),
]

for text, is_heading in sections:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# New Page
pdf.add_page()

sections2 = [
    ("SECTION C: INFECTION CONTROL", True),
    ("", False),
    ("1. NATIONAL HEALTH POLICY (NHP-2002)", True),
    ("Main Objectives:", True),
    ("- Achieve acceptable standard of good health", False),
    ("- Increase access to decentralized public health system", False),
    ("- Ensure equitable access to health services", False),
    ("", False),
    ("Key Goals:", True),
    ("- Eradicate Polio and Yaws (by 2005)", False),
    ("- Eliminate Leprosy (by 2005)", False),
    ("- Eliminate Kala-azar (by 2010)", False),
    ("- Eliminate Lymphatic Filariasis (by 2015)", False),
    ("- Reduce IMR to 30/1000, MMR to 100/Lakh (by 2010)", False),
    ("", False),
    ("2. HEALTH CARE SYSTEM IN INDIA", True),
    ("Five Major Sectors:", True),
    ("1. Public Health Sector - PHCs, Subcentres, Hospitals, CHCs", False),
    ("2. Private Sector - Private hospitals, clinics, GPs", False),
    ("3. Indigenous Systems - Ayurveda, Siddha, Unani, Homeopathy", False),
    ("4. Voluntary Health Agencies - NGOs, charitable organizations", False),
    ("5. National Health Programmes", False),
    ("", False),
    ("Primary Health Care - 8 Essential Components (Alma-Ata):", True),
    ("1. Education concerning health problems", False),
    ("2. Promotion of food supply and proper nutrition", False),
    ("3. Adequate supply of safe water and basic sanitation", False),
    ("4. Maternal and child health care including family planning", False),
    ("5. Immunization against major infectious diseases", False),
    ("6. Prevention and control of locally endemic diseases", False),
    ("7. Appropriate treatment of common diseases and injuries", False),
    ("8. Provision of essential drugs", False),
    ("", False),
    ("Principles of Primary Health Care:", True),
    ("- Equitable Distribution: Services shared equally by all", False),
    ("- Community Participation: Involvement in planning", False),
    ("- Intersectoral Coordination: Planning with other sectors", False),
    ("- Appropriate Technology: Scientifically sound, locally adaptable", False),
    ("", False),
    ("3. VILLAGE LEVEL HEALTH WORKERS", True),
    ("", False),
    ("Village Health Guide (VHG):", True),
    ("- Introduced: 2nd October 1977", False),
    ("- Education: Minimum 6th standard", False),
    ("- Training: 200 hours over 3 months", False),
    ("- Target: 1 per village/1000 rural population", False),
    ("", False),
    ("ASHA (Accredited Social Health Activist):", True),
    ("- Selection: Woman aged 25-45 years, 8th class education", False),
    ("- Norm: 1 per 1000 population", False),
    ("- Roles: Health activist, DOTS provider, depot holder", False),
    ("", False),
    ("4. HEALTH CARE HIERARCHY", True),
    ("Subcentre: 3,000/5,000 population - 1 Male + 1 Female MPW", False),
    ("PHC: 30,000/20,000 population - Medical officers, nurses", False),
    ("CHC: 80,000-1,20,000 - 30 beds, 4 specialists", False),
    ("District Hospital: District level - Multi-specialty", False),
]

for text, is_heading in sections2:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# New Page - Indices
pdf.add_page()

sections3 = [
    ("CHAPTER 12: INDICES FOR ORAL DISEASES", True),
    ("", False),
    ("1. DEFINITION", True),
    ("Russell AL: 'A numerical value describing the relative status of a population on a graduated scale with definite upper and lower limits'", False),
    ("", False),
    ("Ideal Requisites:", True),
    ("- Clarity/Simplicity: Easy to carry out", False),
    ("- Validity: Measures what it intends to measure", False),
    ("- Reliability: Consistent results", False),
    ("- Quantifiability: Amenable to statistical analysis", False),
    ("- Sensitivity: Detects small shifts", False),
    ("- Acceptability: Not painful or demeaning", False),
    ("", False),
    ("2. PLAQUE INDICES", True),
    ("", False),
    ("Plaque Index (PlI) - Silness and Loe (1964):", True),
    ("Score 0: No plaque", False),
    ("Score 1: Film of plaque at free gingival margin", False),
    ("Score 2: Moderate accumulation within gingival pocket", False),
    ("Score 3: Abundance of soft matter within pocket", False),
    ("Rating: Excellent (0), Good (0.1-0.9), Fair (1.0-1.9), Poor (2.0-3.0)", False),
    ("", False),
    ("Patient Hygiene Performance (PHP) - Podshadley & Haley (1968):", True),
    ("Teeth Examined: 16, 11, 26, 36, 31, 46", False),
    ("5 subdivisions per tooth, Score 0-5 per tooth", False),
    ("", False),
    ("Simplified Oral Hygiene Index (OHI-S) - Greene & Vermillion (1964):", True),
    ("Teeth: 6 specific (1 per sextant)", False),
    ("Score Range: 0-6", False),
    ("Rating: Excellent (0), Good (0.1-1.2), Fair (1.3-3.0), Poor (3.1-6.0)", False),
    ("", False),
    ("3. GINGIVAL INDICES", True),
    ("", False),
    ("Gingival Index (GI) - Loe & Silness (1963):", True),
    ("Score 0: Normal gingiva", False),
    ("Score 1: Mild inflammation, no bleeding", False),
    ("Score 2: Moderate inflammation, bleeding on probing", False),
    ("Score 3: Severe inflammation, spontaneous bleeding", False),
    ("Rating: Excellent (0), Good (0.1-0.9), Fair (1.0-1.9), Poor (2.0-3.0)", False),
    ("", False),
    ("Sulcus Bleeding Index (SBI) - Muhlemann & Son (1971):", True),
    ("Score 0: Healthy, no bleeding", False),
    ("Score 1: Healthy appearance but bleeding on probing", False),
    ("Score 2-3: Bleeding + inflammation signs", False),
    ("Score 4-5: Spontaneous bleeding + swelling", False),
    ("", False),
    ("4. PERIODONTAL INDICES", True),
    ("", False),
    ("Periodontal Index (PI) - Russell (1956):", True),
    ("Composite index (gingivitis + periodontitis)", False),
    ("Score 0: Normal", False),
    ("Score 1-2: Gingivitis", False),
    ("Score 6: Severe with bone loss", False),
    ("Score 8: Advanced destructive disease", False),
    ("", False),
    ("Community Periodontal Index (CPITN/CPI):", True),
    ("WHO Probe markings: 3.5 - 5.5 - 8.5 - 11.5 mm", False),
    ("Score 0: Healthy - No treatment", False),
    ("Score 1: Bleeding - OHI", False),
    ("Score 2: Calculus - OHI + cleaning", False),
    ("Score 3: Pocket 4-5 mm - Subgingival cleaning", False),
    ("Score 4: Pocket >=6 mm - Complex treatment", False),
]

for text, is_heading in sections3:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# New Page - Caries and Biostatistics
pdf.add_page()

sections4 = [
    ("5. DENTAL CARIES INDICES", True),
    ("", False),
    ("DMFT (Decayed, Missing, Filled Teeth):", True),
    ("Formula: DMFT = D + M + F", False),
    ("D: Untreated decayed teeth", False),
    ("M: Missing teeth due to caries only", False),
    ("F: Filled/restored teeth", False),
    ("", False),
    ("DMFS (Decayed, Missing, Filled Surfaces):", True),
    ("5 surfaces per posterior tooth", False),
    ("4 surfaces per anterior tooth", False),
    ("Higher sensitivity than DMFT", False),
    ("", False),
    ("Primary Teeth Indices:", True),
    ("dft: Decayed and filled teeth", False),
    ("dfs: Decayed and filled surfaces", False),
    ("Note: M not used (exfoliation is normal)", False),
    ("", False),
    ("SIC Index (Significant Caries Index):", True),
    ("Mean DMFT of one-third population with highest caries scores", False),
    ("", False),
    ("6. DENTAL FLUOROSIS INDICES", True),
    ("", False),
    ("Dean's Fluorosis Index:", True),
    ("0: Normal", False),
    ("0.5: Questionable", False),
    ("1: Very mild (small opaque areas)", False),
    ("2: Mild (white opaque <50% surface)", False),
    ("3: Moderate (marked wear, brown stain)", False),
    ("4: Severe (marked hypoplasia, extensive stain)", False),
    ("", False),
    ("Community Fluorosis Index (CFI):", True),
    ("Measure of fluorosis severity at community level", False),
]

for text, is_heading in sections4:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# Biostatistics Page
pdf.add_page()

sections5 = [
    ("SECTION F: APPLIED BIOSTATISTICS", True),
    ("", False),
    ("1. BASIC DEFINITIONS", True),
    ("Statistics: Science of collecting, summarizing, presenting, analyzing data", False),
    ("Population: Entire collection being studied", False),
    ("Sample: Group selected from population", False),
    ("Parameter: Population characteristic value", False),
    ("Statistic: Quantity calculated from sample", False),
    ("", False),
    ("2. TYPES OF DATA", True),
    ("Nominal: Categories without order (Gender, blood group)", False),
    ("Ordinal: Categories with order (Pain severity)", False),
    ("Interval: Equal intervals (Temperature)", False),
    ("Ratio: True zero (Height, weight, DMFT)", False),
    ("", False),
    ("Numerical Variables:", True),
    ("Discrete: Finite/countable (Number of teeth)", False),
    ("Continuous: Range on continuum (Pocket depth)", False),
    ("", False),
    ("3. MEASURES OF CENTRAL TENDENCY", True),
    ("", False),
    ("Mean (Arithmetic Average):", True),
    ("- Sum of observations / Number of observations", False),
    ("- Affected by extreme values", False),
    ("- Can be used for further mathematical calculations", False),
    ("", False),
    ("Median:", True),
    ("- Middle value when data arranged in order", False),
    ("- Not affected by extreme values", False),
    ("- Can be located graphically", False),
    ("", False),
    ("Mode:", True),
    ("- Most frequent value", False),
    ("- Can be bimodal or multimodal", False),
    ("- Applicable for qualitative and quantitative data", False),
    ("", False),
    ("4. MEASURES OF DISPERSION", True),
    ("Range: Xmax - Xmin", False),
    ("Quartile Deviation: (Q3 - Q1) / 2", False),
    ("Standard Deviation (SD): Root mean square deviation", False),
    ("Standard Error (SE): SD / sqrt(n)", False),
    ("", False),
    ("SD vs SE:", True),
    ("SD: Shape of distribution, data spread around mean", False),
    ("SE: Reliability of sample mean", False),
    ("SE decreases with larger sample size", False),
]

for text, is_heading in sections5:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# Final Page - Probability and Key Points
pdf.add_page()

sections6 = [
    ("5. NORMAL DISTRIBUTION", True),
    ("Characteristics:", True),
    ("- Bell-shaped, symmetrical curve", False),
    ("- Mean = Median = Mode", False),
    ("- Total area = 1 (100%)", False),
    ("", False),
    ("Confidence Limits:", True),
    ("Mean +/- 1 SD: Includes 68% of values", False),
    ("Mean +/- 2 SD: Includes 95% of values", False),
    ("Mean +/- 3 SD: Includes 99.7% of values", False),
    ("", False),
    ("6. PROBABILITY AND SIGNIFICANCE", True),
    ("", False),
    ("P-Value Interpretation:", True),
    ("P < 0.001: Very highly significant", False),
    ("P < 0.01: Highly significant", False),
    ("P < 0.05: Significant", False),
    ("P > 0.05: Not significant", False),
    ("", False),
    ("Formula: P = Events occurring / Total trials", False),
    ("", False),
    ("7. SENSITIVITY AND SPECIFICITY", True),
    ("", False),
    ("2x2 Contingency Table:", True),
    ("                 Disease +    Disease -", False),
    ("Test +           TP           FP", False),
    ("Test -           FN           TN", False),
    ("", False),
    ("Sensitivity (True Positive Rate): TP / (TP + FN)", False),
    ("Specificity (True Negative Rate): TN / (TN + FP)", False),
    ("PPV: TP / (TP + FP)", False),
    ("NPV: TN / (TN + FN)", False),
    ("", False),
    ("8. STUDY DESIGNS", True),
    ("Cross-sectional: Snapshot at one time", False),
    ("Cohort: Follow groups over time", False),
    ("Case-control: Compare cases vs controls", False),
    ("RCT: Randomized controlled trial", False),
    ("", False),
    ("KEY MNEMONICS", True),
    ("", False),
    ("5 Fs of Indirect Transmission:", True),
    ("Flies, Fingers, Fomites, Food, Fluid", False),
    ("", False),
    ("TORCH Infections:", True),
    ("Toxoplasma, Rubella, Cytomegalovirus, Herpes", False),
    ("", False),
    ("EXAM HIGH-YIELD POINTS", True),
    ("1. Epidemiology definition - John M Last", False),
    ("2. Chain of infection - Reservoir -> Transmission -> Host", False),
    ("3. Incubation period - Time between invasion and first symptom", False),
    ("4. PHC - Alma-Ata declaration, 8 essential components", False),
    ("5. DMFT - Missing only if due to caries", False),
    ("6. OHI-S - 6 teeth examined, score 0-6", False),
    ("7. CPITN - WHO probe: 3.5-5.5-8.5-11.5 mm", False),
    ("8. Gingival Index - 0-3 scale by Loe & Silness", False),
    ("9. Mean +/- 2 SD - Includes 95% of values", False),
    ("10. P < 0.05 - Statistically significant", False),
    ("11. Sensitivity - True positive rate", False),
    ("12. Specificity - True negative rate", False),
    ("", False),
    ("Compiled from Textbook of Preventive and Community Dentistry", False),
]

for text, is_heading in sections6:
    if is_heading:
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Helvetica', '', 10)
    else:
        if text:
            pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.ln(3)

# Save PDF
pdf.output('PREVENTIVE_COMMUNITY_DENTISTRY_NOTES.pdf')
print("PDF created successfully!")
print("File: PREVENTIVE_COMMUNITY_DENTISTRY_NOTES.pdf")
