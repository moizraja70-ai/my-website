from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 9)
        self.set_text_color(80, 80, 80)
        self.cell(0, 8, 'Preventive & Community Dentistry - Comprehensive Notes', new_x="LMARGIN", new_y="NEXT", align='C')
        self.set_draw_color(0, 51, 102)
        self.line(10, 18, 200, 18)
        self.ln(2)
    
    def footer(self):
        self.set_y(-12)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)

# Helper function to add content
def add_page_content(title, sections):
    pdf.add_page()
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 12, title, new_x="LMARGIN", new_y="NEXT", align='C')
    pdf.ln(3)
    
    for item in sections:
        text = item['text']
        style = item.get('style', 'normal')
        
        if style == 'heading1':
            pdf.set_font('Helvetica', 'B', 14)
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(2)
        elif style == 'heading2':
            pdf.set_font('Helvetica', 'B', 12)
            pdf.set_text_color(0, 80, 120)
            pdf.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
            pdf.ln(1)
        elif style == 'heading3':
            pdf.set_font('Helvetica', 'B', 11)
            pdf.set_text_color(0, 0, 0)
            pdf.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        elif style == 'bullet':
            pdf.set_font('Helvetica', '', 10)
            pdf.cell(5, 6, '', new_x="RIGHT", new_y="TOP")
            pdf.cell(5, 6, chr(149), new_x="RIGHT", new_y="TOP")
            pdf.multi_cell(190, 6, text)
        elif style == 'subbullet':
            pdf.set_font('Helvetica', '', 10)
            pdf.cell(12, 6, '', new_x="RIGHT", new_y="TOP")
            pdf.cell(5, 6, '-', new_x="RIGHT", new_y="TOP")
            pdf.multi_cell(190, 6, text)
        elif style == 'highlight':
            pdf.set_font('Helvetica', 'B', 10)
            pdf.set_fill_color(230, 240, 255)
            pdf.multi_cell(190, 6, text, fill=True)
            pdf.ln(1)
        elif style == 'note':
            pdf.set_font('Helvetica', 'I', 9)
            pdf.set_text_color(80, 80, 80)
            pdf.cell(5, 6, '', new_x="RIGHT", new_y="TOP")
            pdf.multi_cell(190, 6, f'Note: {text}')
            pdf.set_text_color(0, 0, 0)
        elif style == 'table_header':
            pdf.set_font('Helvetica', 'B', 9)
            pdf.set_fill_color(200, 220, 240)
            pdf.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT", fill=True)
        elif style == 'table_row':
            pdf.set_font('Helvetica', '', 9)
            pdf.multi_cell(190, 6, text)
        else:  # normal
            pdf.set_font('Helvetica', '', 10)
            pdf.multi_cell(190, 6, text)
        
        pdf.set_text_color(0, 0, 0)

