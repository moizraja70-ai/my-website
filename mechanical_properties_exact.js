// mechanical_properties_exact.js
// Auto-extracted from: MEHCNAICAL .pdf
// Goal: preserve formatting (bold/italic/font-size) as closely as possible via HTML.

export const mechanicalPropertiesHTML = `
<style>
.pdf-export{font-family:Arial, Helvetica, sans-serif; line-height:1.25; color:#111;}
.page{margin:24px 0; padding:0;}
.line{white-space:pre-wrap;}
.image-placeholder{margin:10px 0; padding:6px 8px; border:1px dashed #999; color:#444; font-size:12px;}
</style>

<div class="pdf-export">
<div class="page" data-page="1">
<div class="line"><span style="font-weight:700;font-size:13.0px">Before We Start: How to Think About “Properties” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">To use dental materials safely and intelligently, we first need: </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">1.​ Clear definitions​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">○​ What each property actually means (strength, toughness, rheology, </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">solubility, etc.).​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">2.​ Clinical correlation </span><span style="font-weight:700;font-style:italic;font-size:11.0px">(the more important part)​</span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">○​ How that property affects:​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">■​ Operative (restorations, liners, composites)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">■​ Ortho (wires, adhesives)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">■​ Prostho (impressions, cements, denture bases, crowns)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">This may feel like a lot of theory, but the goal is simple: </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Know the few key properties that actually change how you select, handle, and </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">evaluate materials in the clinic—and the way they are asked in exams. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:26.0px">MECHANICAL PROPERTIES</span><span style="font-size:26.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">The fundamental relationship between force and deformation. </span></div>
<div class="line"><span style="font-weight:700;font-size:18.0px">1) Stress (σ) </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">Definition:​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> Stress is the </span><span style="font-weight:700;font-style:italic;font-size:11.0px">internal resistance</span><span style="font-style:italic;font-size:11.0px"> of a material to an external load.​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> When an external force is applied, the material “pushes back” internally to maintain its </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">structure—this internal reaction is stress. </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">Formula (Docs-friendly):​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> Stress = Force / Area </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">Written as:​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> σ = F / A </span></div>
</div>
<div class="page" data-page="2">
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">Units: </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">●​ Pascal (Pa)​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">●​ Megapascal (MPa)​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">●​ Common dental unit: MPa = N/mm²​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">Clinical example:</span><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">1.​ When a patient bites on a restoration, the biting force is distributed over the restoration’s </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">surface area, creating stress within the material. If the force is concentrated over a very </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">small area (stress concentration), the stress becomes very high and may overload the </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">restoration or tooth structure, leading to fracture of the restoration or even a cusp. </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">2.​ So clinically, we try to avoid </span><span style="font-weight:700;font-style:italic;font-size:11.0px">excessively high stress</span><span style="font-style:italic;font-size:11.0px"> by improving occlusal contacts </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">and distributing forces evenly. </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">1.​</span><span style="font-weight:700;font-style:italic;font-size:11.0px"> Denture note (occlusal table):​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">If a denture tooth has a very large (wide) occlusal table, the chewing load is less efficient </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">and tends to increase lateral/tipping forces. This can lead to poor cutting/biting efficiency </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">and may destabilize the denture (more tipping/rocking). Therefore, denture teeth are </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">often designed with a more appropriate occlusal table width to improve efficiency and </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">stability. </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">2.​</span><span style="font-weight:700;font-style:italic;font-size:11.0px"> However:</span><span style="font-style:italic;font-size:11.0px"> If the occlusal table is made </span><span style="font-weight:700;font-style:italic;font-size:11.0px">too narrow</span><span style="font-style:italic;font-size:11.0px">, the same chewing force is applied </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">over a smaller contact area, which can increase the pressure transmitted to the </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">denture-bearing tissues. This may concentrate load on the mucosa/gingiva (especially if </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">the denture is unstable), leading to </span><span style="font-weight:700;font-style:italic;font-size:11.0px">tissue soreness and sore spots</span><span style="font-style:italic;font-size:11.0px">. </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">3.​</span><span style="font-weight:700;font-style:italic;font-size:11.0px"> Clinical principle:</span><span style="font-style:italic;font-size:11.0px"> Aim for an occlusal table width that balances </span><span style="font-weight:700;font-style:italic;font-size:11.0px">chewing efficiency </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">and denture stability</span><span style="font-style:italic;font-size:11.0px"> while avoiding excessive stress concentration on the supporting </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px">tissues. </span></div>
</div>
<div class="page" data-page="3">
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:18.0px">2.</span><span style="font-weight:700;font-size:18.0px">Strain (ε)</span><span style="font-weight:700;font-size:16.0px">​</span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:16.0px"> </span><span style="font-weight:700;font-size:16.0px">Definition:</span><span style="font-size:16.0px"> The amount of deformation (change in shape) that </span></div>
<div class="line"><span style="font-size:16.0px">occurs in response to stress. </span></div>
<div class="line"><span style="font-size:11.0px">When a material is subjected to stress, it physically changes dimensions (stretches, </span></div>
<div class="line"><span style="font-size:11.0px">compresses, or twists). Strain measures this change relative to the original length. </span></div>
<div class="line"><span style="font-size:11.0px">•</span><span style="font-weight:700;font-size:11.0px"> Formula</span><span style="font-size:11.0px">: Strain (ε) = ΔL / L</span><span style="font-size:11.0px">₀</span><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> – ΔL = change in length​</span></div>
<div class="line"><span style="font-size:11.0px"> – L</span><span style="font-size:11.0px">₀</span><span style="font-size:11.0px"> = original length </span></div>
<div class="line"><span style="font-size:11.0px">• Units: Dimensionless (often expressed as a percentage, %). </span></div>
<div class="line"><span style="font-size:11.0px">•</span><span style="font-weight:700;font-size:11.0px">Dental bridge example:​</span></div>
<div class="line"><span style="font-size:11.0px"> If a dental bridge bends slightly in the middle under chewing forces, the </span><span style="font-weight:700;font-size:11.0px">force from chewing is </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">the stress</span><span style="font-size:11.0px">, and the </span><span style="font-weight:700;font-size:11.0px">bending/deformation of the bridge is the strain</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Impression material / “chewing gum” analogy:​</span></div>
<div class="line"><span style="font-size:11.0px"> When you </span><span style="font-weight:700;font-size:11.0px">pull</span><span style="font-size:11.0px"> an impression material (or something elastic like chewing gum), the </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 3]</div>
</div>
<div class="page" data-page="4">
<div class="line"><span style="font-weight:700;font-size:11.0px">pulling force you apply is the stress</span><span style="font-size:11.0px">, and the </span><span style="font-weight:700;font-size:11.0px">material elongating/stretching is the </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">strain</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line rule to remember:​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Stress = the load you apply (cause). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Strain = the deformation that happens (effect).</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:16.0px">3. The Stress-Strain Curve Zones </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">The Stress–Strain Relationship  </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Stress (σ)</span><span style="font-size:11.0px"> causes </span><span style="font-weight:700;font-size:11.0px">strain (ε)</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> A </span><span style="font-weight:700;font-size:11.0px">stress–strain curve</span><span style="font-size:11.0px"> shows how a material deforms as you increase the load. </span></div>
<div class="line"><span style="font-size:11.0px">We uses a metal diagram showing if u applies the stress on a material what phases it </span></div>
<div class="line"><span style="font-size:11.0px">undergoes on a  stress strain curve </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 4]</div>
</div>
<div class="page" data-page="5">
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:20.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:19.0px">Elastic Region (The &quot;Spring&quot; Zone): </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">1.Elastic Modulus (Stiffness):</span><span style="font-size:11.0px"> slope of the elastic (linear) part of the stress–strain curve = </span></div>
<div class="line"><span style="font-size:11.0px">Modulus of Elasticity (E).​</span></div>
<div class="line"><span style="font-size:11.0px"> T</span><span style="font-size:11.0px">his tells you how rigid (stiff) or flexible a material is. </span></div>
<div class="line"><span style="font-size:11.0px">●​ Higher E (steeper slope) = more rigid / stiffer​</span></div>
<div class="line"><span style="font-size:11.0px"> → very little strain (bending) for a given stress.​</span></div>
<div class="line"><span style="font-size:11.0px"> Example idea:Porcelain / glass-like materials are extremely stiff, so they don’t bend </span></div>
<div class="line"><span style="font-size:11.0px">much.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Lower E (less steep slope) = more flexible​</span></div>
<div class="line"><span style="font-size:11.0px"> → more strain (bending) for the same stress.​</span></div>
<div class="line"><span style="font-size:11.0px"> Example: metals with lower E flex more.​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ It is the </span><span style="font-weight:700;font-size:11.0px">stiffness</span><span style="font-size:11.0px"> of the material — i.e., </span><span style="font-weight:700;font-size:11.0px">how much it bends/strains for a given stress</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">■​</span><span style="font-style:italic;font-size:11.0px"> High Modulus:</span><span style="font-size:11.0px"> Rigid (e.g., PFM Metal Framework). </span></div>
<div class="line"><span style="font-size:11.0px">■​</span><span style="font-style:italic;font-size:11.0px"> Low Modulus:</span><span style="font-size:11.0px"> Flexible (e.g., Class V filling to flex with the tooth) </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 5]</div>
</div>
<div class="page" data-page="6">
<div class="line"><span style="font-weight:700;font-size:11.0px">2.Resilience = area under the curve in the elastic region only </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">3.proportional limit:​</span></div>
<div class="line"><span style="font-size:11.0px"> The </span><span style="font-weight:700;font-size:11.0px">highest point on the stress–strain curve where stress is directly proportional to </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">strain</span><span style="font-size:11.0px"> (the end of the perfectly straight/linear region). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">After this point:​</span></div>
<div class="line"><span style="font-size:11.0px"> The curve stops being perfectly linear, so </span><span style="font-weight:700;font-size:11.0px">stress and strain no longer have a constant </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">proportional relationship</span><span style="font-size:11.0px"> (Hooke’s law no longer strictly applies). </span></div>
<div class="line"><span style="font-size:11.0px">Why we care about this because this  affects modulus of elasticity and we care about that alot  </span></div>
<div class="line"><span style="font-weight:700;font-size:12.0px">Why it matters clinically </span></div>
<div class="line"><span style="font-size:11.0px">1.​</span><span style="font-weight:700;font-size:11.0px"> Predictable deflection (using E)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Below the proportional limit, stress </span><span style="font-size:11.0px">∝</span><span style="font-size:11.0px"> strain, so </span><span style="font-weight:700;font-size:11.0px">calculations based on E are accurate</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Above it, the curve becomes nonlinear, so </span><span style="font-weight:700;font-size:11.0px">E no longer predicts bending/deflection </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">reliably</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">2.​</span><span style="font-weight:700;font-size:11.0px"> Safety margin for “springback” behavior​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ For things that must act like springs (wires, clasps), you want them to work </span><span style="font-weight:700;font-size:11.0px">within the </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">proportional/elastic range</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ A higher proportional limit means the material can take </span><span style="font-weight:700;font-size:11.0px">more stress while still </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">behaving elastically/linearly</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">3.​</span><span style="font-weight:700;font-size:11.0px"> Early warning before permanent distortion​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ The proportional limit is usually </span><span style="font-weight:700;font-size:11.0px">close to</span><span style="font-size:11.0px"> the onset of non-ideal behavior that leads </span></div>
<div class="line"><span style="font-size:11.0px">toward plastic deformation.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ In frameworks/bridges/wires, once you start leaving the linear elastic range, you risk </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">distortion, loss of fit, or fatigue</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">So if </span><span style="font-weight:700;font-size:11.0px">Straight line (stress and strain increase together evenly)</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">safe</span><span style="font-size:11.0px"> → material springs </span></div>
<div class="line"><span style="font-size:11.0px">back.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Line starts to curve</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">warning</span><span style="font-size:11.0px"> → you may be near </span><span style="font-weight:700;font-size:11.0px">yield</span><span style="font-size:11.0px">, so stop to avoid permanent bend. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
</div>
<div class="page" data-page="7">
<div class="line"><span style="font-weight:700;font-size:12.0px">Simple one-liner </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">E tells you “how stiff.” The proportional limit tells you “how far you can load it and still </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">trust that stiffness and get a clean springback.” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Elastic limit: the maximum stress a material can take and still return completely to its </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">original shape when the load is removed. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">●​ Below elastic limit: returns to original shape (no permanent change).​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">●​ Beyond elastic limit: permanent deformation occurs → it will not fully return to its </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">original position.​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">(Elastic limit is basically the boundary between elastic and plastic behavior.) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">It&#x27;s pretty hard to see in metals so we use another terminology called the yield strength  </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Yield Strength (σy) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition: The stress required to produce 0.2% permanent (plastic) strain (also called </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">0.2% proof stress </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">1) Modulus of Elasticity (E) and “Stiffness” in Dental </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">Alloys </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">High E = stiffer (less bending)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Low E = more flexible (more bending) </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">1) Base-metal alloys (very stiff) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Cobalt–Chromium (Co–Cr)</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">very high stiffness </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Nickel–Chromium (Ni–Cr)</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">very high stiffness​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical meaning:</span><span style="font-size:11.0px"> frameworks can be thinner and still resist flexing. </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">2) Stainless steel (stiff) </span></div>
<div class="line"><span style="font-size:11.0px">●​ Used in orthodontics; still </span><span style="font-weight:700;font-size:11.0px">high stiffness</span><span style="font-size:11.0px">, but generally discussed more as a wire </span></div>
<div class="line"><span style="font-size:11.0px">material. </span></div>
</div>
<div class="page" data-page="8">
<div class="line"><span style="font-weight:700;font-size:13.0px">3) Noble alloys (less stiff than base metals) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Noble alloys = high noble (gold-rich) or palladium-based alloys. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Gold alloys (Type III/IV, high noble)</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">lower modulus than Co–Cr / Ni–Cr </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Palladium-based noble alloys</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">moderate to high modulus</span><span style="font-size:11.0px">, but in many dental </span></div>
<div class="line"><span style="font-size:11.0px">teaching comparisons, </span><span style="font-weight:700;font-size:11.0px">base metals are still stiffer</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical meaning:​</span></div>
<div class="line"><span style="font-size:11.0px">If you use a </span><span style="font-weight:700;font-size:11.0px">gold/high-noble framework</span><span style="font-size:11.0px">, it may need to be </span><span style="font-weight:700;font-size:11.0px">bulkier/thicker</span><span style="font-size:11.0px"> than a base-metal </span></div>
<div class="line"><span style="font-size:11.0px">framework to achieve the same rigidity (same “no-flex” behavior). </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:14.0px">Orthodontic Wires: Stiffness (E) vs Springback (Resilience) </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Common wire stiffness order (for similar size wires) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Stainless steel</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">stiff </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Beta-titanium (TMA)</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">moderate stiffness </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> NiTi</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">low stiffness</span><span style="font-size:11.0px">, but </span><span style="font-weight:700;font-size:11.0px">high springback</span><span style="font-size:11.0px"> (resilience) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Key clinical idea: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> NiTi</span><span style="font-size:11.0px">: bends easily but springs back strongly → best for </span><span style="font-weight:700;font-size:11.0px">initial alignment</span><span style="font-size:11.0px"> with light </span></div>
<div class="line"><span style="font-size:11.0px">continuous forces. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Stainless steel</span><span style="font-size:11.0px">: stiff control → best for </span><span style="font-weight:700;font-size:11.0px">working/finishing, detailing, sliding </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">mechanics</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> TMA</span><span style="font-size:11.0px">: middle ground and easy to bend → good for </span><span style="font-weight:700;font-size:11.0px">loops and adjustments</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">How wire stiffness changes with radius (ORTHO </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">SPECIFIC) </span></div>
<div class="line"><span style="font-size:11.0px">When you change the </span><span style="font-weight:700;font-size:11.0px">thickness</span><span style="font-size:11.0px"> of a wire, stiffness changes </span><span style="font-weight:700;font-size:11.0px">a LOT</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">A) Bending stiffness (like when a wire flexes up/down) </span></div>
</div>
<div class="page" data-page="9">
<div class="line"><span style="font-weight:700;font-size:11.0px">Bending stiffness </span><span style="font-size:11.0px">∝</span><span style="font-weight:700;font-size:11.0px"> E × r</span><span style="font-size:11.0px">⁴</span><span style="font-size:11.0px"> (for a round wire)​</span></div>
<div class="line"><span style="font-size:11.0px">So </span><span style="font-weight:700;font-size:11.0px">radius is to the 4th power</span><span style="font-size:11.0px"> (super sensitive). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Quick memory examples: </span></div>
<div class="line"><span style="font-size:11.0px">●​ If </span><span style="font-weight:700;font-size:11.0px">radius doubles</span><span style="font-size:11.0px"> → stiffness increases </span><span style="font-weight:700;font-size:11.0px">2</span><span style="font-size:11.0px">⁴</span><span style="font-weight:700;font-size:11.0px"> = 16× </span></div>
<div class="line"><span style="font-size:11.0px">●​ If </span><span style="font-weight:700;font-size:11.0px">diameter doubles</span><span style="font-size:11.0px"> → stiffness also increases </span><span style="font-weight:700;font-size:11.0px">16×</span><span style="font-size:11.0px"> (because diameter </span><span style="font-size:11.0px">∝</span><span style="font-size:11.0px"> radius) </span></div>
<div class="line"><span style="font-size:11.0px">Even small changes matter: </span></div>
<div class="line"><span style="font-size:11.0px">●​ Increase radius by </span><span style="font-weight:700;font-size:11.0px">10%</span><span style="font-size:11.0px"> → stiffness ≈ </span><span style="font-weight:700;font-size:11.0px">(1.1)</span><span style="font-size:11.0px">⁴</span><span style="font-weight:700;font-size:11.0px"> ≈ 1.46</span><span style="font-size:11.0px"> → about </span><span style="font-weight:700;font-size:11.0px">46% stiffer </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">B) Axial stiffness (pulling along its length) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Axial stiffness </span><span style="font-size:11.0px">∝</span><span style="font-weight:700;font-size:11.0px"> E × r²​</span></div>
<div class="line"><span style="font-size:11.0px">(less dramatic than bending) </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">C) Torsional stiffness (twisting) </span></div>
<div class="line"><span style="font-size:11.0px">For a round wire, torsional stiffness also scales strongly with size (commonly taught as </span><span style="font-size:11.0px">∝</span><span style="font-weight:700;font-size:11.0px"> r</span><span style="font-size:11.0px">⁴</span><span style="font-size:11.0px">). </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">To make it simple if u increase the radius if the wire is twice as thicker it will be 16 times hard to </span></div>
<div class="line"><span style="font-size:11.0px">bend 4 times hard to pull it and 16 times harder to twist it </span></div>
<div class="line"><span style="font-size:11.0px">That&#x27;s why when we were making adams clasp  from a 0.7mm wire it was so difficult on the </span></div>
<div class="line"><span style="font-size:11.0px">other hand  finger spring and z spring were so easy as they were 0.5mm wire  </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 9]</div>
</div>
<div class="page" data-page="10">
<div class="line"><span style="font-weight:700;font-size:11.0px">Wire thickness (radius) effect — super important rule​</span></div>
<div class="line"><span style="font-size:11.0px"> For a round wire, thickness affects stiffness a LOT: </span></div>
<div class="line"><span style="font-size:11.0px">●​ If the </span><span style="font-weight:700;font-size:11.0px">radius doubles</span><span style="font-size:11.0px"> (wire becomes twice as thick):​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Bending stiffness</span><span style="font-size:11.0px"> becomes </span><span style="font-weight:700;font-size:11.0px">16×</span><span style="font-size:11.0px"> higher (r</span><span style="font-size:11.0px">⁴</span><span style="font-size:11.0px">) → 16× harder to bend​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Pulling (axial) stiffness</span><span style="font-size:11.0px"> becomes </span><span style="font-weight:700;font-size:11.0px">4×</span><span style="font-size:11.0px"> higher (r²) → 4× harder to stretch/pull​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Twisting (torsional) stiffness</span><span style="font-size:11.0px"> becomes </span><span style="font-weight:700;font-size:11.0px">16×</span><span style="font-size:11.0px"> higher (r</span><span style="font-size:11.0px">⁴</span><span style="font-size:11.0px">) → 16× harder to twist​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line memory:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Small increase in wire thickness → huge increase in bending and twisting stiffness (r</span><span style="font-size:11.0px">⁴</span><span style="font-weight:700;font-size:11.0px">). </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:14.0px">One-line summary  </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> E (modulus) = stiffness (how much it bends). </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Base metals (Co–Cr, Ni–Cr) are very stiff; gold/noble alloys are less stiff → need </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">more bulk for the same rigidity. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Orthodontic wires:</span><span style="font-size:11.0px"> Stainless steel</span><span style="font-weight:700;font-size:11.0px"> stiff</span><span style="font-size:11.0px">, TMA</span><span style="font-weight:700;font-size:11.0px"> medium</span><span style="font-size:11.0px">, NiTi </span><span style="font-weight:700;font-size:11.0px">low stiffness but high </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">springback</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Wire thickness rule:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">bending stiffness </span><span style="font-size:11.0px">∝</span><span style="font-weight:700;font-size:11.0px"> r</span><span style="font-size:11.0px">⁴</span><span style="font-size:11.0px"> → small increase in radius makes wire </span></div>
<div class="line"><span style="font-size:11.0px">much stiffer. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:16.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:16.0px">2)Resilience (elastic energy storage) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The </span><span style="font-weight:700;font-size:11.0px">energy a material can absorb and store in the elastic range</span><span style="font-size:11.0px"> (i.e., </span><span style="font-weight:700;font-size:11.0px">without </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">permanent deformation) and then release when the load is removed. </span></div>
</div>
<div class="page" data-page="11">
<div class="line"><span style="font-size:14.0px">Where on the stress–strain curve: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Resilience = area under the curve in the elastic region only​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Practically: </span><span style="font-weight:700;font-size:11.0px">up to the yield point / elastic limit​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ This is the “blue shaded area” in many diagrams.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Meaning (simple):​</span></div>
<div class="line"><span style="font-size:11.0px"> It is the </span><span style="font-weight:700;font-size:11.0px">energy absorbed before permanent deformation begins</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">So is it “energy required to permanently bend something”?​</span></div>
<div class="line"><span style="font-size:11.0px"> Not exactly. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Resilience = energy absorbed up to the start of permanent bending (yield). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">how much energy a material can absorb and still be “unaffected” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Energy that can absorbed and return or its original position </span><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical example: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Mouthguards</span><span style="font-size:11.0px">: need high </span><span style="font-weight:700;font-size:11.0px">resilience</span><span style="font-size:11.0px"> so they can absorb impact and spring back (no </span></div>
<div class="line"><span style="font-size:11.0px">permanent deformation). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Orthodontic wire examples (Resilience / “springback”)  </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> NiTi (Nickel–Titanium) — early alignment​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Very high springback / high resilience​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​ Can be deflected a lot in crowded teeth and still returns​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​ Gives </span><span style="font-weight:700;font-size:11.0px">light, more constant forces</span><span style="font-size:11.0px"> over a long activation range​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> TMA / Beta-titanium — mid-stage, loops &amp; bends​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Moderate springback</span><span style="font-size:11.0px"> (between NiTi and stainless steel)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​ Easier to bend than NiTi, good for </span><span style="font-weight:700;font-size:11.0px">loops and adjustments​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
</div>
<div class="page" data-page="12">
<div class="line"><span style="font-size:11.0px">○​ Useful when you want flexibility + ability to customize​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Stainless steel — working/finishing​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> High stiffness (high modulus)</span><span style="font-size:11.0px"> → less deflection​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​</span><span style="font-weight:700;font-size:11.0px"> Lower springback than NiTi​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">○​ Best for </span><span style="font-weight:700;font-size:11.0px">control, detailing, sliding mechanics</span><span style="font-size:11.0px">, and maintaining arch form​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line memory:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">NiTi = maximum springback</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">TMA = workable + moderate springback</span><span style="font-size:11.0px"> → </span><span style="font-weight:700;font-size:11.0px">Stainless steel </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">= stiff control,</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line memory:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Resilience = elastic energy before yield.​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 12]</div>
</div>
<div class="page" data-page="13">
<div class="line"><span style="font-weight:700;font-size:16.0px">Plastic Region (The &quot;Dent&quot; Zone): </span></div>
<div class="line"><span style="font-weight:700;font-size:15.0px">3)Yield Strength (σy) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The </span><span style="font-weight:700;font-size:11.0px">amount of stress required to start permanent (plastic) deformation</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Yield Strength:</span><span style="font-size:11.0px"> The exact point where the material stops springing back and </span></div>
<div class="line"><span style="font-size:11.0px">permanently deforms. If a bridge passes this point, it is ruined. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Why we use “0.2% yield strength” (proof stress)​</span></div>
<div class="line"><span style="font-size:11.0px"> Plastic deformation (permanent strain) starts gradually in many metals, so there isn’t always a </span></div>
<div class="line"><span style="font-size:11.0px">sharp, obvious “yield point” on the stress–strain curve. Also, the first tiny amount of permanent </span></div>
<div class="line"><span style="font-size:11.0px">strain is hard to detect directly. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">So we define a measurable standard: 0.2% yield strength (0.2% proof stress). </span></div>
<div class="line"><span style="font-size:11.0px">●​ It is the </span><span style="font-weight:700;font-size:11.0px">stress required to produce 0.2% permanent (plastic) strain</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> 0.2% strain = 0.002</span><span style="font-size:11.0px"> (as a decimal).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Method (conceptually): draw a line </span><span style="font-weight:700;font-size:11.0px">parallel to the elastic slope</span><span style="font-size:11.0px">, but shifted to start at </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">0.2% strain</span><span style="font-size:11.0px"> on the x-axis; where it meets the curve is the </span><span style="font-weight:700;font-size:11.0px">0.2% yield strength</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Meaning:​</span></div>
<div class="line"><span style="font-size:11.0px"> At stresses </span><span style="font-weight:700;font-size:11.0px">below</span><span style="font-size:11.0px"> this value → deformation is mostly elastic (material springs back).​</span></div>
<div class="line"><span style="font-size:11.0px"> At stresses </span><span style="font-weight:700;font-size:11.0px">at/above</span><span style="font-size:11.0px"> this value → the material has </span><span style="font-weight:700;font-size:11.0px">measurable permanent deformation</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical link:​</span></div>
<div class="line"><span style="font-size:11.0px"> If a bridge/framework is stressed beyond its yield strength (especially the 0.2% proof value), it </span></div>
<div class="line"><span style="font-size:11.0px">can become </span><span style="font-weight:700;font-size:11.0px">permanently distorted</span><span style="font-size:11.0px"> → misfit, open margins, occlusal issues. </span></div>
<div class="line"><span style="font-size:11.0px">If a material has low yield strength meaning less strength is required to bend it  </span></div>
<div class="line"><span style="font-size:11.0px">It tells how easily it bends do not confuse with modulus of elasticity which is how much it bends  </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Important distinction (so you don’t mix terms): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Yield strength (σy)</span><span style="font-size:11.0px"> tells you </span><span style="font-weight:700;font-size:11.0px">how easily it permanently bends</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Modulus (E)</span><span style="font-size:11.0px"> tells you </span><span style="font-weight:700;font-size:11.0px">how much it elastically bends</span><span style="font-size:11.0px"> before permanent change.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
</div>
<div class="page" data-page="14">
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line example:​</span></div>
<div class="line"><span style="font-size:11.0px"> A wire with </span><span style="font-weight:700;font-size:11.0px">low yield strength</span><span style="font-size:11.0px"> will </span><span style="font-weight:700;font-size:11.0px">get permanently bent</span><span style="font-size:11.0px"> with a smaller load compared to a </span></div>
<div class="line"><span style="font-size:11.0px">wire with high yield strength. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Why not call it “plastic deformation”? </span></div>
<div class="line"><span style="font-size:11.0px">Because plastic deformation is the </span><span style="font-weight:700;font-size:11.0px">result</span><span style="font-size:11.0px"> (how much permanent strain occurred), while yield </span></div>
<div class="line"><span style="font-size:11.0px">strength is the </span><span style="font-weight:700;font-size:11.0px">cause threshold</span><span style="font-size:11.0px"> (how much stress is needed to cause a standard amount of </span></div>
<div class="line"><span style="font-size:11.0px">permanent strain). </span></div>
<div class="line"><span style="font-size:11.0px">Because the exact start of plastic deformation can be unclear, we use the yield strength (often </span></div>
<div class="line"><span style="font-size:11.0px">0.2% proof stress) to define the onset of plastic deformation on the stress–strain curve.” </span></div>
<div class="line"><span style="font-size:11.0px">Clinically we want every material to have a very large yield point so that it is very hard to ruin it </span></div>
<div class="line"><span style="font-size:11.0px">or deform it  </span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">In most clinical situations, higher yield strength is “safer”</span><span style="font-size:11.0px"> because it means the material is </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">harder to permanently bend or distort</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Why higher yield strength is usually better: </span></div>
<div class="line"><span style="font-size:11.0px">●​ Needs </span><span style="font-weight:700;font-size:11.0px">more stress</span><span style="font-size:11.0px"> before permanent deformation starts​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Maintains </span><span style="font-weight:700;font-size:11.0px">fit, margins, occlusion, and appliance shape</span><span style="font-size:11.0px"> under chewing/handling </span></div>
<div class="line"><span style="font-size:11.0px">forces​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Reduces risk of </span><span style="font-weight:700;font-size:11.0px">distortion</span><span style="font-size:11.0px"> in frameworks and wires​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Where this matters most (high priority): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Bridges / PFM frameworks / RPD frameworks​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Implant bars/frameworks​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Working/finishing orthodontic wires (stainless steel)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">But the correct exam line is:​</span></div>
<div class="line"><span style="font-size:11.0px"> “Higher yield strength is generally preferred, </span><span style="font-weight:700;font-size:11.0px">provided other required properties are also met</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">(e.g., stiffness/modulus, toughness, corrosion resistance, workability).” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line memory:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Higher yield strength = harder to permanently bend = more clinically durable shape </span></div>
</div>
<div class="page" data-page="15">
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:14.0px">UTS (Ultimate Tensile Strength) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The </span><span style="font-weight:700;font-size:11.0px">maximum stress</span><span style="font-size:11.0px"> a material can withstand in tension before it starts to fail.​</span></div>
<div class="line"><span style="font-size:11.0px"> On a stress–strain curve, it is the </span><span style="font-weight:700;font-size:11.0px">highest point (peak)</span><span style="font-size:11.0px"> of the curve. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">What happens after UTS (metals): </span></div>
<div class="line"><span style="font-size:11.0px">●​ After reaching UTS, the material begins </span><span style="font-weight:700;font-size:11.0px">necking</span><span style="font-size:11.0px"> (local thinning).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Then the stress the sample can carry </span><span style="font-weight:700;font-size:11.0px">drops</span><span style="font-size:11.0px"> until </span><span style="font-weight:700;font-size:11.0px">fracture</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">The </span><span style="font-weight:700;font-size:11.0px">maximum tensile stress</span><span style="font-size:11.0px"> a material can withstand before </span><span style="font-weight:700;font-size:11.0px">fracture</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical meaning (dentistry): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> High UTS = the material can withstand higher tensile stress before it fractures.</span><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Relevant for: </span><span style="font-weight:700;font-size:11.0px">bridges/frameworks, orthodontic wires, cast/forged metals</span><span style="font-size:11.0px">, and any </span></div>
<div class="line"><span style="font-size:11.0px">component under pulling/bending forces.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Remember: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Yield strength</span><span style="font-size:11.0px"> = stress where </span><span style="font-weight:700;font-size:11.0px">permanent bending starts​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> UTS</span><span style="font-size:11.0px"> = stress where the material reaches its </span><span style="font-weight:700;font-size:11.0px">maximum strength</span><span style="font-size:11.0px"> before necking/fracture </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> Toughness is the </span><span style="font-weight:700;font-size:11.0px">total energy a material absorbs before it fractures</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">On the stress–strain curve:</span><span style="font-size:11.0px"> it is the </span><span style="font-weight:700;font-size:11.0px">total area under the entire curve</span><span style="font-size:11.0px"> (elastic + plastic parts) </span></div>
<div class="line"><span style="font-size:11.0px">up to fracture. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Meaning (simple):​</span></div>
<div class="line"><span style="font-size:11.0px"> “The total amount of energy required to break something.” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Do NOT confuse with fracture toughness: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Toughness</span><span style="font-size:11.0px"> = overall energy absorption until fracture (bulk behavior).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Fracture toughness</span><span style="font-size:11.0px"> = </span><span style="font-weight:700;font-size:11.0px">resistance to crack propagation</span><span style="font-size:11.0px"> (behavior when a crack/defect </span></div>
<div class="line"><span style="font-size:11.0px">is present).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
</div>
<div class="page" data-page="16">
<div class="line"><span style="font-weight:700;font-size:11.0px">Examples (dentistry): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Zirconia:</span><span style="font-size:11.0px"> relatively </span><span style="font-weight:700;font-size:11.0px">tough for a ceramic</span><span style="font-size:11.0px"> (more crack-resistant, harder to break than </span></div>
<div class="line"><span style="font-size:11.0px">many ceramics).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Porcelain:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">brittle</span><span style="font-size:11.0px"> (low energy absorption; tends to crack/shatter suddenly).</span><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:14.0px">Fracture Toughness (KIC) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:​</span></div>
<div class="line"><span style="font-size:11.0px"> Fracture toughness is a material’s </span><span style="font-weight:700;font-size:11.0px">resistance to crack growth (crack propagation)</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> It tells you </span><span style="font-weight:700;font-size:11.0px">how hard it is for an existing crack to spread</span><span style="font-size:11.0px"> and cause sudden failure. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Why it matters:​</span></div>
<div class="line"><span style="font-size:11.0px"> In real life, materials often contain </span><span style="font-weight:700;font-size:11.0px">tiny flaws or microcracks</span><span style="font-size:11.0px">. A material can have high </span></div>
<div class="line"><span style="font-size:11.0px">strength, but if its fracture toughness is low, a small crack can rapidly grow and the material can </span></div>
<div class="line"><span style="font-size:11.0px">fracture catastrophically. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">How to think of it (simple): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> High fracture toughness:</span><span style="font-size:11.0px"> cracks tend to </span><span style="font-weight:700;font-size:11.0px">stop or grow slowly</span><span style="font-size:11.0px"> → more </span></div>
<div class="line"><span style="font-size:11.0px">damage-tolerant​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Low fracture toughness:</span><span style="font-size:11.0px"> cracks </span><span style="font-weight:700;font-size:11.0px">run fast</span><span style="font-size:11.0px"> → brittle, sudden fracture </span></div>
<div class="line"><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 16]</div>
</div>
<div class="page" data-page="17">
<div class="line"><span style="font-weight:700;font-size:11.0px">On a stress–strain curve:​</span></div>
<div class="line"><span style="font-size:11.0px"> Fracture toughness is </span><span style="font-weight:700;font-size:11.0px">not</span><span style="font-size:11.0px"> the same as “area under the curve.” </span></div>
<div class="line"><span style="font-size:11.0px">●​ Area under curve = </span><span style="font-weight:700;font-size:11.0px">toughness (energy to fracture)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Fracture toughness = </span><span style="font-weight:700;font-size:11.0px">crack resistance​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Units (common):</span><span style="font-size:11.0px"> MPa√m </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Dental relevance examples (conceptual): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Glass/porcelain:</span><span style="font-size:11.0px"> low fracture toughness → cracks spread easily​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Metals:</span><span style="font-size:11.0px"> high fracture toughness → cracks are less likely to run suddenly​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Zirconia:</span><span style="font-size:11.0px"> higher fracture toughness than many ceramics (crack resistance is </span></div>
<div class="line"><span style="font-size:11.0px">improved)(HOW in ceramic )​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line memory:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Fracture toughness = resistance to crack propagation. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">Other Mechanical Properties </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">1) Tensile Strength </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The maximum stress a material can withstand when being </span><span style="font-weight:700;font-size:11.0px">pulled</span><span style="font-size:11.0px"> before it fractures.​</span></div>
<div class="line"><span style="font-size:11.0px"> (Usually refers to </span><span style="font-weight:700;font-size:11.0px">UTS</span><span style="font-size:11.0px"> on the stress–strain curve.) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Example:</span><span style="font-size:11.0px"> Orthodontic wires must resist tensile/bending forces without breaking. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Even though amalgam is a metal, it is much stronger in compression than in tension. </span></div>
<div class="line"><span style="font-size:11.0px">So </span><span style="font-weight:700;font-size:11.0px">thin or unsupported margins/edges</span><span style="font-size:11.0px"> are prone to </span><span style="font-weight:700;font-size:11.0px">fracture</span><span style="font-size:11.0px">, which is why amalgam </span></div>
<div class="line"><span style="font-size:11.0px">restorations need </span><span style="font-weight:700;font-size:11.0px">adequate bulk minimum of 1.5 mm</span><span style="font-size:11.0px"> and </span><span style="font-weight:700;font-size:11.0px">well-supported cavity design</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">Dental ceramics and enamel are strong in compression but</span><span style="font-weight:700;font-size:11.0px"> weak in tension. </span></div>
</div>
<div class="page" data-page="18">
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Typically brittle materials are weak in tensile strength but strong in compression </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">reasoning in ceramics  </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">2) Compressive Strength </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The maximum stress a material can withstand when being </span><span style="font-weight:700;font-size:11.0px">compressed </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">(pushed/squeezed)</span><span style="font-size:11.0px"> before it crushes or fails. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Example:</span><span style="font-size:11.0px"> Dental ceramics and enamel perform well under compression. </span></div>
<div class="line"><span style="font-size:11.0px">Amalgam is </span><span style="font-weight:700;font-size:11.0px">strong in compression but weaker in tension</span><span style="font-size:11.0px"> (so thin edges can fracture if </span></div>
<div class="line"><span style="font-size:11.0px">unsupported). </span></div>
<div class="line"><span style="font-size:11.0px">Most materials are </span><span style="font-weight:700;font-size:11.0px">stronger in compression than in tension</span><span style="font-size:11.0px">, because </span><span style="font-weight:700;font-size:11.0px">tensile forces open </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">cracks/defects</span><span style="font-size:11.0px">, while compression tends to </span><span style="font-weight:700;font-size:11.0px">close them</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-size:11.0px">Metals are stronger in both  </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">3) Impact Strength </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 18]</div>
</div>
<div class="page" data-page="19">
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The ability of a material to </span><span style="font-weight:700;font-size:11.0px">absorb sudden shock/impact energy</span><span style="font-size:11.0px"> without fracturing.​</span></div>
<div class="line"><span style="font-size:11.0px"> (Related to toughness under rapid loading.) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Impact Strength (examples) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Mouthguards</span><span style="font-size:11.0px"> should have </span><span style="font-weight:700;font-size:11.0px">high impact strength</span><span style="font-size:11.0px"> so they can absorb sudden blows </span></div>
<div class="line"><span style="font-size:11.0px">without cracking. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> For restorations Impact strength (shock resistance) tends to be:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Resin composite &gt; Amalgam &gt; Glass ionomer cement (GIC)​</span></div>
<div class="line"><span style="font-style:italic;font-size:11.0px"> </span><span style="font-weight:700;font-size:13.0px">Why </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Composite (higher impact strength):</span><span style="font-size:11.0px"> polymer resin matrix can </span><span style="font-weight:700;font-size:11.0px">absorb and dissipate </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">energy</span><span style="font-size:11.0px">, and crack growth is slowed by fillers/resin bonding → less “shattering.”​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Amalgam (lower impact strength than composite):</span><span style="font-size:11.0px"> it’s relatively </span><span style="font-weight:700;font-size:11.0px">brittle in tension</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">with limited ability to absorb sudden energy → thin/unsupported parts can chip/fracture.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> GIC (low impact strength):</span><span style="font-size:11.0px"> more </span><span style="font-weight:700;font-size:11.0px">brittle</span><span style="font-size:11.0px"> (glass + ionic matrix) → cracks propagate </span></div>
<div class="line"><span style="font-size:11.0px">easily, so it fractures with sudden удар/shock.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">One-line note:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Composite = more shock-resistant; Amalgam and GIC = more brittle (especially GIC</span><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Low impact strength materials (brittle) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Dental ceramics</span><span style="font-size:11.0px"> have </span><span style="font-weight:700;font-size:11.0px">low impact strength</span><span style="font-size:11.0px"> → they can </span><span style="font-weight:700;font-size:11.0px">chip or fracture</span><span style="font-size:11.0px"> if dropped or </span></div>
<div class="line"><span style="font-size:11.0px">struck.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Denture base acrylic (PMMA)</span><span style="font-size:11.0px"> has </span><span style="font-weight:700;font-size:11.0px">lower impact strength than mouthguard </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">materials</span><span style="font-size:11.0px">, so dentures can </span><span style="font-weight:700;font-size:11.0px">fracture if dropped</span><span style="font-size:11.0px">, especially on hard surfaces. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Impact strength tells us whether a material will break or not when a large amount of </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">energy is applied very quickly.” </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Simple comparison (for memory) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">●​ Toughness:​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">​</span></div>
</div>
<div class="page" data-page="20">
<div class="line"><span style="font-weight:700;font-size:11.0px"> “Total energy to break it (slow or fast).”​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">●​ Impact strength:​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> “How well it survives a sudden blow.” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">When we try to break something like a stick or something we try to do in in a fast jerk if </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">we do it slowly it dosent break as smoothly  </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">4) Ductility </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The ability of a material to undergo </span><span style="font-weight:700;font-size:11.0px">plastic deformation in tension</span><span style="font-size:11.0px"> (can be drawn </span></div>
<div class="line"><span style="font-size:11.0px">into wire) before fracture.​</span></div>
<div class="line"><span style="font-size:11.0px"> Measured by </span><span style="font-weight:700;font-size:11.0px">% elongation</span><span style="font-size:11.0px"> or </span><span style="font-weight:700;font-size:11.0px">reduction in area</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Example:</span><span style="font-size:11.0px"> Metals used for wires and bending procedures need good ductility. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Gold</span><span style="font-size:11.0px"> — especially </span><span style="font-weight:700;font-size:11.0px">pure/annealed gold (gold foil)</span><span style="font-size:11.0px"> — is considered the </span><span style="font-weight:700;font-size:11.0px">most ductile dental </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">material</span><span style="font-size:11.0px"> (can be stretched/drawn without breaking). </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">How we measure it: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> % elongation</span><span style="font-size:11.0px"> (how much it lengthens before breaking)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> % reduction in area​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Simple meaning :​</span></div>
<div class="line"><span style="font-size:11.0px"> “How much a wire can be stretched (permanently) before it breaks.” </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Important note:​</span></div>
<div class="line"><span style="font-size:11.0px"> This is about </span><span style="font-weight:700;font-size:11.0px">plastic stretch before fracture</span><span style="font-size:11.0px">, not just elastic stretch. </span></div>
<div class="line"><span style="font-size:11.0px">This is pulling force  </span></div>
</div>
<div class="page" data-page="21">
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">5) Malleability </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:</span><span style="font-size:11.0px"> The ability of a material to undergo </span><span style="font-weight:700;font-size:11.0px">plastic deformation in compression</span><span style="font-size:11.0px"> (can be </span></div>
<div class="line"><span style="font-size:11.0px">hammered/rolled into sheets) without cracking. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Example:</span><span style="font-size:11.0px"> Gold is the most ductile and  highly malleable (can be made into thin foils/sheets). </span></div>
<div class="line"><span style="font-size:11.0px">This is pushing force or compression force </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 21]</div>
</div>
<div class="page" data-page="22">
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:14.0px">6) </span><span style="font-weight:700;font-size:14.0px">Brittleness</span><span style="font-size:14.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Definition:​</span></div>
<div class="line"><span style="font-size:11.0px"> Brittleness is the tendency of a material to </span><span style="font-weight:700;font-size:11.0px">fracture suddenly with little or no plastic </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">deformation</span><span style="font-size:11.0px">. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Simple meaning:​</span></div>
<div class="line"><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">“It breaks without bending.”glass like  </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">On the stress–strain curve: </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Very small plastic region</span><span style="font-size:11.0px"> (almost no “dent zone”)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Low strain at fracture​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Low toughness</span><span style="font-size:11.0px"> (small area under curve)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 22]</div>
</div>
<div class="page" data-page="23">
<div class="line"><span style="font-weight:700;font-size:11.0px">Related properties: </span></div>
<div class="line"><span style="font-size:11.0px">●​ Brittle materials usually have </span><span style="font-weight:700;font-size:11.0px">low fracture toughness</span><span style="font-size:11.0px"> (cracks spread easily).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Brittle ≠ soft. A material can be </span><span style="font-weight:700;font-size:11.0px">hard but brittle</span><span style="font-size:11.0px"> (e.g., ceramics).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Dental examples (brittle): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Porcelain / dental ceramics​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Enamel</span><span style="font-size:11.0px"> (brittle compared to dentin)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Glass ionomer cement (GIC)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Denture porcelain teeth</span><span style="font-size:11.0px"> (more brittle than resin teeth)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Less brittle (more ductile/energy-absorbing): </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Metals</span><span style="font-size:11.0px"> (gold alloys, stainless steel, Co–Cr, Ni–Cr)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Resin composites</span><span style="font-size:11.0px"> (generally tougher than ceramics)​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Clinical importance:​</span></div>
<div class="line"><span style="font-size:11.0px"> Brittle materials should not be left </span><span style="font-weight:700;font-size:11.0px">thin or unsupported</span><span style="font-size:11.0px"> → they crack/chip easily.​</span></div>
<div class="line"><span style="font-size:11.0px"> So we use: </span><span style="font-weight:700;font-size:11.0px">adequate thickness + rounded internal line angles + good support</span><span style="font-size:11.0px"> (avoid </span></div>
<div class="line"><span style="font-size:11.0px">sharp corners/stress concentration). </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Brittleness — Clinical Summary (Margin Design) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Core rule:</span><span style="font-size:11.0px"> Brittle materials fracture if they are </span><span style="font-weight:700;font-size:11.0px">thin</span><span style="font-size:11.0px"> or </span><span style="font-weight:700;font-size:11.0px">unsupported</span><span style="font-size:11.0px"> → they need </span><span style="font-weight:700;font-size:11.0px">bulk and </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">support</span><span style="font-size:11.0px"> at margins. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">1) Amalgam (low edge strength) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Problem:</span><span style="font-size:11.0px"> Thin amalgam margins snap.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Result:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Marginal fracture/ditching</span><span style="font-size:11.0px"> → leakage + recurrent caries.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Margin design:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">90° butt joint</span><span style="font-size:11.0px">; </span><span style="font-weight:700;font-size:11.0px">no bevels</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">2) Porcelain / ceramics (low fracture toughness) </span></div>
</div>
<div class="page" data-page="24">
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Problem:</span><span style="font-size:11.0px"> Cracks propagate easily, especially in thin areas.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Result:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Chipping or catastrophic fracture</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Margin design:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">Shoulder / heavy chamfer</span><span style="font-size:11.0px"> + </span><span style="font-weight:700;font-size:11.0px">adequate thickness</span><span style="font-size:11.0px"> (avoid feather </span></div>
<div class="line"><span style="font-size:11.0px">edges). </span></div>
<div class="line"><span style="font-size:11.0px">●​</span></div>
<div class="line"><span style="font-size:11.0px">​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">3) Unsupported enamel </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Problem:</span><span style="font-size:11.0px"> Enamel is brittle without dentin support.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Result:</span><span style="font-size:11.0px"> Margin fractures under chewing.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Fix:</span><span style="font-size:11.0px"> Remove </span><span style="font-weight:700;font-size:11.0px">unsupported enamel rods</span><span style="font-size:11.0px">.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Quick comparison </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Amalgam:</span><span style="font-size:11.0px"> brittle → </span><span style="font-weight:700;font-size:11.0px">butt joint</span><span style="font-size:11.0px"> (no bevel).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Porcelain:</span><span style="font-size:11.0px"> brittle → </span><span style="font-weight:700;font-size:11.0px">shoulder/heavy chamfer</span><span style="font-size:11.0px"> (bulk).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Gold:</span><span style="font-size:11.0px"> ductile → </span><span style="font-weight:700;font-size:11.0px">bevel/feather</span><span style="font-size:11.0px"> (can thin + burnish). </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 24]</div>
</div>
<div class="page" data-page="25">
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:14.0px">7)Hardness: </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Hardness = surface scratch/indentation resistance.</span><span style="font-size:11.0px">  </span></div>
<div class="line"><span style="font-size:11.0px">Clinically, it mainly tells you </span><span style="font-weight:700;font-size:11.0px">(1) how fast the restoration itself wears</span><span style="font-size:11.0px"> and </span><span style="font-weight:700;font-size:11.0px">(2) how much it </span></div>
<div class="line"><span style="font-weight:700;font-style:italic;font-size:11.0px">might</span><span style="font-weight:700;font-size:11.0px"> wear the opposing surface</span><span style="font-size:11.0px"> — but </span><span style="font-weight:700;font-size:11.0px">opposing-tooth wear depends MORE on surface </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">roughness/polish than hardness alone. </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">What hardness </span><span style="font-weight:700;font-style:italic;font-size:17.0px">correlates with</span><span style="font-weight:700;font-size:17.0px"> (clinically useful) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Higher hardness → better self–wear resistance​</span></div>
<div class="line"><span style="font-size:11.0px">(keeps anatomy/occlusion longer; less scratching) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Higher hardness → harder to finish/adjust/polish​</span></div>
<div class="line"><span style="font-size:11.0px">(more bur time, more heat, more difficulty getting a smooth surface) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Higher hardness + rough surface → more antagonist wear</span><span style="font-size:11.0px"> (enamel gets abraded) </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">What hardness does </span><span style="font-weight:700;font-style:italic;font-size:17.0px">NOT</span><span style="font-weight:700;font-size:17.0px"> guarantee </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Hard ≠ automatically more abrasive.​</span></div>
<div class="line"><span style="font-size:11.0px">A </span><span style="font-weight:700;font-size:11.0px">high-hardness but well-polished</span><span style="font-size:11.0px"> surface can be gentle, while a </span><span style="font-weight:700;font-size:11.0px">less-hard but </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">rough</span><span style="font-size:11.0px"> surface can still abrade. </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Hardness ≠ strength.​</span></div>
<div class="line"><span style="font-size:11.0px">Strength = load before fracture/bending; hardness = surface resistance. </span></div>
<div class="image-placeholder">[IMAGE PLACEHOLDER: page 25]</div>
</div>
<div class="page" data-page="26">
<div class="line"><span style="font-weight:700;font-size:17.0px">“Different materials” — how hardness plays out </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">clinically </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Very hard / hard surfaces </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Ceramics (porcelain) and zirconia </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Self-wear:</span><span style="font-size:11.0px"> very low (they stay shiny/anatomic) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Opposing enamel:</span><span style="font-size:11.0px"> can be </span><span style="font-weight:700;font-size:11.0px">high wear if rough</span><span style="font-size:11.0px"> (after adjustment or if glaze is removed) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Clinical key:</span><span style="font-size:11.0px"> </span><span style="font-weight:700;font-size:11.0px">polish matters more than glaze</span><span style="font-size:11.0px"> for antagonist friendliness; rough </span></div>
<div class="line"><span style="font-size:11.0px">ceramic is the enemy. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Porcelain denture teeth </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Harder</span><span style="font-size:11.0px"> → keep cusps (good self-wear resistance) </span></div>
<div class="line"><span style="font-size:11.0px">●​ Can be </span><span style="font-weight:700;font-size:11.0px">more abrasive</span><span style="font-size:11.0px"> to opposing natural teeth if occlusion/polish isn’t ideal. </span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Natural tooth reference </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Enamel </span></div>
<div class="line"><span style="font-size:11.0px">●​ Hard, but can still wear if the opposing surface is rough/harder and unpolished. </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Medium hardness (varies) </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Composites </span></div>
<div class="line"><span style="font-size:11.0px">●​ Usually </span><span style="font-weight:700;font-size:11.0px">wear more than ceramics</span><span style="font-size:11.0px"> (can lose occlusal anatomy over time) </span></div>
<div class="line"><span style="font-size:11.0px">●​ Often </span><span style="font-weight:700;font-size:11.0px">kinder to opposing enamel</span><span style="font-size:11.0px"> than rough ceramics because they’re less hard and </span></div>
<div class="line"><span style="font-size:11.0px">can be polished smoothly. </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Amalgam </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Good in compression</span><span style="font-size:11.0px">, but surface can wear/ditch over time compared to ceramics </span></div>
<div class="line"><span style="font-size:11.0px">●​ Generally </span><span style="font-weight:700;font-size:11.0px">less abrasive to opposing enamel</span><span style="font-size:11.0px"> than rough ceramics (again: surface + </span></div>
<div class="line"><span style="font-size:11.0px">microstructure matter). </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Lower hardness </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Gold / high noble </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Softer</span><span style="font-size:11.0px"> → can wear a bit, but tends to be </span><span style="font-weight:700;font-size:11.0px">“kind” to opposing enamel </span></div>
<div class="line"><span style="font-size:11.0px">●​ Great when you want a restoration that doesn’t act like sandpaper. </span></div>
</div>
<div class="page" data-page="27">
<div class="line"><span style="font-weight:700;font-size:11.0px">Acrylic denture teeth (PMMA) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Low hardness</span><span style="font-size:11.0px"> → wears faster (flat cusps over time) </span></div>
<div class="line"><span style="font-size:11.0px">●​ Usually </span><span style="font-weight:700;font-size:11.0px">gentler</span><span style="font-size:11.0px"> on opposing teeth than porcelain denture teeth. </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">Base-metal alloys (Co–Cr, Ni–Cr): hardness correlation + </span></div>
<div class="line"><span style="font-weight:700;font-size:17.0px">clinical relevance </span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px">Hardness level:</span><span style="font-size:11.0px"> generally </span><span style="font-weight:700;font-size:11.0px">high</span><span style="font-size:11.0px"> (harder than noble gold alloys, often harder than many </span></div>
<div class="line"><span style="font-size:11.0px">restorative metals). </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">What that means clinically </span></div>
<div class="line"><span style="font-size:11.0px">1.​</span><span style="font-weight:700;font-size:11.0px"> They resist scratching and surface wear (self-wear)​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Co–Cr / Ni–Cr surfaces don’t get scratched easily → durable metal surface.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Useful where you want the metal surface to stay intact (e.g., metal components </span></div>
<div class="line"><span style="font-size:11.0px">rubbing/contacts).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">2.​</span><span style="font-weight:700;font-size:11.0px"> They are harder to adjust, finish, and polish​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Chairside: more difficult to cut/shape; burs wear faster; takes longer to get a smooth </span></div>
<div class="line"><span style="font-size:11.0px">polish.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ Lab: finishing and polishing is more demanding than gold.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">3.​</span><span style="font-weight:700;font-size:11.0px"> Opposing tooth wear​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ A </span><span style="font-weight:700;font-size:11.0px">high-hardness metal</span><span style="font-size:11.0px"> can contribute to wear of the opposing surface </span><span style="font-weight:700;font-size:11.0px">if left rough</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">(after adjustment).​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​ But metals (including base metals) are usually </span><span style="font-weight:700;font-size:11.0px">less abrasive than rough ceramics</span><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">because polished metal can be very smooth.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Clinical key:</span><span style="font-size:11.0px"> after adjusting Co–Cr/Ni–Cr, </span><span style="font-weight:700;font-size:11.0px">polish it properly</span><span style="font-size:11.0px"> to reduce antagonist wear.​</span></div>
<div class="line"><span style="font-size:11.0px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.0px">Quick comparison line (exam-friendly) </span></div>
<div class="line"><span style="font-size:11.0px">●​</span><span style="font-weight:700;font-size:11.0px"> Ceramic hardness + roughness → highest risk of opposing enamel wear.​</span></div>
<div class="line"><span style="font-weight:700;font-size:11.0px"> </span></div>
</div>
<div class="page" data-page="28">
<div class="line"><span style="font-size:8.940239906311035px">●​</span><span style="font-weight:700;font-size:8.940239906311035px"> Base-metal alloys are hard, but when well polished they are usually relatively </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">“enamel-friendly.”​</span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​</span><span style="font-weight:700;font-size:8.940239906311035px"> Gold is softer and typically the most “kind” to opposing enamel (but may wear </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">itself more). </span></div>
<div class="line"><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:13.816733360290527px">The simplest clinical rule </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​ If it’s </span><span style="font-weight:700;font-size:8.940239906311035px">hard + rough</span><span style="font-size:8.940239906311035px"> → </span><span style="font-weight:700;font-size:8.940239906311035px">it will abrade the opposing tooth. </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​ If it’s </span><span style="font-weight:700;font-size:8.940239906311035px">hard + highly polished</span><span style="font-size:8.940239906311035px"> → </span><span style="font-weight:700;font-size:8.940239906311035px">much safer. </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​ If it’s </span><span style="font-weight:700;font-size:8.940239906311035px">soft</span><span style="font-size:8.940239906311035px"> → </span><span style="font-weight:700;font-size:8.940239906311035px">it may wear itself</span><span style="font-size:8.940239906311035px"> (lose anatomy), but is often kinder to the opposing tooth. </span></div>
<div class="line"><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:10.565738677978516px">B. The &quot;Confusables&quot; Table </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Concept A</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Concept B</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">The Difference</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Ductility</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Malleability</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Ductility</span><span style="font-size:8.940239906311035px"> = Pulling into a wire (Tension). </span><span style="font-weight:700;font-size:8.940239906311035px">Malleability</span><span style="font-size:8.940239906311035px"> = Hammering into a sheet (Compression). </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Most malleable dental material:</span><span style="font-size:8.940239906311035px"> </span><span style="font-weight:700;font-size:8.940239906311035px">Gold</span><span style="font-size:8.940239906311035px"> (especially </span><span style="font-weight:700;font-size:8.940239906311035px">pure/annealed gold</span><span style="font-size:8.940239906311035px">, e.g., gold foil). </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Memory line: </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​</span><span style="font-weight:700;font-size:8.940239906311035px"> Ductile = wire</span><span style="font-size:8.940239906311035px"> → Gold is best​</span></div>
<div class="line"><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-size:8.940239906311035px">●​</span><span style="font-weight:700;font-size:8.940239906311035px"> Malleable = sheet/foil</span><span style="font-size:8.940239906311035px"> → Gold is best </span></div>
<div class="line"><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Stress</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Strain</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Stress</span><span style="font-size:8.940239906311035px"> = The internal force (Pressure). </span><span style="font-weight:700;font-size:8.940239906311035px">Strain</span><span style="font-size:8.940239906311035px"> = The physical shape change (Deformation). </span></div>
</div>
<div class="page" data-page="29">
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Hardness</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Abrasion</span><span style="font-size:8.940239906311035px"> </span></div>
<div class="line"><span style="font-weight:700;font-size:8.940239906311035px">Hardness</span><span style="font-size:8.940239906311035px"> = Resistance to indentation. </span><span style="font-weight:700;font-size:8.940239906311035px">Abrasion</span><span style="font-size:8.940239906311035px"> = Resistance to rubbing/wear. A material can </span></div>
<div class="line"><span style="font-size:8.940239906311035px">be hard but still wear away (abrade) opposing teeth! </span></div>
<div class="line"><span style="font-size:8.940239906311035px"> </span></div>
</div>
</div>`;

export default mechanicalPropertiesHTML;
