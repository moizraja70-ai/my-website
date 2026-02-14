export const MUSCLE_PHYSIOLOGY_NOTES = {
  title: "4. Muscle Physiology (Structure & E-C)",
  content: String.raw`# Muscle Physiology (Structure & E-C)

## A) SCOPE
This section covers the ultra-structure of skeletal muscle, the sliding filament theory, and the excitation-contraction coupling mechanism.

---

## B) ONE-PAGE MASTER MAP (Big Picture)

- **Muscle Fiber:** Single muscle cell; multinucleated; runs entire length of muscle.
- **Sarcolemma:** Cell membrane. T-Tubules are invaginations of it.
- **Sarcoplasmic Reticulum (SR):** Stores Ca²⁺; Terminal cisternae flank T-tubules (Triad).
- **Myofibril:** Contractile unit; chain of sarcomeres.
- **Sarcomere:** Functional unit (Z disk to Z disk).
  - **Myosin (Thick Filament):** Head has ATPase activity and Actin binding site.
  - **Actin (Thin Filament):** Double helix of F-actin.
- **Regulatory Proteins:**
  - **Tropomyosin:** Covers myosin-binding sites on actin at rest.
  - **Troponin:** TnC (binds Ca²⁺), TnT (binds Tropomyosin), TnI (Inhibits actin-myosin).
- **Dystrophin:** Anchors actin to sarcolemma/ECM. Missing in Duchenne MD.
- **Neuromuscular Junction (NMJ):** Acetylcholine (ACh) release → Nicotinic Receptor → EPP → AP.
- **E-C Coupling:** AP in T-tubule → DHP receptor (Voltage sensor) → Ryanodine receptor (Ca²⁺ channel) opens → Ca²⁺ efflux from SR → Ca²⁺ binds TnC → Tropomyosin moves → Cross-bridge cycling.
- **Relaxation:** Ca²⁺ pumped back into SR (SERCA pump).
- **Rigor Mortis:** No ATP → Myosin cannot detach from actin → Stiffness.

---

## C) CORE NOTES (THE MAIN BODY)

### 1. Skeletal Muscle Functional Anatomy

#### 1) Key Concept
Muscle contraction relies on the interaction of contractile proteins (Actin/Myosin) regulated by Ca²⁺ via regulatory proteins (Troponin/Tropomyosin). The structural arrangement (Sarcomere) allows force generation.

#### 2) Detailed Structure
1. **Thick Filament (Myosin II):**
   - 2 Heavy chains (Tail + Head).
   - 4 Light chains (Head).
   - Head Function: 1) ATPase activity (hydrolyzes ATP), 2) Binds Actin.
2. **Thin Filament:**
   - **Actin:** G-actin monomers polymerize to F-actin double helix. Each G-actin has a myosin binding site (ADP attached).
   - **Tropomyosin:** Filament that spirals around actin grooves, covering active sites at rest.
   - **Troponin Complex:**
     - **TnT:** Tethers complex to Tropomyosin.
     - **TnI:** Inhibits ATPase; physically blocks binding.
     - **TnC:** Calcium sensor (binds 4 Ca²⁺).
3. **Cytoskeleton:**
   - **Titin:** Huge elastic spring; connects Z-disk to M-line; prevents overstretching; maintains alignment.
   - **Nebulin:** Ruler for actin length.
   - **Dystrophin:** Links actin to transmembrane proteins (Integrins/Dystroglycans) to transfer force to ECM.

#### 5) Key Numbers
- Sarcomere length at rest: 2.0-2.2 µm (Optimal overlap).
- Myosin filaments: ~1500 per myofibril.
- Actin filaments: ~3000 per myofibril.

#### 7) Clinical Correlation
- **Duchenne Muscular Dystrophy (DMD):** X-linked recessive mutation in Dystrophin gene (frameshift/deletion). Dystrophin connects cytoskeleton to ECM. Without it, sarcolemma tears during contraction → Ca²⁺ influx → Necrosis → Muscle weakness (Gowers sign).
- **Becker MD:** Missense mutation (partially functional dystrophin). Milder.

### 2. Excitation-Contraction (E-C) Coupling

#### 1) Key Concept
The process of converting an electrical stimulus (Action Potential) into a mechanical response (Contraction). The key messenger is Calcium.

#### 2) Step-by-step Mechanism
1. **AP Generation:** Motor neuron releases ACh → NMJ → Muscle AP spreads over Sarcolemma.
2. **T-Tubule Invasion:** AP travels down Transverse (T) Tubules deep into cell.
3. **Voltage Sensing:** Depolarization reaches the Dihydropyridine Receptor (DHPR) on the T-tubule membrane (L-type Ca²⁺ channel voltage sensor).
4. **Mechanical Coupling:** The DHPR undergoes a conformational change and mechanically pulls open the Ryanodine Receptor (RyR1) on the SR terminal cisternae.
5. **Ca²⁺ Release:** Massive efflux of Ca²⁺ from SR into sarcoplasm (ICF concentration rises from 10⁻⁷ to 10⁻⁵ M).
6. **Binding:** Ca²⁺ binds to Troponin C (4 Ca²⁺ ions bind).
7. **Disinhibition:** Troponin complex changes shape → Pulls Tropomyosin aside → Exposes myosin-binding sites on Actin.
8. **Power Stroke:** Myosin head (with ADP+Pi) binds Actin → Pi flies off → Head pivots (Power Stroke) → ADP flies off → Rigor State.
9. **Detachment:** New ATP binds Myosin head → Myosin releases Actin.
10. **Re-cocking:** ATPase hydrolyzes ATP → ADP + Pi + Energy → Head cocks back to 90° (high energy state).
11. **Cycling:** Repeats as long as Ca²⁺ and ATP are present.

#### 3) Key Equations (Relaxation)

$$Relaxation\ Rate \propto SERCA\ Activity$$

- **SERCA:** Sarcoplasmic Endoplasmic Reticulum Ca²⁺ ATPase.
- **Function:** Pumps Ca²⁺ back into SR against gradient (Primary Active Transport).
- **Calsequestrin:** Calcium-binding protein inside SR that creates a "sponge" to keep free Ca²⁺ low inside SR (reducing the gradient work for SERCA).

#### 7) Clinical Correlation
- **Malignant Hyperthermia:** Mutation in Ryanodine Receptor (RyR). Inhaled anesthetics (Halothane) or Succinylcholine trigger uncontrolled Ca²⁺ release → Continuous contraction + Hypermetabolism (Heat, CO₂, Acidosis) → Rhabdomyolysis. Treat with **Dantrolene** (Blocks RyR).
- **Rigor Mortis:** Death → No ATP production. SERCA stops (Ca²⁺ leaks out → interaction). ATP needed for detachment is missing. Myosin stays locked to actin. Peaks at 12h.

#### 8) BRS Exam Angle
- **Mechanism Trap:** In Skeletal muscle, the interaction between DHPR and RyR is **Mechanical** (physical link). In Cardiac muscle, it is **Chemical** (Ca-induced Ca release).
- **ATP Role:** ATP is required for **DETACHMENT** (not just power stroke). No ATP = No relaxation.

---

## D) REFLEXES + FEEDBACK LOOPS

- **Muscle Stretch** → Muscle Spindle (Intrafusal fiber) → Type Ia Afferent → Spinal Cord → Alpha Motor Neuron → Contraction (Deep Tendon Reflex).
- **Muscle Tension** → Golgi Tendon Organ (Series) → Type Ib Afferent → Inhibitory Interneuron → Relaxes Muscle (Inverse Stretch Reflex - Protective).

---

## E) "INCREASE VS DECREASE" EFFECTS TABLE

| If this changes... | Then this happens... |
| :--- | :--- |
| ↑ Preload (Stretch) | ↑ Passive Tension; ↑ Active Tension (up to optimal length). |
| ↓ ATP | Myosin cannot detach (Rigor); SERCA fails (High intracellular Ca²⁺). |
| ↑ Cytosolic Ca²⁺ | ↑ Force of contraction (number of cross-bridges cycling). |
| Block ACh Receptors | (Curare) Flaccid Paralysis. |
| Block AChE | (Neostigmine) Spastic Paralysis / Depolarization block. |

---

## F) COMPARISON TABLES

### 1. Thick vs Thin Filaments
| Feature | Thick Filament | Thin Filament |
| :--- | :--- | :--- |
| Protein | Myosin II | Actin, Troponin, Tropomyosin |
| Band | A Band (remains constant) | I Band (shortens) |
| Function | Motor (ATPase) | Track + Regulation |

### 2. Skeletal vs Cardiac E-C Coupling
| Feature | Skeletal Muscle | Cardiac Muscle |
| :--- | :--- | :--- |
| Trigger | Voltage (DHPR mechanical pull) | Ca²⁺ Influx (CICR) |
| Source of Ca | SR (100%) | SR + ECF (Trigger Ca) |
| Role of DHPR | Voltage Sensor | Ca²⁺ Channel |
| RyR Isoform | RyR1 | RyR2 |

---

## G) LAST-DAY RAPID REVISION SHEET

- **A-Band:** Anisotropic (Dark). Contains Myosin (+ overlapping Actin). Length CONSTANT during contraction.
- **I-Band:** Isotropic (Light). Contains only Actin. SHORTENS during contraction.
- **H-Zone:** Center of A-band (Myosin only). SHORTENS during contraction.
- **Z-Disk:** Anchors Actin; Boundary of sarcomere.
- **M-Line:** Center of H-zone; anchors Myosin.
- **Triad:** 1 T-Tubule + 2 Terminal Cisternae. Located at A-I junction (2 per sarcomere in skeletal; 1 at Z-line in cardiac).
- **Calsequestrin:** Low affinity, high capacity Ca²⁺ buffer in SR.
- **Tetanus:** Sustained contraction due to high frequency stimulation (Ca²⁺ never returns to baseline).
- **Treppe:** Step-wise increase in force with repeated stimulation (Ca²⁺ accumulation / Warming up).
- **Motor Unit:** One Alpha Motor Neuron + All muscle fibers it innervates.
- **Recruitment:** Size principle (Small/Slow units recruited first → Large/Fast units later).
- **Isotonic:** Constant tension, length changes (Lifting load).
- **Isometric:** Constant length, tension changes (Pushing wall).
- **Botulinum Toxin:** Cleaves SNAREs, prevents ACh release → Flaccid paralysis.
- **Curare:** Competes with ACh at Nicotinic receptors → Flaccid paralysis.
- **Succinylcholine:** Depolarizing blocker (Phase 1: Twitch; Phase 2: Block).
- **Myasthenia Gravis:** Antibodies vs AChR. Fatigable weakness.
- **Lambert-Eaton:** Antibodies vs Presynaptic Ca²⁺ channels. Weakness improves with use.
`,
  keyPoints: [
    "Sarcomere = Z-disk to Z-disk; functional unit of muscle",
    "A-band (dark, myosin) stays CONSTANT; I-band and H-zone SHORTEN",
    "Troponin: TnC (Ca²⁺), TnT (Tropomyosin), TnI (Inhibitor)",
    "E-C Coupling: AP → T-tubule → DHPR → RyR1 → Ca²⁺ release → TnC → cross-bridge",
    "Skeletal: DHPR-RyR is MECHANICAL; Cardiac: CHEMICAL (CICR)",
    "ATP needed for DETACHMENT, not just power stroke -- no ATP = rigor",
    "SERCA pumps Ca²⁺ back into SR for relaxation",
    "Dystrophin links actin to ECM -- absent in Duchenne MD (X-linked)",
    "Malignant Hyperthermia: RyR mutation → Dantrolene treatment",
    "Titin = elastic spring (prevents overstretch); Nebulin = actin ruler",
    "Motor Unit = 1 alpha motor neuron + all its fibers; Size Principle for recruitment",
    "Myasthenia Gravis = anti-AChR; Lambert-Eaton = anti-presynaptic Ca²⁺ channels"
  ],
  mcqs: [
    {
      question: "The detailed mechanism of contraction involves which step immediately following the binding of Calcium to Troponin C?",
      options: [
        "Power stroke of myosin head",
        "Hydrolysis of ATP",
        "Movement of Tropomyosin to expose binding sites",
        "Binding of Myosin to Actin"
      ],
      correctAnswer: 2,
      explanation: "Ca-TnC induces the conformational change in Tropomyosin, which uncovers the specific myosin-binding sites on actin."
    },
    {
      question: "Which event is responsible for the detachment of the myosin head from the actin filament?",
      options: [
        "Hydrolysis of ATP to ADP + Pi",
        "Binding of a new ATP molecule",
        "Release of ADP from the myosin head",
        "Re-uptake of Calcium into the SR"
      ],
      correctAnswer: 1,
      explanation: "The 'disconnect' requires ATP binding. Hydrolysis (A) recocks the head. Release of ADP (C) happens at end of power stroke."
    },
    {
      question: "In Duchenne Muscular Dystrophy, the primary defect is located in a protein that:",
      options: [
        "Regulates Calcium release (RyR)",
        "Anchors the cytoskeleton to the extracellular matrix",
        "Hydrolyzes ATP (Myosin)",
        "Covers the active sites on actin"
      ],
      correctAnswer: 1,
      explanation: "Dystrophin links actin → membrane → laminin (ECM). Loss = fragility."
    },
    {
      question: "A skeletal muscle fiber is stretched beyond its optimal length involving no overlap of filaments. Upon stimulation, tension generated will be:",
      options: [
        "Maximum",
        "Zero active tension",
        "Half of maximum",
        "Dependent on ATP only"
      ],
      correctAnswer: 1,
      explanation: "Tension requires cross-bridges. No overlap = No cross-bridges = No active tension."
    },
    {
      question: "Malignant Hyperthermia is caused by a defect in:",
      options: [
        "Na⁺-K⁺ ATPase",
        "Voltage-gated Na⁺ channel",
        "Ryanodine Receptor (Calcium release channel)",
        "Acetylcholine receptor"
      ],
      correctAnswer: 2,
      explanation: "Uncontrolled Ca release leads to hyper-metabolic state."
    }
  ]
};
