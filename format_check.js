// Quick script to show what needs markdown formatting fixes
// All plain text headers need ### or #### prefix
// All "Definition:" labels need **Definition:**
// All bullet points with ● need to be converted to markdown -
// Lists numbered with 1), 2), 3) are fine but should have consistent formatting

const sectionsNeedingFixes = [
    "3. Proportional limit:",
    "Elastic limit:",
    "Yield Strength (σy)",
    "1) Modulus of Elasticity (E) and \"Stiffness\" in Dental Alloys",
    "Orthodontic Wires: Stiffness (E) vs Springback (Resilience)",
    "How wire stiffness changes with radius (ORTHO SPECIFIC)",
    "2) Resilience (elastic energy storage)",
    "Plastic Region (The \"Dent\" Zone):",
    "3) Yield Strength (σy)",
    "UTS (Ultimate Tensile Strength)",
    "Fracture Toughness (KIC)",
    "Other Mechanical Properties",
    "1) Tensile Strength",
    "2) Compressive Strength",
    "3) Impact Strength",
    "4) Ductility",
    "5) Malleability",
    "6) Brittleness",
    "Brittleness — Clinical Summary (Margin Design)",
    "7) Hardness:",
    "Very hard / hard surfaces",
    "Medium hardness (varies)",
    "Lower hardness",
    "Base-metal alloys (Co–Cr, Ni–Cr): hardness correlation + clinical relevance",
    "B. The \"Confusables\" Table"
];

console.log("Sections to fix:", sectionsNeedingFixes.length);
