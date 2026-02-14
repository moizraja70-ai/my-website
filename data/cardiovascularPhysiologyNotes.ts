export const CARDIOVASCULAR_PHYSIOLOGY_NOTES = {
  title: "7. Cardiovascular Physiology",
  content: String.raw`# Cardiovascular Physiology

## A) SCOPE
The Engine of Life. We cover the Heart as a pump (Cycle, Output, Valves), the Electrical conduction system (ECG, Arrhythmias, Electrolytes), Hemodynamics (Blood Pressure, Resistance), and the critical balance of failure (Compensated vs Decompensated) including the RAAS system.

---

## B) ONE-PAGE MASTER MAP (High Yield)

- **The Goal:** Maintain MAP (Mean Arterial Pressure) to perfuse organs.
- **The Equation:** $MAP = CO \times TPR$.
  - **CO (Cardiac Output):** Volume pumped per minute ($HR \times SV$).
  - **TPR (Total Peripheral Resistance):** Squeeze of the Arterioles (Site of highest resistance).
- **The Pump (Heart):**
  - **Electrical:** SA Node (Pacemaker) → AV Node (Delay) → Bundle → Purkinje (Fastest).
  - **Mechanical:** Systole (Squeeze) vs Diastole (Fill).
  - **Muscle:** Syncytium (Gap junctions), Aerobic (High O₂ extraction ~70%).
- **The Control:**
  - **Fast:** Baroreceptors (Carotid Sinus/Aortic Arch).
  - **Slow:** RAAS (Renin-Angiotensin-Aldosterone).
- **Vascular Hemodynamics:**
  - **Arteries:** High Pressure, Stress Volume.
  - **Veins:** High Capacitance (Compliance), Volume Reservoir (Unstressed Volume).
- **Pathology:**
  - **Failure:** Left (Pulmonary Edema) vs Right (Systemic Edema).
  - **Endocarditis:** S. viridans (Dental) vs S. aureus (IVDA).
  - **Prophylaxis:** Only for High Risk (Prosthetic valves, Previous IE).

---

## C) CORE NOTES

### 1. The Electrical System (The Wiring)

#### 1) Pacemaker Potentials (SA Node)
- **Why does it beat?** Unstable Resting Potential via Funny Current ($I_f$).
- **Overdrive Suppression:** SA Node is fastest (~100/min). It suppresses latent pacemakers (AV node, Purkinje). If SA fails, others take over (slower).
- **Phases:**
  - **Phase 4:** Slow spontaneous depolarization (Na⁺ via $I_f$).
  - **Phase 0 (Upstroke):** Driven by Calcium (Ca²⁺), not Sodium. Slower than nerves.
  - **Phase 3:** K⁺ efflux (Repolarization).

#### 2) Ventricular Action Potential (The Muscle)
- **Phase 0:** Fast Na⁺ influx (Rapid spike).
- **Phase 2 (Plateau):** Calcium Influx (L-type channels) balances K⁺ efflux.
  - **Significance:** Long plateau (~250ms) prevents Tetanus. Heart must relax to fill!
  - **EC Coupling:** This extracellular Ca²⁺ triggers SR Ca²⁺ release (CICR).

#### 3) Conduction Velocity
- **Fastest:** Purkinje Fibers (4 m/s). Ensures ventricles contract simultaneously.
- **Slowest:** AV Node (0.05 m/s). Creates the PR Interval delay. Allows Atria to fill Ventricles.

#### 4) ECG Basics & Electrolytes
- **P Wave:** Atrial Depolarization.
- **QRS Complex:** Ventricular Depolarization.
- **T Wave:** Ventricular Repolarization.
- **Hyperkalemia:** Peaked T waves → Wide QRS → Sine Wave → Asystole.
- **Hypokalemia:** U waves, flattened T waves.
- **Heart Blocks:**
  - **1st Degree:** Prolonged PR (>0.20s). Fixed.
  - **2nd Degree (Mobitz I/Wenckebach):** PR lengthens until drop.
  - **2nd Degree (Mobitz II):** Random drops (Dangerous).
  - **3rd Degree:** P and QRS dissociated (Complete block).

### 2. The Mechanical Pump (Cardiac Cycle)

#### Key Phases (Wiggers Diagram - Correlations)

| Phase | Ventricular Pressure | Aortic Pressure | Volume | Valves | Sound | ECG |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Isovolumetric Contraction | Rising Rapidly (LVP > LAP) | LVP < Aortic | Constant (EDV) | Mitral Closes (All Closed) | S1 ("Lub") | QRS |
| 2. Systolic Ejection | Peak (LVP > Aortic) | Rising | Decreases rapidly | Aortic Opens | Silent | ST Segment |
| 3. Isovolumetric Relaxation | Falling Rapidly (LVP < Aortic) | LVP > LAP | Constant (ESV) | Aortic Closes (All Closed) | S2 ("Dub") | T Wave End |
| 4. Rapid Filling | Low (LVP < LAP) | Falling slowly | Increases rapidly | Mitral Opens | S3 (if volume overload) | TP Interval |
| 5. Atrial Systole | Slight rise | Falling | Final boost ("Kick") | Mitral Open | S4 (if stiff ventricle) | P Wave |

#### Pressure-Volume Loops (The 4 Corners & Sounds)

1. **End Diastole (Start of Isovolumetric Contraction):**
   - Event: Ventricle is Full (EDV). Mitral Valve Closes.
   - Sound: Turbulence of closure causes S1 ("Lub").
   - Pressure: Begins to rise rapidly.

2. **Start of Ejection:**
   - Event: Pressure exceeds Aorta. Aortic Valve Opens.
   - Sound: Usually Silent (Ejection Click if stenotic).
   - Volume: Blood leaves ventricle (Stroke Volume).

3. **End Systole (Start of Isovolumetric Relaxation):**
   - Event: Ventricle is Empty (ESV). Aortic Valve Closes.
   - Sound: Turbulence of closure causes S2 ("Dub").
   - Pressure: Begins to fall rapidly.

4. **Start of Filling:**
   - Event: Pressure drops below Atrium. Mitral Valve Opens.
   - Sound: Silent (Opening Snap if stenotic).
   - S3: Rapid Filling Phase (Volume Overload).
   - S4: Atrial Kick Phase (Stiff Ventricle).

#### Frank-Starling Law
- **Concept:** "More IN = More OUT."
- **Mechanism:** Increased Preload (EDV) stretches fibers → Optimal actin-myosin overlap → Stronger contraction (SV).
- **Dental Relevance:** Syncope in dental chair? Trendelenburg position (legs up) → Increase Venous Return → Increase Preload → Increase MAP.

### 3. Hemodynamics & Blood Pressure

#### Key Formulas
- $MAP = \text{Diastolic} + \frac{1}{3}(\text{Pulse Pressure})$.
- $CO = HR \times SV$.
- $PP = SBP - DBP$. (Determined by Stroke Volume and compliance).

#### Vascular Segments
- **Arteries:** High pressure, thick walls.
- **Arterioles:** Site of Greatest Resistance/Pressure Drop. Regulate TPR. Alpha-1 constriction.
- **Capillaries:** Exchange (Slowest velocity, largest cross-sectional area).
- **Veins:** Capacitance Vessels. Hold 60-70% of blood volume. Floppy walls.

#### Short-Term Control: Baroreceptors (Neural - High Yield Physiology)

- **Definition:** Stretch receptors (Mechanoreceptors) in vessel walls that buffer beat-to-beat pressure. They prevent wild swings (Syncope on standing).
- **Operating Range:** 60 - 180 mmHg. (Max sensitivity near 100 mmHg).
- **Afferent Pathways (The Inputs):**
  1. **Carotid Sinus:** Detects High & Low Pressure. (More sensitive).
     - Location: Internal Carotid Artery (High in neck).
     - Nerve: Hering's Nerve (Branch of CN IX Glosso).
     - Target: NTS (Nucleus Tractus Solitarius in Medulla).
  2. **Aortic Arch:** Detects High Pressure only.
     - Location: Aortic Arch.
     - Nerve: CN X (Vagus).
     - Target: NTS.

- **Central Integration (The Medulla Wiring):**
  - **NTS Activation (High BP → High Stretch → High Firing):**
    1. **Excites Parasympathetic:** Activates Nucleus Ambiguus → Vagus Nerve → Slow SA Node (Bradycardia).
    2. **Inhibits Sympathetic:** Activates CVLM (Caudal Ventrolateral Medulla) → Inhibits RVLM (Rostral Ventrolateral Medulla - The Sympathetic Driver) → Vasodilation (Decrease TPR).

- **Response to Low Pressure (e.g., Hemorrhage/Standing):**
  - **Unloading:** Decrease Stretch → Decrease Firing to NTS.
  - **Result:** RVLM is Disinhibited (Released from brake) → Massive Sympathetic Surge.
    - Heart: Increase HR, Increase Contractility.
    - Vessels: Venoconstriction (Increase Preload), Arteriolar Constriction (Increase TPR).
    - Adrenal: Epinephrine dump.

- **Clinical:**
  - **Carotid Massage:** Artificial pressure → Triggers "High BP" reflex → Slows HR (Breaks SVT).
  - **Adaptation:** In Chronic Hypertension, baroreceptors "reset" to a higher setpoint within 1-2 days. Not useful for long-term control.

- **Cushing Reaction (CNS Ischemic Response - The "Last Ditch" Reflex):**
  - **Trigger:** Increased Intracranial Pressure (ICP) compresses brain arterioles → Cerebral Ischemia (High PCO₂ / High H⁺).
  - **Response:** Massive Sympathetic outflow to force blood into the brain.
  - **The Triad:**
    1. **Hypertension:** To overcome ICP.
    2. **Bradycardia:** Reflex response to the high BP (via Baroreceptors).
    3. **Irregular Respiration:** Brainstem compression.
  - **Significance:** Opposite of Shock (Hypotension + Tachycardia). Indicates imminent herniation.

- **Note on Cushing Syndrome (Endocrine):**
  - Cause: Excess Cortisol (Pituitary Adenoma or Steroid use).
  - Cardiovascular Effect: Hypertension.
  - Mechanism: Upregulation of Alpha-1 receptors on arterioles + Mineralocorticoid effect (retains Na⁺).

#### Long-Term Control: RAAS (Hormonal)
- **Trigger:** Low BP, Low Na⁺, or Sympathetic.
- **Pathway:**
  1. Renin (Kidney JG cells) converts Angiotensinogen → Angiotensin I.
  2. ACE (Lungs) converts Ang I → Angiotensin II.
  3. **Ang II Actions:**
     - Potent Vasoconstriction (Increases TPR).
     - Stimulates Aldosterone (Adrenal Cortex) → Save Na⁺, Water follows → Increase Volume.
     - Stimulates ADH (Posterior Pituitary) → Save Water.
- **Dental Relevance:** ACE Inhibitors (Lisinopril) cause Dry Cough and Angioedema.

### 4. Heart Failure & Pathology

#### Compensated vs Decompensated
- **Compensated:** Body maintains MAP despite failing pump.
  - Sympathetic: Increase HR, Contractility.
  - RAAS: Retain fluid to increase Preload (Starling mechanism).
- **Decompensated:** Mechanisms fail. Edema ensues.
  - **Left Failure:** Backs up into Lungs → Pulmonary Edema (Dyspnea, Orthopnea).
    - Cellular: Heart Failure Cells (Hemosiderin-laden Macrophages/Siderophages) in lungs due to RBC leakage.
  - **Right Failure:** Backs up into Body → JVD, Peripheral Edema, Nutmeg Liver.

#### Coronary Circulation
- **O₂ Extraction:** Heart extracts nearly MAX O₂ at rest (70-75%).
- **To get more O₂:** Must increase Coronary BLOOD FLOW (Vasodilation via Adenosine). Can't extract more.
- **Contraction Band Necrosis:** Seen in MI after Reperfusion. Calcium overload forces hypercontraction → death on restoration of flow.

#### Infective Endocarditis (IE)
- **Acute:** Staph aureus. IV Drug Users. Tricuspid Valve. High fever.
- **Subacute:** Strep viridans (S. sanguinis/mutans). DENTAL origin. Mitral Valve (damaged). Low fever.
- **Mechanism:** Bacteria bind to fibrin-platelet vegetations on damaged valves.
- **Rheumatic Fever:** Strep pyogenes (Group A Strep). Molecular mimicry (M protein vs Cardiac myosin). Aschoff bodies.

### 5. DENTAL MANAGEMENT (AHA Guidelines)

#### Antibiotic Prophylaxis
- **RATIONALE:** Bacteremia from dental scaling is common, but IE is rare. Risks of antibiotics (Anaphylaxis, Resistance) often outweigh benefits.
- **Who needs it? (High Risk ONLY)**
  1. Prosthetic Cardiac Valves.
  2. Previous Infective Endocarditis.
  3. Congenital Heart Disease (CHD):
     - Unrepaired Cyanotic CHD.
     - Repaired CHD with prosthetic material (first 6 months).
     - Repaired CHD with residual defects.
  4. Cardiac Transplant with valvulopathy.
- **Who DOES NOT need it?**
  - Mitral Valve Prolapse (MVP), Rheumatic Heart Disease, Bicuspid Aortic Valve, Calcified Aortic Stenosis.
- **Joint Replacements:**
  - Generally NOT recommended by ADA/AAOS unless specific comorbidities (immunocompromised, history of joint infection) and orthopedic surgeon request.
- **The Regimen (Single Dose 30-60 min before procedure):**
  - **Standard:** Amoxicillin 2g (Adults), 50mg/kg (Kids).
  - **Penicillin Allergy:**
    - Azithromycin/Clarithromycin 500mg.
    - Doxycycline 100mg.
    - Cephalexin 2g (if not anaphylactic to Penicillin).
  - **Note:** Clindamycin is no longer first-line (C. diff risk).

#### Hypertension in the Chair
- **Stage 1 (130-139/80-89):** Treat.
- **Stage 2 (>140/90):** Monitor.
- **Crisis (>180/120):** Defer elective treatment. Refer immediately.
- **Anesthetics:** Limit Epinephrine (Max 0.04mg aka 2 carpules of 1:100k) in cardiac patients to avoid arrhythmias. Use aspiration!

### 6. INTEGRATIVE PHYSIOLOGY: EXERCISE

#### 1) The Anticipatory Phase
- **Central Command:** The Motor Cortex signals the Medulla before muscle movement starts.
- **Result:** Heart Rate and Cardiac Output increase instantly at onset. Vagal withdrawal happens first.

#### 2) Heart Rate Control
- **Initial Rise (Low Intensity):** Withdrawal of Vagal Tone (Parasympathetic OFF). HR goes up to ~100 bpm.
- **Strenuous Exercise:** Sympathetic Activation (Beta-1 adrenergic). HR rises >100 bpm.
- **Max HR Formula:** $220 - Age$.
- **Mechanism:** Increased slope of Phase 4 depolarization in SA Node (More funny current $I_f$).

#### 3) Venous Return (The Critical Factor)
- Cardiac Output cannot increase unless Venous Return increases (Starling Law). How?
  1. **Muscle Pump:** Contracting skeletal muscles squeeze veins, forcing blood to heart (One-way valves prevent backflow).
  2. **Respiratory Pump:** Deep inspiration decreases intrathoracic pressure, sucking abdominal blood into the thorax.
  3. **Venoconstriction:** Sympathetic Alpha-1 squeeze reduces venous capacitance (unstressed volume → stressed volume).

#### 4) Hemodynamics Summary
- **Heart Rate:** Increases Linearly up to Maximum (220 - Age). Unlike SV, it does not plateau until exhaustion.
- **Cardiac Output:** Massive Increase ($\uparrow HR \times \uparrow SV$). Can go from 5L/min → 25L/min.
- **Stroke Volume:** Increases linearly until moderate exercise (~50% Max), then PLATEAUS.
  - Why? At Strenuous Exercise (High HR), Diastolic Filling Time becomes so short that the heart cannot fill any further, even with increased Venous Return.
- **TPR (Total Resistance):** Net Decrease.
  - Why? Massive Vasodilation in skeletal muscle (Adenosine, K⁺, Lactate, CO₂) OVERRIDES sympathetic constriction elsewhere (Gut/Kidneys).
- **Blood Pressure:**
  - Systolic: Increases (due to Stroke Volume).
  - Diastolic: Stays same or decreases (due to dropped TPR).
  - Pulse Pressure: WIDENS enormously.

---

## D) REVISION: RAPID FIRE

- **Universal Donor:** O- (No antigens). **Recipient:** AB+ (No antibodies).
- **Frank-Starling:** Increase Preload → Increase Stroke Volume.
- **Pulse Pressure:** SBP - DBP. Widened in Aortic Regurgitation (bounding pulse).
- **Mean Electrical Axis:** Normal is -30 to +90.
- **Phase 0 (Ventricle):** Na⁺ Influx. **Phase 0 (SA Node):** Ca²⁺ Influx.
- **Plateau Phase:** Ca²⁺ Influx (L-type). Prevents Tetanus.
- **AV Node:** Slowest conduction. PR interval.
- **Heart Sounds:** S1 (AV close), S2 (Semilunar close). S3 (Filling), S4 (Stiff).
- **Baroreceptors:** Carotid Sinus (IX), Aortic Arch (X).
- **Edema:** Hydrostatic pressure drives fluid out (HF). Oncotic pressure pulls it in (Albumin).
- **IE Prophylaxis:** Amox 2g. Only for Prosthetic valves, Previous IE, certain CHD, Transplant valves.
`,
  keyPoints: [
    "MAP = CO × TPR; CO = HR × SV",
    "SA Node: Phase 4 spontaneous depolarization (If); Phase 0 = Ca²⁺ (not Na⁺)",
    "Ventricular AP: Phase 2 plateau (Ca²⁺) prevents tetanus",
    "Purkinje = fastest conduction (4 m/s); AV Node = slowest (0.05 m/s)",
    "Hyperkalemia: Peaked T → Wide QRS → Sine Wave → Asystole",
    "S1 = Mitral/Tricuspid close; S2 = Aortic/Pulmonic close; S3 = volume overload; S4 = stiff ventricle",
    "Frank-Starling: ↑ Preload → ↑ Stroke Volume",
    "Baroreceptors: Carotid (CN IX) + Aortic (CN X) → NTS → adjust HR/TPR",
    "RAAS: Renin → Ang I → (ACE) → Ang II → Vasoconstriction + Aldosterone + ADH",
    "Left HF = Pulmonary edema; Right HF = JVD/Peripheral edema/Nutmeg liver",
    "IE Prophylaxis: Only high-risk (Prosthetic valves, Previous IE, certain CHD); Amox 2g",
    "Cushing Reaction: ↑ICP → Hypertension + Bradycardia + Irregular respiration",
    "Exercise: Vagal withdrawal first → Sympathetic later; SV plateaus, HR keeps rising",
    "Heart extracts 70-75% O₂ at rest -- must increase flow (not extraction) for more O₂"
  ],
  mcqs: [
    {
      question: "A patient with a history of rheumatic fever and a murmur of mitral regurgitation presents for a tooth extraction. He has no other medical conditions. According to current AHA guidelines, what is the appropriate antibiotic prophylaxis?",
      options: [
        "Amoxicillin 2g orally 1 hour before",
        "Clindamycin 600mg orally 1 hour before",
        "Ampicillin 2g IV 30 mins before",
        "No modification to therapy is recommended"
      ],
      correctAnswer: 3,
      explanation: "Rheumatic heart disease and native valve murmurs no longer require prophylaxis. Only prosthetic valves, previous IE, specific CHD, and transplant valvulopathy do."
    },
    {
      question: "Which phase of the ventricular action potential is primarily responsible for preventing tetanic contraction of cardiac muscle?",
      options: [
        "Phase 0 (Rapid Depolarization)",
        "Phase 1 (Initial Repolarization)",
        "Phase 2 (Plateau)",
        "Phase 3 (Rapid Repolarization)"
      ],
      correctAnswer: 2,
      explanation: "The long refractory period caused by the Calcium influx plateau ensures the heart relaxes and fills before beating again."
    },
    {
      question: "During a dental procedure, a patient faints (syncope). You place them in a supine position with legs elevated. This improves their condition primarily by increasing:",
      options: [
        "Total Peripheral Resistance (TPR)",
        "Heart Rate",
        "Venous Return and Preload",
        "Arterial compliance"
      ],
      correctAnswer: 2,
      explanation: "Gravity helps blood return to the heart. Increase Venous Return → Increase End Diastolic Volume (Preload) → Increase Cardiac Output (Starling Law) → Increase BP to brain."
    },
    {
      question: "A 65-year-old male with untreated hypertension has a blood pressure of 160/100 mmHg. Which vascular segment is the primary site of the increased resistance?",
      options: [
        "Large Arteries (Aorta)",
        "Arterioles",
        "Capillaries",
        "Venules"
      ],
      correctAnswer: 1,
      explanation: "Arterioles are the resistance vessels. Small changes in their radius cause massive changes in resistance (Poiseuille's Law)."
    },
    {
      question: "A nerve block to the Glossopharyngeal nerve (CN IX) would most likely affect baroreceptor signaling from the:",
      options: [
        "Aortic Arch",
        "Carotid Sinus",
        "Atrial stretch receptors",
        "Juxtaglomerular apparatus"
      ],
      correctAnswer: 1,
      explanation: "Carotid Sinus uses CN IX. Aortic Arch uses CN X (Vagus)."
    }
  ]
};
