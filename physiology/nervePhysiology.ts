export const NERVE_PHYSIOLOGY_NOTES = {
  title: "3. Nerve Physiology (Impulse)",
  content: String.raw`# Nerve Physiology (Impulse)

## A) SCOPE
This section covers the physiology of the neuron, nerve fiber classification, mechanisms of action potential propagation (continuous vs saltatory), excitability changes (refractory periods), and clinical demyelination disorders.

---

## B) ONE-PAGE MASTER MAP (Big Picture)

- **Neuron:** Functional unit of CNS. Dendrites (input) → Cell Body (processing) → Axon (output).
- **Resting Membrane Potential (RMP):** -90 mV (Large fibers). Maintained by Na⁺/K⁺ pump and K⁺ leak channels.
- **Action Potential (AP):** Transient reversal of polarity.
  - **Depolarization:** Na⁺ influx (Voltage-gated Na⁺ channels).
  - **Repolarization:** K⁺ efflux (Voltage-gated K⁺ channels).
- **Propagation:** Local currents depolarize adjacent membrane to threshold.
  - **Unmyelinated Fibers:** Continuous conduction (slow).
  - **Myelinated Fibers:** Saltatory conduction (nodes of Ranvier). Fast & energy efficient.
- **Conduction Velocity:** Proportional to Diameter and Myelination.
- **Nerve Fiber Types:**
  - **Type A:** Myelinated. Alpha (fastest, motor), Beta (touch), Gamma (muscle spindle), Delta (pain/temp).
  - **Type B:** Myelinated. Preganglionic autonomic.
  - **Type C:** Unmyelinated. Slow pain, Postganglionic autonomic.
- **Rheobase:** Minimum current amplitude to excite nerve at infinite duration.
- **Chronaxie:** Minimum duration to excite nerve at 2x Rheobase (measure of excitability).
- **Local Anesthetics:** Block Na⁺ channels (prevent depolarization).
- **Hypocalcemia:** ↑ Excitability (destabilizes Na⁺ channel).
- **Hyperkalemia:** ↑ Excitability initially, then block (accommodation).

---

## C) CORE NOTES (THE MAIN BODY)

### 1. Nerve Impulse Propagation

#### 1) Key Concept
An Action Potential (AP) generated at one point excites adjacent portions of the membrane, resulting in propagation without loss of amplitude (decrements do not occur).

#### 2) Step-by-step Mechanism
1. **Local Circuit:** Sodium influx at the active zone reverses polarity (+35 mV inside).
2. **Current Flow:** Positive charges flow via axoplasm to adjacent resting node (-90 mV).
3. **Depolarization:** This local current raises the adjacent node from -90 mV toward Threshold (-65 mV).
4. **Firing:** Once threshold is reached, voltage-gated Na⁺ channels open, generating a new AP.
5. **Unidirectional:** Previous segment is in Refractory Period (Na⁺ channels inactivated), so AP cannot go backward.

#### 3) Key Equations (Velocity)

$$Velocity\ (m/s) \approx Diameter\ (\mu m) \times 6 \quad \text{(For myelinated fibers)}$$

- **Myelinated:** Velocity proportional to Diameter.
- **Unmyelinated:** Velocity proportional to Square Root of Diameter.

#### 4) Key Graphs (Conduction Types)
- **Continuous:** Slow, wave-like progression along entire membrane.
- **Saltatory:** "Jumping" APs. Graph shows AP occurring only at nodes; internodes show fast electrotonic flow (instantaneous).

### 2. Myelination & Saltatory Conduction

#### 1) Key Concept
Myelin (sphingomyelin) is an electrical insulator produced by **Schwann cells (PNS)** or **Oligodendrocytes (CNS)**. It wraps the axon, leaving gaps called **Nodes of Ranvier**.

#### 2) Mechanism
1. **Insulation:** Myelin decreases membrane capacitance (less charge needed to change voltage) and increases resistance (less leak).
2. **Nodes of Ranvier:** Voltage-gated Na⁺ channels are concentrated ONLY here.
3. **Jump:** Current flows through axoplasm from node to node with minimal leak.
4. **Saltatory Conduction:** Repolarization is also efficient (little ion exchange needed).

#### 5) Key Numbers
- Node length: 2–3 µm.
- Internode distance: 1–3 mm.
- Velocity increase: 5-fold to 50-fold vs unmyelinated.
- Metabolic saving: 100x less ion exchange = less Na⁺/K⁺ pump work.

#### 7) Clinical Correlation
- **Multiple Sclerosis (CNS):** Autoimmune destruction of oligodendrocytes. Saltatory conduction fails. Current leaks, failing to reach threshold at next node → Paralysis, Vision loss.
- **Guillain-Barré Syndrome (PNS):** Autoimmune destruction of Schwann cells. Ascending paralysis.

### 3. Nerve Fiber Classification (Erlanger-Gasser)

#### 1) Key Concept
Nerves are classified by diameter and conduction velocity. Larger/Myelinated = Faster.

#### 6) High-yield Table: Fiber Types
| Type | Myelin | Diameter (µm) | Velocity (m/s) | Function |
| :--- | :--- | :--- | :--- | :--- |
| A-Alpha | Yes | 12–20 | 70–120 | Somatic Motor, Proprioception |
| A-Beta | Yes | 5–12 | 30–70 | Touch, Pressure |
| A-Gamma | Yes | 3–6 | 15–30 | Motor to Muscle Spindles |
| A-Delta | Yes | 2–5 | 12–30 | Fast Pain, Cold, Sharp touch |
| B | Yes | < 3 | 3–15 | Preganglionic Autonomic |
| C | No | 0.4–1.2 | 0.5–2 | Slow Pain, Warmth, Postganglionic |

#### 8) BRS Exam Angle
- **Question:** "Which fiber is most sensitive to local anesthetics?" **Answer:** Type C (Small, unmyelinated) > Type B > Type A.
- **Question:** "Which fiber is most sensitive to pressure/hypoxia?" **Answer:** Type A (Large fibers need more metabolism).
- **Question:** "Which fiber carries sharp pain?" **Answer:** A-Delta. "Dull aching pain?" **Answer:** C.

### 4. Strength-Duration Curve

#### 1) Key Concept
Excitability depends on both Strength (Amplitude) and Duration of the stimulus.

#### 2) Definitions
- **Rheobase:** Minimal intensity (voltage) essential to excite a nerve at infinite duration.
- **Utilization time:** Time needed to excite at Rheobase intensity.
- **Chronaxie:** Minimal time required to excite at 2x Rheobase intensity.

#### 4) Key Graphs (Strength-Duration)
- X-axis: Duration (ms).
- Y-axis: Strength (Volts).
- Curve: Hyperbolic. As duration decreases, required strength increases.
- Shift: Curve shifts RIGHT if nerve is less excitable (e.g., local anesthetic).

#### 7) Clinical Correlation
- **Chronaxie Measurement:** Used to assess nerve damage. Denervated muscle has longer chronaxie (less excitable) than innervated muscle.

---

## D) REFLEXES + FEEDBACK LOOPS

- **Pain Stimulus** → A-delta/C fibers → Spinal Cord (Dorsal Horn) → Interneurons → Alpha Motor Neuron → Muscle Contraction (Withdrawal Reflex).

---

## E) "INCREASE VS DECREASE" EFFECTS TABLE

| If this changes... | Then this happens... |
| :--- | :--- |
| ↑ Fiber Diameter | ↑ Conduction Velocity (Lower resistance to axial flow). |
| ↑ Myelination | ↑ Conduction Velocity (Saltatory conduction). |
| ↑ Ca²⁺ (ECF) | ↓ Excitability (Stabilizes Na⁺ channel, raises threshold). |
| ↓ Ca²⁺ (ECF) | ↑ Excitability (Na⁺ channels open easily → Tetany). |
| ↑ K⁺ (ECF) | RMP becomes less negative (Depolarization). |
| Local Anesthetic | Blocks Na⁺ channels → ↓ Rate of rise of AP → Conduction block. |

---

## F) COMPARISON TABLES

### 1. Myelinated vs Unmyelinated
| Feature | Myelinated | Unmyelinated |
| :--- | :--- | :--- |
| Conduction | Saltatory (Jumps) | Continuous (Creeps) |
| Channels | Only at Nodes | Distributed all along |
| Velocity | Fast (up to 120 m/s) | Slow (< 2 m/s) |
| Energy Use | Low (Pump only at nodes) | High (Pump everywhere) |

### 2. A-Delta vs C Fibers
| Feature | A-Delta | C Fibers |
| :--- | :--- | :--- |
| Myelin | Yes (Thin) | No |
| Pain Quality | Sharp, Pricking, Fast | Dull, Burning, Slow |
| Neurotransmitter | Glutamate | Substance P / Glutamate |
| Localization | Good | Poor |

### 3. Electrical vs Chemical Synapse
| Feature | Electrical Synapse | Chemical Synapse |
| :--- | :--- | :--- |
| Agent | Gap Junctions (Connexons) | Neurotransmitter |
| Speed | Instant | Synaptic delay (0.5 ms) |
| Direction | Bidirectional | Unidirectional (One-way) |
| Example | Cardiac muscle, Smooth muscle | NMJ, CNS neurons |

### 4. Graded Potential vs Action Potential
| Feature | Graded Potential | Action Potential |
| :--- | :--- | :--- |
| Amplitude | Variable (Decremental) | All-or-None (Constant) |
| Threshold | No | Yes |
| Refractory | No (Summation possible) | Yes (Absolute/Relative) |
| Location | Dendrites / Soma | Axon Hillock / Axon |

### 5. Rheobase vs Chronaxie
| Feature | Rheobase | Chronaxie |
| :--- | :--- | :--- |
| Unit | Voltage (Strength) | Time (Duration) |
| Definition | Min strength at infinite time | Min time at 2x Rheobase |
| Significance | Baseline Intensity | Index of Excitability |

---

## G) LAST-DAY RAPID REVISION SHEET

- **RMP Generation:** K⁺ leak > Na⁺ leak > Na/K Pump.
- **Threshold Potential:** -65 mV (firing level).
- **Overshoot:** Positive part of AP (+35 mV).
- **Undershoot:** After-hyperpolarization (due to slow K⁺ closure).
- **Accommodation:** Slow depolarization (e.g., slow rising current) fails to fire AP because Na⁺ channels inactivate before threshold is reached.
- **Compound Action Potential:** Sum of APs from multiple fibers. Multi-peaked (alpha, beta, delta, C).
- **Susceptibility to Block:**
  - Pressure: A > B > C.
  - Hypoxia: B > A > C (Actually A/B very sensitive).
  - Local Anesthetics: C > B > A (Small fibers blocked first).
- **Lidocaine Mechanism:** Binds intracellular side of voltage-gated Na⁺ channel (use-dependent block).
- **Tetrodotoxin (TTX):** Blocks Na⁺ channel from outside.
- **Tetraethylammonium (TEA):** Blocks K⁺ channels.
- **Demyelination:** Increases membrane capacitance, decreases resistance. Safety factor drops < 1.
- **Frequency Coding:** CNS determines stimulus intensity by frequency of APs, not amplitude.
- **Orthodromic:** Conduction in normal direction (Soma → Axon).
- **Antidromic:** Backward conduction (Experimental).
- **Wallerian Degeneration:** Distal axon degenerates after cut.

---

## I) SHORT QUESTIONS (SAQ)

1. **Define Saltatory Conduction.**
Jumping of AP from node to node in myelinated fibers. Fast & efficient.

2. **List the Erlanger-Gasser classification.**
A-alpha, A-beta, A-gamma, A-delta, B, C.

3. **What is the effect of local anesthetic on RMP?**
None/Little. They block voltage-gated Na⁺ channels (prevent activation), not leak channels.

4. **Why is conduction slow in C fibers?**
Small diameter, No myelin (continuous conduction).

5. **Define Chronaxie.**
Minimum duration to excite a nerve at 2x Rheobase intensity.

6. **What determines conduction velocity?**
Diameter and Myelination.

7. **Mechanism of Absolute Refractory Period?**
Inactivation of voltage-gated Na⁺ channels.

8. **Pattern of sensory loss in peripheral neuropathy?**
"Glove and Stocking" (Longest nerves affected first).

9. **Why does Hypercalcemia cause muscle weakness?**
Stabilizes Na⁺ channels, raising the threshold (harder to fire).

10. **Difference between Oligodendrocyte and Schwann cell?**
Oligodendrocyte: CNS, myelinates multiple axons. Schwann: PNS, myelinates one axon segment.
`,
  keyPoints: [
    "AP propagates via local circuits depolarizing adjacent membrane to threshold",
    "Saltatory conduction: AP jumps node-to-node, 5-50x faster, 100x less energy",
    "Velocity ≈ Diameter × 6 (myelinated fibers)",
    "A-alpha fastest (70-120 m/s); C fibers slowest (0.5-2 m/s)",
    "MS = CNS demyelination (oligodendrocytes); GBS = PNS (Schwann cells)",
    "Local anesthetics block Na⁺ channels: C > B > A sensitivity",
    "Pressure/hypoxia block: A > B > C",
    "Chronaxie = index of excitability (shorter = more excitable)",
    "Hypocalcemia → ↑ excitability → tetany; Hypercalcemia → ↓ excitability",
    "AP is All-or-None; intensity coded by frequency, not amplitude",
    "Absolute refractory = Na⁺ channel inactivation; Relative = partial recovery",
    "Safety factor >5 in myelinated nerves; demyelination drops it below 1"
  ],
  mcqs: [
    {
      question: "Which fiber type has the fastest conduction velocity?",
      options: ["A-gamma", "A-delta", "B fibers", "A-alpha"],
      correctAnswer: 3,
      explanation: "A-alpha are somatic motor fibers, largest diameter (12-20µm), fastest (70-120 m/s)."
    },
    {
      question: "Saltatory conduction:",
      options: [
        "Occurs in unmyelinated fibers",
        "Increases energy consumption",
        "Increases conduction velocity",
        "Depends on Cl⁻ influx"
      ],
      correctAnswer: 2,
      explanation: "Jumping from node to node greatly increases speed and conserves energy."
    },
    {
      question: "Measurement of Chronaxie indicates:",
      options: [
        "Conduction velocity",
        "Excitability of the tissue",
        "Amplitude of Action Potential",
        "Resting Membrane Potential"
      ],
      correctAnswer: 1,
      explanation: "Shorter chronaxie = Higher excitability. Used to distinguish nerve vs muscle disease."
    },
    {
      question: "A specific inhibitor of Voltage-gated K⁺ channels (like TEA) would cause:",
      options: [
        "Failure to depolarize",
        "Prolonged Action Potential (Delayed repolarization)",
        "Decreased Overshoot",
        "Increased RMP"
      ],
      correctAnswer: 1,
      explanation: "Repolarization depends on K⁺ efflux. If blocked, the AP stays positive longer (plateau-like)."
    },
    {
      question: "In a nerve fiber, the absolute refractory period corresponds to:",
      options: [
        "The time K⁺ channels are open",
        "The time Na⁺ channels are inactivated",
        "The after-hyperpolarization",
        "The resting state"
      ],
      correctAnswer: 1,
      explanation: "Inactivation gates must reset (open) before a new AP can fire. This defines the absolute limit."
    },
    {
      question: "Which increases Conduction Velocity?",
      options: [
        "Decreasing fiber diameter",
        "Removing myelin",
        "Increasing membrane capacitance",
        "Increasing fiber diameter"
      ],
      correctAnswer: 3,
      explanation: "Velocity is proportional to Diameter. Larger = Less internal resistance."
    },
    {
      question: "(Graph Question) A Compound Action Potential recording shows multiple peaks. This confirms:",
      options: [
        "The nerve fires repeatedly",
        "The nerve contains fibers of different velocities",
        "The stimulus was sub-threshold",
        "There is synaptic delay"
      ],
      correctAnswer: 1,
      explanation: "Compound AP sums many fibers. Fast fibers arrive first (Peak 1), slow fibers later (Peak 2/3)."
    },
    {
      question: "Hyperkalemia (High ECF K⁺) generally causes:",
      options: [
        "Hyperpolarization and decreased excitability",
        "Depolarization and increased excitability (initially)",
        "Increased K⁺ efflux",
        "Inhibition of Na-K pump"
      ],
      correctAnswer: 1,
      explanation: "High outside K⁺ destroys the gradient, making Nernst less negative. RMP depolarizes closer to threshold, making it easier to fire (until it depolarizes TOO much and inactivates)."
    },
    {
      question: "Local anesthetics like Procaine work by:",
      options: [
        "Increasing K⁺ permeability",
        "Blocking voltage-gated Na⁺ channels",
        "Hyperpolarizing the nerve",
        "Blocking Ca²⁺ channels"
      ],
      correctAnswer: 1,
      explanation: "They bind the Na⁺ channel pore, preventing the upstroke of AP."
    },
    {
      question: "'Accommodation' of a nerve fiber refers to:",
      options: [
        "Ability to fire at high frequency",
        "Adaptation to a slowly rising stimulus intensity",
        "Fatigue of the neurotransmitter",
        "Increase in diameter with use"
      ],
      correctAnswer: 1,
      explanation: "If depolarization is too slow, Na⁺ inactivation gates close before the activation gates open enough to trigger AP."
    },
    {
      question: "Which sensation is carried by Unmyelinated C fibers?",
      options: [
        "Proprioception",
        "Vibration",
        "Fast sharp pain",
        "Slow burning pain"
      ],
      correctAnswer: 3,
      explanation: "C fibers are slow, carrying dull/burning pain and temperature."
    },
    {
      question: "In Multiple Sclerosis, the defect is:",
      options: [
        "Loss of Axons",
        "Loss of CNS Myelin",
        "Antibody to ACh receptor",
        "Loss of PNS Myelin"
      ],
      correctAnswer: 1,
      explanation: "MS is central demyelination. GBS is peripheral."
    },
    {
      question: "A 20-year-old accident victim has a severed nerve. The distal portion undergoes:",
      options: [
        "Regeneration immediately",
        "Wallerian Degeneration",
        "Chromatolysis",
        "Hypertrophy"
      ],
      correctAnswer: 1,
      explanation: "The segment separated from the soma dies and degenerates."
    },
    {
      question: "What is the effect of low extracellular Calcium (Hypocalcemia)?",
      options: [
        "Muscle weakness",
        "Nerve block",
        "Spontaneous nerve firing (Tetany)",
        "Hyperpolarization"
      ],
      correctAnswer: 2,
      explanation: "Ca²⁺ normally sits on the membrane surface shielding voltage sensors. Low Ca²⁺ makes the Na⁺ channel unstable and easy to open."
    },
    {
      question: "Rheobase is defined as:",
      options: [
        "Minimum time for excitation",
        "Minimum voltage for excitation at infinite duration",
        "2x Chronaxie",
        "Threshold potential"
      ],
      correctAnswer: 1,
      explanation: "The baseline intensity floor."
    },
    {
      question: "Which of the following is characteristic of Type A-alpha fibers?",
      options: [
        "Sensitive to local anesthetics",
        "Conduction velocity ~1 m/s",
        "Function in proprioception and somatic motor",
        "Unmyelinated"
      ],
      correctAnswer: 2,
      explanation: "The 'heavy lifters' of the nervous system."
    },
    {
      question: "If the Sodium-Potassium pump is blocked, which change happens first?",
      options: [
        "RMP goes to 0 mV instantly",
        "Cell lyses",
        "Intracellular Na⁺ concentration increases",
        "Action potential amplitude increases"
      ],
      correctAnswer: 2,
      explanation: "The primary effect is accumulation of Na⁺ inside. RMP decay takes longer. Lysis takes longer."
    },
    {
      question: "The 'safety factor' for transmission in a myelinated nerve is:",
      options: ["< 1", "Exactly 1", "> 5", "0"],
      correctAnswer: 2,
      explanation: "The current generated at one node is 5-7 times stronger than necessary to excite the next node. Demyelination lowers this."
    },
    {
      question: "Which channel type is primarily responsible for the Resting Membrane Potential?",
      options: [
        "Voltage-gated Na⁺",
        "Voltage-gated K⁺",
        "K⁺ Leak channels",
        "Na-K Pump"
      ],
      correctAnswer: 2,
      explanation: "The high resting permeability to K⁺ via leak channels sets RMP near EqK."
    },
    {
      question: "In an experiment, a nerve is stimulated in the middle of the axon. The AP travels:",
      options: [
        "Only towards the soma (Antidromic)",
        "Only towards the terminal (Orthodromic)",
        "In both directions",
        "Nowhere"
      ],
      correctAnswer: 2,
      explanation: "An axon can conduct both ways. Normally it starts at the hillock so it only goes one way (due to refractory period behind it)."
    },
    {
      question: "(Trap) Does Increasing stimulus strength increase Action Potential amplitude?",
      options: [
        "Yes, linearly",
        "No, AP is All-or-None",
        "Only in Unmyelinated fibers",
        "Yes, but only in relative refractory period"
      ],
      correctAnswer: 1,
      explanation: "Once threshold is met, the AP is stereotyped. Increasing stimulus might recruit more fibers (Compound AP), but single fiber AP is constant."
    },
    {
      question: "Which fiber is preganglionic autonomic?",
      options: ["Type A-beta", "Type B", "Type C", "Type A-delta"],
      correctAnswer: 1,
      explanation: "Type B are small myelinated, preganglionic ANS."
    },
    {
      question: "Which transport mechanism restores ion gradients after a burst of Action Potentials?",
      options: [
        "Simple diffusion",
        "Na⁺-K⁺ ATPase",
        "Facilitated diffusion",
        "Ca²⁺ ATPase"
      ],
      correctAnswer: 1,
      explanation: "The pump cleans up the mess (high Na in, K out) made by the APs."
    },
    {
      question: "Which is true regarding Conduction Velocity?",
      options: [
        "Cold temperature increases velocity",
        "Myelination decreases velocity",
        "Increasing diameter increases velocity",
        "It is constant for all nerves"
      ],
      correctAnswer: 2,
      explanation: "Diameter and Myelin are the two speed boosters."
    },
    {
      question: "Nernst potential for Na⁺ is +61 mV. Why does the AP peak at +35 mV, not +61 mV?",
      options: [
        "Na⁺ channels inactivate before equilibrium is reached",
        "K⁺ channels open and begin repolarization",
        "Both A and B",
        "Na⁺ runs out"
      ],
      correctAnswer: 2,
      explanation: "The 'Overshoot' is cut short by Na inactivation and K opening."
    }
  ]
};
