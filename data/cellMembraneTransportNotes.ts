export const CELL_MEMBRANE_TRANSPORT_NOTES = {
  title: "2. Cell Membrane Transport",
  content: String.raw`# Cell Membrane Transport

## A) SCOPE
Structure of the lipid bilayer, types of membrane proteins, and mechanisms of transport: Diffusion (Simple/Facilitated), Active Transport (Primary/Secondary), and Osmosis.

---

## B) ONE-PAGE MASTER MAP

- **The Problem:** Cells are watery bags floating in water, but they need to separate their "stuff" from the "outside stuff".
- **The Solution:** The Lipid Bilayer. Fat doesn't mix with water. It forms a seal.
- **Transport Components:**
  - **Passive Transport (Downhill):** No energy needed. The ball rolls down the hill.
    - **Simple Diffusion:** Small/Lipid-soluble stuff (O₂, CO₂) walks right through the wall.
    - **Facilitated Diffusion:** Big/Polar stuff (Glucose) needs a revolving door (Carrier).
  - **Active Transport (Uphill):** Requires Energy. Pushing the ball up the hill.
    - **Primary:** User pays cash (ATP) directly. (e.g., Na⁺/K⁺ Pump).
    - **Secondary:** User sneaks in while someone else pays. (e.g., Glucose hitching a ride with Na⁺).
  - **Osmosis:** Water follows the "party" (Solutes). Where there is salt/sugar, water goes.
- **Nernst Potential:** The "Electrical Wall". The voltage needed to stop an ion from moving down its concentration gradient.
- **RMP (-90mV):** The cell is negative inside. Why? Because K⁺ leaks out, taking positive charge with it.

---

## C) CORE NOTES

### 1. Membrane Structure (The Fluid Mosaic)

#### 1) Key Concept
Think of the membrane like a sea of lipids with protein icebergs floating in it. The lipids stop water-soluble things. The proteins let specific things in/out.

#### 6) High-yield Table: Components
| Component | Function | Analogy |
| :--- | :--- | :--- |
| Phospholipids | Barrier. Hydrophilic head (water-loving), Hydrophobic tail (water-fearing). | The walls of the castle. |
| Cholesterol | Stabilizes fluidity. Prevents it from melting (hot) or freezing (cold). | The mortar in the bricks. |
| Proteins | Channels, Carriers, Receptors. | Doors, Windows, Doorbells. |
| Glycocalyx | Carbohydrate coat. Negative charge. Cell-Cell ID. | The address number on the house. |

### 2. Transport Mechanisms

#### 1) Simple Diffusion (The Ghost)
- **Mechanism:** Lipid-soluble molecules (O₂, CO₂, Alcohol, Anesthetics) dissolve in the lipid and cross.
- **Rate:** Limitless. The more you have, the faster it goes (Linear Graph).
- **Clinical:** This is why Oxygen therapy works--you increase gradient, you increase entry.

#### 2) Facilitated Diffusion (The Revolving Door)
- **Mechanism:** A carrier protein (e.g., GLUT-4) binds the molecule, changes shape, and releases it inside.
- **Key Feature:** Saturation (Vmax).
- **Analogy:** If a revolving door takes 3 seconds to turn, it can only let 20 people in per minute. Even if 1000 people are waiting, the rate is capped at 20. This cap is **Vmax**.

#### 3) Primary Active Transport (The Sump Pump)
- **Na⁺-K⁺ Pump:** The most important pump in the body.
  - **Job:** Pumps 3 Na⁺ OUT and 2 K⁺ IN.
  - **Cost:** 1 ATP per cycle.
  - **Why?**
    1. **Battery:** Creates high Na⁺ outside, high K⁺ inside. This voltage runs nerve signals.
    2. **Volume Control:** Water follows Na⁺. Pumping Na⁺ out keeps water out. Without this pump, cells swell and burst.

#### 4) Secondary Active Transport (The Freeloader)
- **Mechanism:** The Na⁺/K⁺ pump spent energy to push Na⁺ out. Now Na⁺ really wants to come back in.
  - **Co-Transport (Symport):** Glucose says "I'll hold onto Na⁺ and sneak in". (SGLT-1 in gut).
  - **Counter-Transport (Antiport):** As Na⁺ comes in, Calcium is kicked out. (Na⁺/Ca²⁺ exchanger in heart).
- **Note:** NO ATP is used directly here. The energy comes from the Na⁺ gradient (stored energy).

### 3. Membrane Potentials

#### 1) Key Concept: The Tug-of-War
Ions move due to two forces:
1. **Chemical Gradient:** Diffusion. (High to Low concentration).
2. **Electrical Gradient:** Charge. (Positives repel Positives).
- **Equilibrium (Nernst)** is when these two forces are equal and opposite.

#### 2) Nernst Potential Example (K⁺)
- **Chemical:** K⁺ is high inside. It wants to diffuse OUT.
- **Electrical:** As K⁺ leaves, the inside becomes Negative. This negativity pulls K⁺ BACK IN.
- **Balance:** At -94 mV, the pull back in equals the push out. Net flow is zero. This is the Nernst Potential for K⁺.

#### 3) Resting Membrane Potential (RMP)
- **Why is RMP -90 mV?**
  - Because the membrane is much more permeable to K⁺ (leak channels) than Na⁺.
  - So RMP is very close to the K⁺ equilibrium (-94 mV), but pulled slightly positive by a tiny leak of Na⁺ (+61 mV).

#### 4) Key Equations (Nernst)

$$EMF = \pm 61 \times \log\frac{[Concentration\ Out]}{[Concentration\ In]}$$

- Na⁺: log(142/14) ≈ log(10) = 1. EMF = +61 mV.
- K⁺: log(4/140) ≈ log(1/35). EMF = -94 mV.

---

## D) REFLEXES + FEEDBACK LOOPS

- **Osmoreceptors to ADH:** High salt in blood → Brain cells shrink (osmosis) → Triggers thirst + ADH → Kidneys save water → Dilutes the salt.

---

## E) "INCREASE VS DECREASE" EFFECTS TABLE

| If this changes... | Then this happens... |
| :--- | :--- |
| ↓ Oxygen | Na/K Pump stops (needs ATP) → Cell swells + Depolarizes → Dies. |
| ↑ ECF Glucose | Saturation of Carriers (Vmax) → Excess glucose spills into urine (Diabetes). |
| ↑ Voltage | Voltage-gated Na⁺ channels open → Action Potential. |

---

## F) COMPARISON TABLES

### 1. Channel vs Carrier
| Feature | Channel (Tunnel) | Carrier (Shuttle) |
| :--- | :--- | :--- |
| Analogy | Open hallway | Revolving Door |
| Speed | Fast (Ions flow freely) | Slow (Click-clack mechanism) |
| Saturation | No (Linear) | Yes (Vmax) |
| Example | Na⁺ Channel | Glucose Transporter |

### 2. Active vs Passive
| Feature | Active | Passive |
| :--- | :--- | :--- |
| Direction | Uphill (Low to High) | Downhill (High to Low) |
| Energy | Needs ATP | Kinetic Energy (Heat) |
| Goal | Create Gradients | Eliminate Gradients |

---

## G) LAST-DAY RAPID REVISION SHEET

- **Fick's Law:** Rate = (Area × Solubility × Conc Diff) / (Thickness × √MW).
- **Permeability:** P = (Partition Coeff × Diffusion Coeff) / Thickness.
- **Osmolarity vs Tonicity:** Tonicity ONLY counts particles that cannot cross. Urea crosses, so it adds Osmolarity but NOT Tonicity.
- **RMP origins:** K⁺ Leak (main factor) + Na/K Pump (-4mV contribution).
- **Depolarization:** Membrane becomes less negative (e.g., -90 to -50). Caused by Na⁺ Influx.
- **Hyperpolarization:** More negative (e.g., -90 to -100). Caused by Cl⁻ Influx or K⁺ Efflux.
`,
  keyPoints: [
    "Lipid bilayer = barrier; proteins = doors/channels/receptors",
    "Simple diffusion: no saturation (linear); Facilitated: saturation (Vmax)",
    "Na⁺/K⁺ Pump: 3 Na⁺ out, 2 K⁺ in, 1 ATP -- creates the battery",
    "Secondary active transport uses Na⁺ gradient, NOT direct ATP",
    "Symport = same direction (SGLT-1); Antiport = opposite (Na⁺/Ca²⁺)",
    "Nernst: EMF = ±61 × log(Cout/Cin)",
    "RMP ≈ -90mV because membrane is 100x more permeable to K⁺ than Na⁺",
    "Osmolarity ≠ Tonicity -- urea is isosmotic but hypotonic",
    "No O₂ → pump fails → cell swells and dies",
    "Glycocalyx = carbohydrate coat for cell-cell recognition"
  ],
  mcqs: [
    {
      question: "Which transport mechanism is limited by a Transport Maximum (Tm)?",
      options: [
        "Simple diffusion of CO₂",
        "Facilitated diffusion of Glucose",
        "Osmosis",
        "Diffusion of Na⁺ through a channel"
      ],
      correctAnswer: 1,
      explanation: "Any process using a conformational-change protein (carrier/pump) can run out of binding sites. This is saturation."
    },
    {
      question: "Why does the RMP of a nerve (-90 mV) sit closer to the K⁺ Nernst Potential (-94 mV) than the Na⁺ Nernst Potential (+61 mV)?",
      options: [
        "There is more K⁺ inside the cell",
        "The membrane is 100x more permeable to K⁺ than Na⁺",
        "The Na/K pump moves 3 Na⁺ out",
        "K⁺ is larger than Na⁺"
      ],
      correctAnswer: 1,
      explanation: "The Goldman equation states that RMP is determined by the most permeable ion. At rest, K⁺ leak channels are open, Na⁺ channels are closed."
    },
    {
      question: "If you place a red blood cell (300 mOsm) into a solution of 300 mOsm Urea, what happens?",
      options: [
        "Nothing (Isotonic)",
        "It swells and bursts",
        "It shrinks"
      ],
      correctAnswer: 1,
      explanation: "TRAP! Urea is isosmotic (300 vs 300) BUT Urea is penetrating. It enters the cell, dragging water with it. The solution is effectively Hypotonic."
    }
  ]
};