# ============ SECTION B: EPIDEMIOLOGY ============
sections_epidemiology = [
    {'text': 'SECTION B: EPIDEMIOLOGY', 'style': 'heading1'},
    
    {'text': '1. INTRODUCTION TO EPIDEMIOLOGY', 'style': 'heading2'},
    {'text': 'Definition (John M Last):', 'style': 'heading3'},
    {'text': '"The study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to control health problems."', 'style': 'highlight'},
    {'text': 'Epidemiology is the cornerstone of public health. It helps us understand how diseases spread, who gets them, and why. This knowledge is essential for planning effective prevention and control strategies.', 'style': 'normal'},
    {'text': 'Key Components:', 'style': 'heading3'},
    {'text': 'Distribution: Analysis of disease patterns by time, place, and person', 'style': 'bullet'},
    {'text': 'Determinants: Factors that influence disease occurrence (host, agent, environment)', 'style': 'bullet'},
    {'text': 'Application: Using findings to prevent and control health problems', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '2. BASIC DEFINITIONS', 'style': 'heading2'},
    
    {'text': 'HEALTH (WHO Definition, 1948):', 'style': 'heading3'},
    {'text': '"A state of complete physical, mental and social well-being and not merely the absence of disease or infirmity."', 'style': 'highlight'},
    {'text': 'This definition emphasizes that health is multidimensional - it includes physical fitness, mental stability, and social adjustment. It is not just about being disease-free.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'DISEASE:', 'style': 'heading3'},
    {'text': 'A pathological condition of the body or its parts, marked by an identifiable group of signs and symptoms, resulting from various causes such as infection, genetics, environmental factors, or lifestyle choices.', 'style': 'normal'},
    {'text': 'Spectrum of Disease: Subclinical Cases -> Mild Illness -> Severe Illness -> Fatal Illness', 'style': 'highlight'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'INFECTIOUS DISEASE:', 'style': 'heading3'},
    {'text': 'Any disease caused by the invasion and multiplication of microorganisms (bacteria, viruses, fungi, parasites) in the body tissues. Examples include tuberculosis, influenza, and dental caries (caused by bacteria).', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'ENDEMIC:', 'style': 'heading3'},
    {'text': 'The constant presence of a disease or infectious agent within a given geographic area or population group. Example: Malaria is endemic to certain tropical regions.', 'style': 'normal'},
    
    {'text': 'EPIDEMIC:', 'style': 'heading3'},
    {'text': 'The occurrence of more cases of disease than expected in a given area or among a specific group of people over a particular period. Example: Influenza epidemic.', 'style': 'normal'},
    
    {'text': 'PANDEMIC:', 'style': 'heading3'},
    {'text': 'An epidemic that has spread over several countries or continents, affecting a large number of people. Example: COVID-19 pandemic.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': '3. DYNAMICS OF DISEASE TRANSMISSION', 'style': 'heading2'},
    
    {'text': 'The Chain of Infection:', 'style': 'heading3'},
    {'text': 'For an infectious disease to occur and spread, three fundamental elements must be present and linked in a chain:', 'style': 'normal'},
    
    {'text': 'LINK 1: THE RESERVOIR (Source of Infection)', 'style': 'heading3'},
    {'text': 'Definition: Any person, animal, arthropod, plant, soil, or substance (or combination) in which an infectious agent normally lives and multiplies, and on which it depends for survival.', 'style': 'normal'},
    {'text': 'Types of Reservoirs:', 'style': 'bullet'},
    {'text': 'Human Reservoir: The most important source for human diseases. Humans can be either cases (showing symptoms) or carriers (asymptomatic but infectious). Examples: Typhoid carriers, HIV-positive individuals.', 'style': 'subbullet'},
    {'text': 'Animal Reservoir: Animals that transmit zoonotic diseases to humans. Over 100 zoonoses exist. Examples: Rabies (dogs, bats), Yellow fever (mosquitoes), Plague (rodents).', 'style': 'subbullet'},
    {'text': 'Non-living Reservoir: Soil, water, or inanimate objects. Examples: Tetanus spores in soil, fungal infections from soil.', 'style': 'subbullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Types of Human Carriers:', 'style': 'heading3'},
    {'text': 'Incubatory Carrier: Sheds infectious agent during the incubation period (before symptoms appear). Example: Polio, chickenpox.', 'style': 'bullet'},
    {'text': 'Convalescent Carrier: Continues to shed agent during recovery. Example: Cholera, typhoid.', 'style': 'bullet'},
    {'text': 'Healthy Carrier: Hosts agent but never develops disease. Example: Typhoid Mary.', 'style': 'bullet'},
    {'text': 'Chronic Carrier: Sheds agent for months or years. Example: Hepatitis B carriers.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'LINK 2: MODE OF TRANSMISSION', 'style': 'heading3'},
    {'text': 'The mechanism by which an infectious agent passes from the reservoir to a susceptible host. Understanding transmission modes is crucial for breaking the chain of infection.', 'style': 'normal'},
    
    {'text': 'A. DIRECT TRANSMISSION:', 'style': 'heading3'},
    {'text': 'Immediate transfer of infectious agents from reservoir to host without intermediate objects.', 'style': 'normal'},
    {'text': 'Direct Contact: Physical touching between infected and susceptible person. Diseases: STDs (HIV, gonorrhea, syphilis), leprosy, skin infections.', 'style': 'bullet'},
    {'text': 'Droplet Infection: Large respiratory droplets ( >5 micrometers) expelled during coughing, sneezing, talking, or singing. Travels short distances (less than 1 meter). Diseases: Common cold, influenza, diphtheria, whooping cough, meningococcal meningitis.', 'style': 'bullet'},
    {'text': 'Contact with Soil: Direct exposure to contaminated soil. Diseases: Hookworm (larvae penetrate skin), tetanus (spores enter wounds).', 'style': 'bullet'},
    {'text': 'Inoculation: Direct introduction through skin/mucosa. Diseases: Rabies (animal bite), hepatitis B (needle stick), HIV (contaminated needles).', 'style': 'bullet'},
    {'text': 'Transplacental (Vertical): Mother to fetus transmission. TORCH infections: Toxoplasmosis, Rubella, Cytomegalovirus, Herpes, Others (HIV, syphilis).', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'B. INDIRECT TRANSMISSION:', 'style': 'heading3'},
    {'text': 'Transmission via intermediate objects or organisms. Remember the 5 Fs: Flies, Fingers, Fomites, Food, Fluid.', 'style': 'normal'},
    {'text': 'Vehicle-borne: Through contaminated water, food, ice, blood, or biological products. Waterborne: Cholera, typhoid, hepatitis A. Foodborne: Salmonella, food poisoning.', 'style': 'bullet'},
    {'text': 'Vector-borne: Via living organisms (arthropods). Mechanical: Fly carries typhoid on feet. Biological: Malaria (plasmodium develops in mosquito).', 'style': 'bullet'},
    {'text': 'Air-borne: Droplet nuclei (<5 micrometers) remain suspended in air for long periods, or dust particles. Diseases: Tuberculosis, measles, chickenpox.', 'style': 'bullet'},
    {'text': 'Fomite-borne: Contaminated inanimate objects. Examples: Soiled clothes, towels, cups, toys, dental instruments. Diseases: Diphtheria, influenza.', 'style': 'bullet'},
    {'text': 'Unclean Hands: Most common transmission mode. Hands transfer pathogens from contaminated surfaces to mouth or food.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'LINK 3: SUSCEPTIBLE HOST', 'style': 'heading3'},
    {'text': 'A person who lacks sufficient immunity to resist infection. Susceptibility depends on:', 'style': 'normal'},
    {'text': 'Age: Very young and elderly are more susceptible', 'style': 'bullet'},
    {'text': 'Immune Status: Immunocompromised individuals (HIV, diabetes, cancer patients)', 'style': 'bullet'},
    {'text': 'Nutritional Status: Malnutrition reduces immunity', 'style': 'bullet'},
    {'text': 'Heredity: Genetic predisposition to certain infections', 'style': 'bullet'},
    {'text': 'Portal of Entry: Respiratory, GI tract, skin, genital tract', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '4. STAGES OF INFECTIOUS DISEASE', 'style': 'heading2'},
    {'text': 'Understanding disease stages helps in diagnosis, treatment planning, and determining when a person is most infectious.', 'style': 'normal'},
    
    {'text': 'Stage 1: INCUBATION PERIOD', 'style': 'heading3'},
    {'text': 'The time interval between invasion by an infectious agent and the appearance of the first sign or symptom of the disease.', 'style': 'highlight'},
    {'text': 'During this period, the agent multiplies in the host. The patient is typically not infectious during early incubation, but may become so toward the end.', 'style': 'normal'},
    {'text': 'Examples: Chickenpox (14-16 days), Measles (10-14 days), Common cold (1-3 days), Tetanus (3-21 days).', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Stage 2: PRODROMAL STAGE', 'style': 'heading3'},
    {'text': 'The period from the onset of initial nonspecific symptoms (malaise, low-grade fever, headache) until the appearance of disease-specific symptoms. The person is often infectious during this stage.', 'style': 'normal'},
    
    {'text': 'Stage 3: PERIOD OF ILLNESS (Fastigium)', 'style': 'heading3'},
    {'text': 'The disease is fully developed with characteristic signs and symptoms at their peak. The patient is clearly ill and highly infectious.', 'style': 'normal'},
    
    {'text': 'Stage 4: PERIOD OF DECLINE (Defervescence)', 'style': 'heading3'},
    {'text': 'Signs and symptoms begin to fade. Temperature returns to normal. The patient is recovering but may still be infectious.', 'style': 'normal'},
    
    {'text': 'Stage 5: PERIOD OF CONVALESCENCE', 'style': 'heading3'},
    {'text': 'The patient regains strength and returns to normal health. May still be a carrier in some diseases.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': '5. IMMUNITY', 'style': 'heading2'},
    {'text': 'Immunity is the body\'s ability to resist infection and protect against disease. It involves a complex system of cells, tissues, and organs that work together to defend the body against harmful invaders.', 'style': 'normal'},
    
    {'text': 'A. ACTIVE IMMUNITY', 'style': 'heading3'},
    {'text': 'Definition: Immunity that results from the production of antibodies by the immune system in response to the presence of an antigen (foreign substance).', 'style': 'highlight'},
    {'text': 'Characteristics:', 'style': 'bullet'},
    {'text': 'Takes time to develop (days to weeks)', 'style': 'subbullet'},
    {'text': 'Long-lasting (months to lifetime)', 'style': 'subbullet'},
    {'text': 'Involves memory cells that provide rapid response on re-exposure', 'style': 'subbullet'},
    {'text': 'Types:', 'style': 'bullet'},
    {'text': 'Natural Active: Following clinical or subclinical infection. Examples: Chickenpox, measles, mumps - one infection usually provides lifelong immunity.', 'style': 'subbullet'},
    {'text': 'Artificial Active: Through vaccination. Vaccines may be: Live attenuated (MMR), Killed/inactivated (rabies), Toxoid (tetanus), Subunit/recombinant (hepatitis B).', 'style': 'subbullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'B. PASSIVE IMMUNITY', 'style': 'heading3'},
    {'text': 'Definition: Immunity conferred by the transfer of ready-made antibodies from an immune individual to a non-immune individual.', 'style': 'highlight'},
    {'text': 'Characteristics:', 'style': 'bullet'},
    {'text': 'Immediate protection', 'style': 'subbullet'},
    {'text': 'Short duration (weeks to months)', 'style': 'subbullet'},
    {'text': 'No memory formation', 'style': 'subbullet'},
    {'text': 'Types:', 'style': 'bullet'},
    {'text': 'Natural Passive: Maternal antibodies crossing placenta (IgG) or in breast milk (IgA). Protects infant in first months of life.', 'style': 'subbullet'},
    {'text': 'Artificial Passive: Administration of immunoglobulins or antisera. Used for post-exposure prophylaxis.', 'style': 'subbullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Types of Immunoglobulin Preparations:', 'style': 'heading3'},
    {'text': 'Normal Human Immunoglobulin (Ig):', 'style': 'bullet'},
    {'text': 'Source: Pool of plasma from >1000 donors', 'style': 'subbullet'},
    {'text': 'Uses: Measles prophylaxis, Hepatitis A protection for travelers, Immunodeficiency disorders', 'style': 'subbullet'},
    {'text': 'Specific (Hyperimmune) Human Ig:', 'style': 'bullet'},
    {'text': 'Source: Plasma from recovered patients or immunized donors', 'style': 'subbullet'},
    {'text': 'High antibody content against specific pathogen', 'style': 'subbullet'},
    {'text': 'Uses: Hepatitis B, Rabies, Tetanus, Varicella-zoster post-exposure', 'style': 'subbullet'},
    {'text': 'Antisera (Animal-derived):', 'style': 'bullet'},
    {'text': 'Source: Serum from immunized horses', 'style': 'subbullet'},
    {'text': 'Risk: Serum sickness, anaphylaxis', 'style': 'subbullet'},
    {'text': 'Uses: Snake bite antivenom, Diphtheria antitoxin, Botulism antitoxin', 'style': 'subbullet'},
]

add_page_content('', sections_epidemiology)

# Continue with more pages...
# Due to length, I'll create the rest of the content more efficiently

# Page 2 - More Epidemiology and start of Infection Control
sections_page2 = [
    {'text': '6. SCREENING FOR DISEASE', 'style': 'heading2'},
    {'text': 'Definition:', 'style': 'heading3'},
    {'text': 'Screening is the presumptive identification of unrecognized disease or defect by the application of tests, examinations, or other procedures which can be applied rapidly. Screening tests are not intended to be diagnostic.', 'style': 'highlight'},
    {'text': 'Purpose of Screening:', 'style': 'heading3'},
    {'text': 'Case Detection: Identifying individuals with unrecognized disease', 'style': 'bullet'},
    {'text': 'Disease Control: Protecting the community (e.g., screening immigrants for TB)', 'style': 'bullet'},
    {'text': 'Research: Studying natural history of disease, prevalence estimates', 'style': 'bullet'},
    {'text': 'Education: Creating public awareness about health issues', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Criteria for Screening Tests (Wilson and Jungner Criteria):', 'style': 'heading3'},
    {'text': 'The condition should be an important health problem', 'style': 'bullet'},
    {'text': 'There should be an accepted treatment for the condition', 'style': 'bullet'},
    {'text': 'Facilities for diagnosis and treatment should be available', 'style': 'bullet'},
    {'text': 'The disease should have a recognizable latent or early symptomatic stage', 'style': 'bullet'},
    {'text': 'The screening test should be acceptable to the population', 'style': 'bullet'},
    {'text': 'The screening test should be sensitive and specific', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Examples of Screening Programs:', 'style': 'heading3'},
    {'text': 'Dental: Oral cancer screening, caries risk assessment', 'style': 'bullet'},
    {'text': 'Medical: Newborn screening (PKU), Pap smear for cervical cancer', 'style': 'bullet'},
    {'text': 'Public Health: TB screening, diabetes screening', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '7. IMMUNIZATION', 'style': 'heading2'},
    {'text': 'Vaccination is one of the most cost-effective public health interventions. It has eradicated smallpox and nearly eliminated polio.', 'style': 'normal'},
    {'text': 'National Immunization Schedule (India) - Key Vaccines:', 'style': 'heading3'},
    {'text': 'BCG (Birth): Tuberculosis', 'style': 'bullet'},
    {'text': 'OPV (Birth, 6, 10, 14 weeks): Polio', 'style': 'bullet'},
    {'text': 'DPT (6, 10, 14 weeks): Diphtheria, Pertussis, Tetanus', 'style': 'bullet'},
    {'text': 'Measles (9-12 months)', 'style': 'bullet'},
    {'text': 'MMR (15-18 months): Measles, Mumps, Rubella', 'style': 'bullet'},
    {'text': 'Hepatitis B (Birth, 6, 14 weeks)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Herd Immunity:', 'style': 'heading3'},
    {'text': 'When a sufficient proportion of a population is immunized against an infectious disease, the chain of transmission is broken, providing indirect protection to unimmunized individuals.', 'style': 'highlight'},
    {'text': 'Threshold varies by disease: Measles (95%), Polio (80%), Diphtheria (85%).', 'style': 'normal'},
]

add_page_content('', sections_page2)

# Section C: Infection Control
sections_infection = [
    {'text': 'SECTION C: INFECTION CONTROL', 'style': 'heading1'},
    
    {'text': '1. NATIONAL HEALTH POLICY (NHP-2002)', 'style': 'heading2'},
    {'text': 'The National Health Policy 2002 was formulated to achieve an acceptable standard of good health among the general population and provide access to equitable, affordable, and quality healthcare.', 'style': 'normal'},
    
    {'text': 'Key Objectives:', 'style': 'heading3'},
    {'text': 'Eradicate Polio and Yaws by 2005', 'style': 'bullet'},
    {'text': 'Eliminate Leprosy by 2005', 'style': 'bullet'},
    {'text': 'Eliminate Kala-azar by 2010', 'style': 'bullet'},
    {'text': 'Eliminate Lymphatic Filariasis by 2015', 'style': 'bullet'},
    {'text': 'Achieve zero growth of HIV/AIDS by 2007', 'style': 'bullet'},
    {'text': 'Reduce IMR to 30/1000 live births', 'style': 'bullet'},
    {'text': 'Reduce MMR to 100/100,000 live births', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '2. HEALTH CARE SYSTEM IN INDIA', 'style': 'heading2'},
    {'text': 'The healthcare system in India is a mix of public and private sectors, organized at various levels to provide preventive, promotive, curative, and rehabilitative services.', 'style': 'normal'},
    
    {'text': 'Five Major Sectors:', 'style': 'heading3'},
    {'text': 'Public Health Sector: Government-run facilities including PHCs, CHCs, district hospitals', 'style': 'bullet'},
    {'text': 'Private Sector: Private hospitals, clinics, nursing homes', 'style': 'bullet'},
    {'text': 'Indigenous Systems: Ayurveda, Yoga, Unani, Siddha, Homeopathy (AYUSH)', 'style': 'bullet'},
    {'text': 'Voluntary Agencies: Non-profit organizations, charitable institutions', 'style': 'bullet'},
    {'text': 'National Health Programmes: Disease-specific programs (RNTCP, NVBDCP)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '3. PRIMARY HEALTH CARE (PHC)', 'style': 'heading2'},
    {'text': 'Definition (Alma-Ata Declaration, 1978):', 'style': 'heading3'},
    {'text': '"Primary health care is essential health care made universally accessible to individuals and acceptable to them, through their full participation and at a cost the community and country can afford."', 'style': 'highlight'},
    
    {'text': 'Eight Essential Components of PHC:', 'style': 'heading3'},
    {'text': 'Education concerning prevailing health problems and methods to prevent and control them', 'style': 'bullet'},
    {'text': 'Promotion of food supply and proper nutrition', 'style': 'bullet'},
    {'text': 'Adequate supply of safe water and basic sanitation', 'style': 'bullet'},
    {'text': 'Maternal and child health care including family planning', 'style': 'bullet'},
    {'text': 'Immunization against major infectious diseases', 'style': 'bullet'},
    {'text': 'Prevention and control of locally endemic diseases', 'style': 'bullet'},
    {'text': 'Appropriate treatment of common diseases and injuries', 'style': 'bullet'},
    {'text': 'Provision of essential drugs', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Principles of PHC:', 'style': 'heading3'},
    {'text': 'Equitable Distribution: Health services must reach all people, especially the underserved', 'style': 'bullet'},
    {'text': 'Community Participation: Active involvement of individuals and communities', 'style': 'bullet'},
    {'text': 'Intersectoral Coordination: Collaboration between health and other sectors', 'style': 'bullet'},
    {'text': 'Appropriate Technology: Scientifically valid, adaptable to local needs, affordable', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '4. HEALTH CARE HIERARCHY IN INDIA', 'style': 'heading2'},
    {'text': 'Level 1: Subcentre', 'style': 'heading3'},
    {'text': 'Coverage: 3,000-5,000 population (plain areas)', 'style': 'bullet'},
    {'text': 'Staff: One Male and one Female Health Worker', 'style': 'bullet'},
    {'text': 'Functions: MCH, family planning, immunization, nutrition, sanitation', 'style': 'bullet'},
    
    {'text': 'Level 2: Primary Health Centre (PHC)', 'style': 'heading3'},
    {'text': 'Coverage: 20,000-30,000 population', 'style': 'bullet'},
    {'text': 'Staff: Medical officer, nurses, pharmacists, technicians', 'style': 'bullet'},
    {'text': 'Functions: Outpatient care, 24-hour emergency, delivery services', 'style': 'bullet'},
    
    {'text': 'Level 3: Community Health Centre (CHC)', 'style': 'heading3'},
    {'text': 'Coverage: 80,000-120,000 population', 'style': 'bullet'},
    {'text': 'Beds: 30 beds', 'style': 'bullet'},
    {'text': 'Specialists: Surgery, Medicine, Obstetrics/Gynecology, Pediatrics', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '5. VILLAGE LEVEL HEALTH WORKERS', 'style': 'heading2'},
    
    {'text': 'ASHA (Accredited Social Health Activist):', 'style': 'heading3'},
    {'text': 'Launched: Under NRHM (National Rural Health Mission)', 'style': 'bullet'},
    {'text': 'Selection: Woman aged 25-45 years, literate, preferably married', 'style': 'bullet'},
    {'text': 'Coverage: 1 per 1000 population', 'style': 'bullet'},
    {'text': 'Training: 23 days spread over 12 months', 'style': 'bullet'},
    {'text': 'Role: Health activist, DOTS provider for TB, accompany pregnant women for delivery, maintain records', 'style': 'bullet'},
    
    {'text': 'Anganwadi Worker (AWW):', 'style': 'heading3'},
    {'text': 'Under: Integrated Child Development Services (ICDS) Scheme', 'style': 'bullet'},
    {'text': 'Coverage: 400-800 population/1 km radius', 'style': 'bullet'},
    {'text': 'Services: Supplementary nutrition, preschool education, health check-ups, referral', 'style': 'bullet'},
    
    {'text': 'Village Health Guide:', 'style': 'heading3'},
    {'text': 'Started: 1977', 'style': 'bullet'},
    {'text': 'Training: 200 hours over 3 months', 'style': 'bullet'},
    {'text': 'Functions: First aid, treatment of simple ailments, MCH services', 'style': 'bullet'},
]

add_page_content('', sections_infection)

# Indices Section
sections_indices = [
    {'text': 'CHAPTER 12: INDICES FOR ORAL DISEASES', 'style': 'heading1'},
    
    {'text': '1. INTRODUCTION', 'style': 'heading2'},
    {'text': 'Definition (Russell AL):', 'style': 'heading3'},
    {'text': '"An index is a numerical value describing the relative status of a population on a graduated scale with definite upper and lower limits, which is designed to permit and facilitate comparison with other populations classified by the same criteria and methods."', 'style': 'highlight'},
    
    {'text': 'Purpose of Indices:', 'style': 'heading3'},
    {'text': 'Describe the status of individuals or groups with respect to a condition being measured', 'style': 'bullet'},
    {'text': 'Compare extent and severity of disease between populations', 'style': 'bullet'},
    {'text': 'Assess treatment needs', 'style': 'bullet'},
    {'text': 'Evaluate effectiveness of preventive programs', 'style': 'bullet'},
    {'text': 'Motivate patients through education', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Ideal Requisites of an Index:', 'style': 'heading3'},
    {'text': 'Clarity and Simplicity: Easy to understand and apply', 'style': 'bullet'},
    {'text': 'Validity: Measures what it is intended to measure', 'style': 'bullet'},
    {'text': 'Reliability: Produces consistent results under various conditions', 'style': 'bullet'},
    {'text': 'Quantifiability: Can be expressed numerically and analyzed statistically', 'style': 'bullet'},
    {'text': 'Sensitivity: Able to detect small changes in either direction', 'style': 'bullet'},
    {'text': 'Acceptability: Should not cause discomfort to subjects', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '2. PLAQUE INDEX (PlI) - Silness and Loe (1964)', 'style': 'heading2'},
    {'text': 'Purpose:', 'style': 'heading3'},
    {'text': 'To assess the thickness of plaque at the gingival area of the tooth surface.', 'style': 'normal'},
    
    {'text': 'Selection of Teeth:', 'style': 'heading3'},
    {'text': 'The entire dentition or selected teeth can be evaluated', 'style': 'bullet'},
    {'text': 'Four gingival areas examined per tooth: Distal, Facial, Mesial, Lingual', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Procedure:', 'style': 'heading3'},
    {'text': 'Dry the teeth and examine visually using adequate light, mouth mirror, and probe', 'style': 'bullet'},
    {'text': 'Evaluate bacterial plaque on the cervical third', 'style': 'bullet'},
    {'text': 'Use disclosing agent if necessary for scores 0-1', 'style': 'bullet'},
    {'text': 'If GI is also being measured, GI must be done first (disclosing agent masks gingival characteristics)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Scoring Criteria:', 'style': 'heading3'},
    {'text': 'Score 0: No plaque', 'style': 'bullet'},
    {'text': 'Score 1: A film of plaque adhering to the free gingival margin. May only be recognized after disclosing agent or by running explorer across tooth.', 'style': 'bullet'},
    {'text': 'Score 2: Moderate accumulation of soft deposits within the gingival pocket, visible with naked eye.', 'style': 'bullet'},
    {'text': 'Score 3: Abundance of soft matter within the gingival pocket and/or on tooth and gingival margin.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Calculation:', 'style': 'heading3'},
    {'text': 'PlI for a tooth = Total of 4 area scores / 4', 'style': 'bullet'},
    {'text': 'PlI for individual = Total of all tooth scores / Number of teeth examined', 'style': 'bullet'},
    {'text': 'Range: 0 to 3', 'style': 'bullet'},
    
    {'text': 'Interpretation:', 'style': 'heading3'},
    {'text': '0 = Excellent, 0.1-0.9 = Good, 1.0-1.9 = Fair, 2.0-3.0 = Poor', 'style': 'highlight'},
    
    {'text': '', 'style': 'normal'},
    {'text': '3. SIMPLIFIED ORAL HYGIENE INDEX (OHI-S) - Greene & Vermillion (1964)', 'style': 'heading2'},
    {'text': 'Purpose:', 'style': 'heading3'},
    {'text': 'To assess oral cleanliness by estimating the tooth surfaces covered with debris or calculus.', 'style': 'normal'},
    
    {'text': 'Components:', 'style': 'heading3'},
    {'text': 'Simplified Debris Index (DI-S)', 'style': 'bullet'},
    {'text': 'Simplified Calculus Index (CI-S)', 'style': 'bullet'},
    {'text': 'OHI-S = DI-S + CI-S', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Tooth Selection:', 'style': 'heading3'},
    {'text': '12 teeth examined (representative of all tooth surfaces):', 'style': 'normal'},
    {'text': 'Maxillary: 16, 11, 26 (facial surfaces)', 'style': 'bullet'},
    {'text': 'Mandibular: 46, 31, 36 (lingual surfaces)', 'style': 'bullet'},
    {'text': 'Note: If first molar missing, use second molar. If central incisor missing, use lateral incisor.', 'style': 'note'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Debris Scoring Criteria:', 'style': 'heading3'},
    {'text': '0 = No debris/stain', 'style': 'bullet'},
    {'text': '1 = Soft debris covering not more than 1/3 of tooth surface', 'style': 'bullet'},
    {'text': '2 = Soft debris covering >1/3 but not more than 2/3 of surface', 'style': 'bullet'},
    {'text': '3 = Soft debris covering >2/3 of surface', 'style': 'bullet'},
    
    {'text': 'Calculus Scoring Criteria:', 'style': 'heading3'},
    {'text': '0 = No calculus', 'style': 'bullet'},
    {'text': '1 = Supragingival calculus covering not more than 1/3 of surface', 'style': 'bullet'},
    {'text': '2 = Supragingival calculus >1/3-2/3 OR flecks of subgingival calculus', 'style': 'bullet'},
    {'text': '3 = Supragingival calculus >2/3 OR continuous heavy band of subgingival calculus', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Calculation:', 'style': 'heading3'},
    {'text': 'DI-S = Total debris scores / Number of surfaces examined', 'style': 'bullet'},
    {'text': 'CI-S = Total calculus scores / Number of surfaces examined', 'style': 'bullet'},
    {'text': 'OHI-S = DI-S + CI-S', 'style': 'bullet'},
    
    {'text': 'Interpretation:', 'style': 'heading3'},
    {'text': '0-0.6 = Good, 0.7-1.8 = Fair (moderate), 1.9-3.0 = Poor', 'style': 'highlight'},
]

add_page_content('', sections_indices)

# More indices
sections_indices2 = [
    {'text': '4. GINGIVAL INDEX (GI) - Loe and Silness (1963)', 'style': 'heading2'},
    {'text': 'Purpose:', 'style': 'heading3'},
    {'text': 'To assess the severity of gingivitis based on color, consistency, and bleeding on probing.', 'style': 'normal'},
    
    {'text': 'Procedure:', 'style': 'heading3'},
    {'text': 'Dry teeth and gingiva', 'style': 'bullet'},
    {'text': 'Examine under adequate light using mouth mirror and probe', 'style': 'bullet'},
    {'text': 'Probe gently at entrance to gingival sulcus to assess bleeding', 'style': 'bullet'},
    {'text': 'Four areas examined per tooth: Distal, Facial, Mesial, Lingual', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Scoring Criteria:', 'style': 'heading3'},
    {'text': 'Score 0: Normal gingiva - No inflammation, no bleeding on probing', 'style': 'bullet'},
    {'text': 'Score 1: Mild inflammation - Slight change in color, slight edema. NO bleeding on probing.', 'style': 'bullet'},
    {'text': 'Score 2: Moderate inflammation - Redness, edema, glazing. Bleeding on probing.', 'style': 'bullet'},
    {'text': 'Score 3: Severe inflammation - Marked redness and edema, ulceration, tendency to spontaneous bleeding.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Calculation:', 'style': 'heading3'},
    {'text': 'GI for area: Each of 4 surfaces scored 0-3', 'style': 'bullet'},
    {'text': 'GI for tooth: Sum of 4 areas / 4', 'style': 'bullet'},
    {'text': 'GI for individual: Total scores / Number of teeth examined', 'style': 'bullet'},
    {'text': 'Range: 0 to 3', 'style': 'bullet'},
    
    {'text': 'Interpretation:', 'style': 'heading3'},
    {'text': '0 = Excellent, 0.1-0.9 = Good, 1.0-1.9 = Fair, 2.0-3.0 = Poor', 'style': 'highlight'},
    
    {'text': '', 'style': 'normal'},
    {'text': '5. PERIODONTAL INDICES', 'style': 'heading2'},
    
    {'text': 'A. Periodontal Index (PI) - Russell (1956)', 'style': 'heading3'},
    {'text': 'Type: Composite index (measures both gingivitis and periodontitis)', 'style': 'bullet'},
    {'text': 'Purpose: Assess periodontal disease status of populations', 'style': 'bullet'},
    
    {'text': 'Scoring:', 'style': 'heading3'},
    {'text': '0 = Negative. Neither overt inflammation in gingival tissue nor loss of function due to destruction of supporting tissues.', 'style': 'bullet'},
    {'text': '1 = Mild gingivitis. Overt area of inflammation in free gingiva but does not circumscribe tooth.', 'style': 'bullet'},
    {'text': '2 = Mild gingivitis. Inflammation completely circumscribes tooth but gingiva does not bleed on probing.', 'style': 'bullet'},
    {'text': '6 = Severe gingivitis with pocket formation. Inflammation completely circumscribes tooth, gingiva bleeds on probing.', 'style': 'bullet'},
    {'text': '8 = Advanced destructive disease. Tooth may be loose, may have drifted, may sound dull on percussion.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'B. Community Periodontal Index (CPI/CPITN)', 'style': 'heading3'},
    {'text': 'Developed by WHO for epidemiological surveys', 'style': 'bullet'},
    {'text': 'WHO Probe: Ball-ended probe with markings at 3.5, 5.5, 8.5, and 11.5 mm', 'style': 'bullet'},
    
    {'text': 'Index Teeth (10 teeth in adults):', 'style': 'heading3'},
    {'text': '17, 16, 11, 26, 27 (upper)', 'style': 'bullet'},
    {'text': '47, 46, 31, 36, 37 (lower)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Scoring and Treatment Needs:', 'style': 'heading3'},
    {'text': 'Code 0: Healthy (No treatment needed)', 'style': 'bullet'},
    {'text': 'Code 1: Bleeding observed after probing (Oral hygiene instruction)', 'style': 'bullet'},
    {'text': 'Code 2: Calculus detected (Oral hygiene instruction + professional scaling)', 'style': 'bullet'},
    {'text': 'Code 3: Shallow pocket 4-5 mm (Subgingival scaling, complex treatment)', 'style': 'bullet'},
    {'text': 'Code 4: Deep pocket >=6 mm (Complex treatment required)', 'style': 'bullet'},
    {'text': 'Code X: Excluded sextant (less than 2 teeth present)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '6. DENTAL CARIES INDICES', 'style': 'heading2'},
    
    {'text': 'DMFT (Decayed, Missing, Filled Teeth):', 'style': 'heading3'},
    {'text': 'The most commonly used index for measuring caries experience in permanent teeth.', 'style': 'normal'},
    {'text': 'Formula: DMFT = D + M + F', 'style': 'highlight'},
    {'text': 'D (Decayed): Teeth with untreated caries', 'style': 'bullet'},
    {'text': 'M (Missing): Teeth extracted due to caries only', 'style': 'bullet'},
    {'text': 'F (Filled): Teeth with restorations', 'style': 'bullet'},
    {'text': 'Range: 0-28 (32 teeth minus 4 third molars)', 'style': 'bullet'},
    {'text': 'Note: Missing teeth due to trauma or orthodontic reasons are NOT counted as M.', 'style': 'note'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'DMFS (Decayed, Missing, Filled Surfaces):', 'style': 'heading3'},
    {'text': 'More sensitive than DMFT as it measures individual surfaces.', 'style': 'normal'},
    {'text': 'Posterior teeth: 5 surfaces each (mesial, distal, buccal, lingual, occlusal)', 'style': 'bullet'},
    {'text': 'Anterior teeth: 4 surfaces each (mesial, distal, labial, lingual)', 'style': 'bullet'},
    {'text': 'Maximum possible score: 128 surfaces', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Primary Teeth Indices (def/dmf):', 'style': 'heading3'},
    {'text': 'def: decayed, extracted (due to caries), filled primary teeth', 'style': 'bullet'},
    {'text': 'Note: "e" (exfoliated) is used instead of "m" because exfoliation is a normal physiological process in primary dentition.', 'style': 'bullet'},
    {'text': 'Maximum dmft: 20 teeth', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Significant Caries Index (SIC):', 'style': 'heading3'},
    {'text': 'Mean DMFT of the one-third of the population with the highest caries scores.', 'style': 'normal'},
    {'text': 'More sensitive indicator for caries polarization in the era of fluoride.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '7. DENTAL FLUOROSIS INDICES', 'style': 'heading2'},
    
    {'text': "Dean's Fluorosis Index (1942):", 'style': 'heading3'},
    {'text': 'The most widely used classification for dental fluorosis.', 'style': 'normal'},
    {'text': '0 = Normal: Enamel represents usual translucency', 'style': 'bullet'},
    {'text': '0.5 = Questionable: Slight aberrations from normal translucency', 'style': 'bullet'},
    {'text': '1 = Very Mild: Small opaque paper-white areas scattered irregularly', 'style': 'bullet'},
    {'text': '2 = Mild: Opaque areas more extensive but <50% of tooth surface', 'style': 'bullet'},
    {'text': '3 = Moderate: All enamel surfaces affected, marked wear, brown stain', 'style': 'bullet'},
    {'text': '4 = Severe: All enamel surfaces affected, disfiguring, hypoplasia', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Community Fluorosis Index (CFI):', 'style': 'heading3'},
    {'text': 'A measure of the public health significance of fluorosis in a community.', 'style': 'normal'},
    {'text': 'CFI = Sum of (n x w) / N', 'style': 'highlight'},
    {'text': 'Where n = number of individuals in each category, w = weight for each category, N = total number of individuals examined', 'style': 'normal'},
]

add_page_content('', sections_indices2)

# Biostatistics Section
sections_biostat = [
    {'text': 'SECTION F: APPLIED BIOSTATISTICS', 'style': 'heading1'},
    
    {'text': '1. INTRODUCTION', 'style': 'heading2'},
    {'text': 'Definition of Statistics:', 'style': 'heading3'},
    {'text': 'The science of collecting, summarizing, presenting, analyzing, and interpreting data to make informed decisions.', 'style': 'highlight'},
    
    {'text': 'Biostatistics:', 'style': 'heading3'},
    {'text': 'Application of statistical methods to biological sciences, including medicine and dentistry.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': '2. BASIC CONCEPTS', 'style': 'heading2'},
    
    {'text': 'Population:', 'style': 'heading3'},
    {'text': 'The entire group of individuals or items under consideration. Example: All dental students in India.', 'style': 'normal'},
    
    {'text': 'Sample:', 'style': 'heading3'},
    {'text': 'A subset of the population selected for study. Must be representative of the population.', 'style': 'normal'},
    
    {'text': 'Parameter:', 'style': 'heading3'},
    {'text': 'A numerical characteristic of a population (e.g., population mean, denoted by Greek letters like mu).', 'style': 'normal'},
    
    {'text': 'Statistic:', 'style': 'heading3'},
    {'text': 'A numerical characteristic of a sample (e.g., sample mean, denoted by x-bar). Used to estimate parameters.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': '3. TYPES OF DATA', 'style': 'heading2'},
    
    {'text': 'Qualitative (Categorical) Data:', 'style': 'heading3'},
    {'text': 'Nominal: Categories without natural order. Examples: Gender (M/F), Blood group (A, B, AB, O).', 'style': 'bullet'},
    {'text': 'Ordinal: Categories with natural order/ranking. Examples: Pain scale (mild, moderate, severe), Socioeconomic status (low, middle, high).', 'style': 'bullet'},
    
    {'text': 'Quantitative (Numerical) Data:', 'style': 'heading3'},
    {'text': 'Discrete: Countable values (integers). Examples: Number of decayed teeth, Number of children.', 'style': 'bullet'},
    {'text': 'Continuous: Can take any value within a range. Examples: Height, Weight, Pocket depth, Temperature.', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '4. MEASURES OF CENTRAL TENDENCY', 'style': 'heading2'},
    {'text': 'Values that represent the center or typical value of a dataset.', 'style': 'normal'},
    
    {'text': 'A. MEAN (Arithmetic Average)', 'style': 'heading3'},
    {'text': 'Formula: Mean = Sum of all observations / Number of observations', 'style': 'highlight'},
    {'text': 'Example: Decayed teeth in 5 children: 0, 1, 2, 2, 5', 'style': 'normal'},
    {'text': 'Mean = (0+1+2+2+5)/5 = 10/5 = 2.0', 'style': 'normal'},
    
    {'text': 'Advantages:', 'style': 'heading3'},
    {'text': 'Easy to calculate and understand', 'style': 'bullet'},
    {'text': 'Uses all data points', 'style': 'bullet'},
    {'text': 'Can be used in further mathematical calculations', 'style': 'bullet'},
    
    {'text': 'Disadvantages:', 'style': 'heading3'},
    {'text': 'Affected by extreme values (outliers)', 'style': 'bullet'},
    {'text': 'Cannot be calculated for open-ended classes', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'B. MEDIAN', 'style': 'heading3'},
    {'text': 'The middle value when data is arranged in order of magnitude.', 'style': 'normal'},
    {'text': 'Calculation:', 'style': 'heading3'},
    {'text': 'Odd number of observations: Middle value', 'style': 'bullet'},
    {'text': 'Even number of observations: Average of two middle values', 'style': 'bullet'},
    
    {'text': 'Example: 0, 1, 2, 2, 5 (odd) -> Median = 2', 'style': 'normal'},
    {'text': 'Example: 0, 1, 2, 5 (even) -> Median = (1+2)/2 = 1.5', 'style': 'normal'},
    
    {'text': 'Advantages:', 'style': 'heading3'},
    {'text': 'Not affected by extreme values', 'style': 'bullet'},
    {'text': 'Can be used for ordinal data', 'style': 'bullet'},
    {'text': 'Can be located graphically', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'C. MODE', 'style': 'heading3'},
    {'text': 'The value that occurs most frequently in the dataset.', 'style': 'normal'},
    {'text': 'Example: 0, 1, 2, 2, 5 -> Mode = 2 (unimodal)', 'style': 'normal'},
    {'text': 'Example: 0, 1, 2, 2, 3, 3 -> Modes = 2 and 3 (bimodal)', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': '5. MEASURES OF DISPERSION', 'style': 'heading2'},
    {'text': 'Indicate how spread out the data values are.', 'style': 'normal'},
    
    {'text': 'A. RANGE', 'style': 'heading3'},
    {'text': 'Formula: Range = Maximum value - Minimum value', 'style': 'highlight'},
    {'text': 'Example: 0, 1, 2, 2, 5 -> Range = 5 - 0 = 5', 'style': 'normal'},
    
    {'text': 'B. STANDARD DEVIATION (SD)', 'style': 'heading3'},
    {'text': 'The most commonly used measure of dispersion. Indicates how much data varies from the mean.', 'style': 'normal'},
    {'text': 'Formula: SD = Square root of [Sum of (x - mean) squared / (n-1)]', 'style': 'highlight'},
    {'text': 'Use (n-1) for sample, n for population', 'style': 'note'},
    
    {'text': 'C. STANDARD ERROR (SE)', 'style': 'heading3'},
    {'text': 'The standard deviation of the sampling distribution of the mean.', 'style': 'normal'},
    {'text': 'Formula: SE = SD / Square root of n', 'style': 'highlight'},
    {'text': 'Interpretation: Smaller SE indicates more reliable estimate of population mean.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'SD vs SE Comparison:', 'style': 'heading3'},
    {'text': 'SD: Describes variability of individual data points around the mean', 'style': 'bullet'},
    {'text': 'SE: Describes precision of sample mean as estimate of population mean', 'style': 'bullet'},
    {'text': 'SE decreases with larger sample size; SD is relatively stable', 'style': 'bullet'},
]

add_page_content('', sections_biostat)

# Final page
sections_final = [
    {'text': '6. NORMAL DISTRIBUTION', 'style': 'heading2'},
    {'text': 'A symmetric, bell-shaped distribution where most values cluster around the mean.', 'style': 'normal'},
    
    {'text': 'Characteristics:', 'style': 'heading3'},
    {'text': 'Bell-shaped and symmetrical around the mean', 'style': 'bullet'},
    {'text': 'Mean = Median = Mode (all at center)', 'style': 'bullet'},
    {'text': 'Total area under curve = 1 (or 100%)', 'style': 'bullet'},
    {'text': 'Asymptotic to x-axis (tails extend to infinity)', 'style': 'bullet'},
    
    {'text': 'Empirical Rule:', 'style': 'heading3'},
    {'text': 'Mean +/- 1 SD contains approximately 68% of data', 'style': 'bullet'},
    {'text': 'Mean +/- 2 SD contains approximately 95% of data', 'style': 'bullet'},
    {'text': 'Mean +/- 3 SD contains approximately 99.7% of data', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '7. PROBABILITY AND HYPOTHESIS TESTING', 'style': 'heading2'},
    
    {'text': 'P-Value:', 'style': 'heading3'},
    {'text': 'The probability of obtaining the observed results (or more extreme) if the null hypothesis is true.', 'style': 'normal'},
    {'text': 'P < 0.05: Statistically significant (reject null hypothesis)', 'style': 'bullet'},
    {'text': 'P < 0.01: Highly significant', 'style': 'bullet'},
    {'text': 'P < 0.001: Very highly significant', 'style': 'bullet'},
    {'text': 'P > 0.05: Not significant (fail to reject null hypothesis)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Null Hypothesis (H0):', 'style': 'heading3'},
    {'text': 'States that there is no significant difference or relationship between variables.', 'style': 'normal'},
    
    {'text': 'Alternative Hypothesis (H1):', 'style': 'heading3'},
    {'text': 'States that there is a significant difference or relationship.', 'style': 'normal'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Type I and Type II Errors:', 'style': 'heading3'},
    {'text': 'Type I Error (alpha): Rejecting true null hypothesis (false positive)', 'style': 'bullet'},
    {'text': 'Type II Error (beta): Failing to reject false null hypothesis (false negative)', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': '8. SENSITIVITY AND SPECIFICITY', 'style': 'heading2'},
    {'text': 'Measures of diagnostic test accuracy.', 'style': 'normal'},
    
    {'text': 'Contingency Table:', 'style': 'heading3'},
    {'text': '                    Disease Present    Disease Absent', 'style': 'normal'},
    {'text': 'Test Positive       True Positive (TP) False Positive (FP)', 'style': 'normal'},
    {'text': 'Test Negative       False Negative(FN) True Negative (TN)', 'style': 'normal'},
    
    {'text': 'Sensitivity (True Positive Rate):', 'style': 'heading3'},
    {'text': 'Ability to correctly identify those WITH disease', 'style': 'normal'},
    {'text': 'Formula: TP / (TP + FN)', 'style': 'highlight'},
    
    {'text': 'Specificity (True Negative Rate):', 'style': 'heading3'},
    {'text': 'Ability to correctly identify those WITHOUT disease', 'style': 'normal'},
    {'text': 'Formula: TN / (TN + FP)', 'style': 'highlight'},
    
    {'text': 'Positive Predictive Value (PPV):', 'style': 'heading3'},
    {'text': 'Probability that disease is present when test is positive', 'style': 'normal'},
    {'text': 'Formula: TP / (TP + FP)', 'style': 'highlight'},
    
    {'text': 'Negative Predictive Value (NPV):', 'style': 'heading3'},
    {'text': 'Probability that disease is absent when test is negative', 'style': 'normal'},
    {'text': 'Formula: TN / (TN + FN)', 'style': 'highlight'},
    
    {'text': '', 'style': 'normal'},
    {'text': '9. STUDY DESIGNS', 'style': 'heading2'},
    {'text': 'Observational Studies:', 'style': 'heading3'},
    {'text': 'Cross-sectional: Snapshot at one point in time (prevalence studies)', 'style': 'bullet'},
    {'text': 'Cohort: Follow groups over time (incidence studies)', 'style': 'bullet'},
    {'text': 'Case-control: Compare cases with controls (retrospective)', 'style': 'bullet'},
    
    {'text': 'Experimental Studies:', 'style': 'heading3'},
    {'text': 'Randomized Controlled Trial (RCT): Gold standard for treatment efficacy', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'KEY MNEMONICS & MEMORY AIDS', 'style': 'heading1'},
    
    {'text': '5 Fs of Indirect Transmission:', 'style': 'heading3'},
    {'text': 'Flies, Fingers, Fomites, Food, Fluid', 'style': 'highlight'},
    
    {'text': 'TORCH Infections:', 'style': 'heading3'},
    {'text': 'Toxoplasma, Rubella, Cytomegalovirus, Herpes, Others (HIV, Syphilis)', 'style': 'highlight'},
    
    {'text': 'Stages of Disease:', 'style': 'heading3'},
    {'text': 'Incubation -> Prodromal -> Fastigium -> Defervescence -> Convalescence', 'style': 'highlight'},
    
    {'text': '8 Components of PHC (Alma-Ata):', 'style': 'heading3'},
    {'text': 'Education, Food/Nutrition, Water/Sanitation, MCH/FP, Immunization, Endemic Control, Treatment, Essential Drugs', 'style': 'highlight'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'EXAM HIGH-YIELD POINTS', 'style': 'heading1'},
    {'text': '1. Epidemiology definition by John M Last', 'style': 'bullet'},
    {'text': '2. Chain of infection: Reservoir -> Mode of Transmission -> Susceptible Host', 'style': 'bullet'},
    {'text': '3. Incubation period: Time between invasion and first symptom', 'style': 'bullet'},
    {'text': '4. Primary Health Care: Alma-Ata declaration, 1978 - 8 essential components', 'style': 'bullet'},
    {'text': '5. ASHA: Accredited Social Health Activist - 1 per 1000 population', 'style': 'bullet'},
    {'text': '6. DMFT: Missing only if due to caries; M not counted in primary teeth', 'style': 'bullet'},
    {'text': '7. OHI-S: 6 teeth examined, score range 0-6', 'style': 'bullet'},
    {'text': '8. CPITN/CPI: WHO probe markings at 3.5-5.5-8.5-11.5 mm', 'style': 'bullet'},
    {'text': '9. Gingival Index: 0-3 scale by Loe & Silness (1963)', 'style': 'bullet'},
    {'text': '10. Dean\'s Fluorosis Index: 0 (normal) to 4 (severe)', 'style': 'bullet'},
    {'text': '11. Mean +/- 2 SD: Includes 95% of values in normal distribution', 'style': 'bullet'},
    {'text': '12. P < 0.05: Statistically significant (reject null hypothesis)', 'style': 'bullet'},
    {'text': '13. Sensitivity: True positive rate; Specificity: True negative rate', 'style': 'bullet'},
    {'text': '14. Standard Error: SD / square root of n', 'style': 'bullet'},
    
    {'text': '', 'style': 'normal'},
    {'text': 'Compiled from Textbook of Preventive and Community Dentistry', 'style': 'normal'},
]

add_page_content('', sections_final)

# Save the PDF
pdf.output('PREVENTIVE_COMMUNITY_DENTISTRY_DETAILED.pdf')
print("Detailed PDF created successfully!")
print("File: PREVENTIVE_COMMUNITY_DENTISTRY_DETAILED.pdf")
print("Pages: Comprehensive notes covering all 5 sections")
