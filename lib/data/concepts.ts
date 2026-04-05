import type { Concept } from '@/components/lessons/ConceptCard';

export const SECTION_CONCEPTS: Record<string, Concept[]> = {
  A: [
    {
      title: 'Voltage (V)',
      plain: 'Voltage is the "pressure" that pushes electric charge through a circuit. A higher voltage means more push.',
      analogy: 'Think of a water tower. The taller the tower, the more pressure at the tap. Voltage is that pressure — it\'s what drives current through your circuit.',
      formula: 'V = work / charge  (units: Volts = Joules / Coulombs)',
    },
    {
      title: 'Current (I)',
      plain: 'Current is the flow of electric charge — how many electrons are passing a point per second.',
      analogy: 'Like water flowing through a pipe. Current (I) is the flow rate — gallons per minute. More current = more electrons moving per second.',
      formula: 'I = charge / time  (units: Amperes = Coulombs / second)',
    },
    {
      title: "Ohm's Law",
      plain: 'The voltage across a resistor equals the current through it times its resistance. Increase resistance → need more voltage to push the same current.',
      analogy: 'Squeezing a garden hose narrows it (adds resistance). To keep the same water flow, you need more pressure from the tap. V = IR is exactly that relationship.',
      formula: 'V = I × R',
    },
    {
      title: "KVL — Kirchhoff's Voltage Law",
      plain: 'If you trace any closed loop in a circuit and add up all the voltage rises and drops, they sum to zero.',
      analogy: 'If you hike a trail that forms a loop, you end up back at the same altitude you started. The total elevation gain equals the total elevation loss. Voltages in a loop work the same way.',
      formula: 'Σ V_loop = 0',
    },
    {
      title: "KCL — Kirchhoff's Current Law",
      plain: 'All the current flowing into a junction must equal all the current flowing out. Charge can\'t pile up at a node.',
      analogy: 'Traffic at an intersection: the number of cars entering the intersection every minute must equal the number leaving. No cars can appear or disappear at the junction.',
      formula: 'Σ I_in = Σ I_out',
    },
    {
      title: 'Power',
      plain: 'Power is the rate at which energy is used or delivered. A resistor that absorbs more power gets hotter.',
      analogy: 'A bright light bulb uses more power than a dim one — it converts more electrical energy to heat and light every second.',
      formula: 'P = V × I = I²R = V²/R  (units: Watts)',
    },
  ],

  B: [
    {
      title: 'Node Voltage Method — The Big Idea',
      plain: 'Pick one node as ground (0V). Assign a voltage label to every other node. Write one KCL equation per unknown node. Solve the system.',
      analogy: 'Imagine a city where sea level = 0. Every neighborhood has an elevation. You can calculate the altitude difference between any two neighborhoods once you know each one\'s elevation above sea level.',
      formula: 'Label nodes V₁, V₂, … then write KCL at each',
    },
    {
      title: 'Writing a KCL Equation at a Node',
      plain: 'For each branch connected to the node, the current leaving = (V_node − V_other) / R. Sum all leaving currents = sum of current sources entering.',
      analogy: 'At a water junction, each pipe drains water based on the height difference (pressure difference) between the junction and wherever it connects. More height difference = more flow.',
      formula: '(V₁ − V₂)/R₁ + (V₁ − V₃)/R₂ = I_source',
    },
    {
      title: 'Supernode',
      plain: 'When a voltage source sits between two non-reference nodes, you can\'t write KCL normally. Instead, treat both nodes as one "supernode" and write KCL around the whole thing, plus use the voltage source as a constraint equation.',
      analogy: 'Two buildings connected by a bridge of known height difference. You can\'t calculate each building\'s height independently — you must use the known difference as a clue.',
      formula: 'V_a − V_b = V_source  (constraint)',
    },
    {
      title: 'Dependent Sources',
      plain: 'A dependent source produces a voltage or current that is controlled by another voltage or current elsewhere in the circuit. Treat it like a normal source, but express its value in terms of circuit variables.',
      analogy: 'A dimmer switch that brightens based on how loud the music is — its output depends on something else in the system.',
      formula: 'Express controlling variable in terms of node voltages',
    },
    {
      title: 'Op Amp — Virtual Short',
      plain: 'An ideal op amp has infinite gain, so its two input terminals are at (nearly) the same voltage. This "virtual short" lets you write node equations easily.',
      analogy: 'An op amp is like a thermostat that adjusts the heater output so perfectly that the room temperature always matches the setpoint — the difference between the two is essentially zero.',
      formula: 'V₊ = V₋  (ideal op amp)',
    },
  ],

  C: [
    {
      title: 'Why Phasors Exist',
      plain: 'AC circuits have voltages and currents that are sinusoidal. Adding and manipulating sinusoids with calculus is painful. Phasors convert the problem into complex number algebra — much easier.',
      analogy: 'Instead of tracking a spinning wheel\'s full motion frame by frame, you take one "snapshot" — the wheel\'s current angle and how fast it\'s spinning. That snapshot is the phasor. You do the math on the snapshot, then convert back.',
      formula: 'v(t) = V_m cos(ωt + φ)  ↔  V = V_m∠φ',
    },
    {
      title: 'Impedance (Z)',
      plain: 'Impedance is the AC version of resistance — it tells you how much a component opposes current at a given frequency. Unlike resistance, impedance is complex (has a real and imaginary part).',
      analogy: 'Resistance is a fixed bottleneck in a water pipe. Impedance is a bottleneck that changes size depending on how fast the water is pulsing. Capacitors and inductors are frequency-sensitive.',
      formula: 'Z_R = R,  Z_L = jωL,  Z_C = 1/(jωC)',
    },
    {
      title: 'Capacitors in AC',
      plain: 'A capacitor blocks DC but passes AC. At higher frequencies, it lets more current through (lower impedance). It causes current to lead voltage by 90°.',
      analogy: 'A capacitor is like a spring. It resists a sudden push (opposes voltage change), then releases. Fast oscillations (high frequency) barely phase it — it keeps up easily.',
      formula: 'Z_C = 1/(jωC)  →  |Z_C| = 1/(ωC)',
    },
    {
      title: 'Inductors in AC',
      plain: 'An inductor passes DC easily but opposes high-frequency AC. It causes voltage to lead current by 90°.',
      analogy: 'An inductor is like a flywheel. It resists sudden changes in speed (opposes current change). Fast back-and-forth motion is hard to sustain — the flywheel fights it.',
      formula: 'Z_L = jωL  →  |Z_L| = ωL',
    },
    {
      title: 'AC Power & Power Factor',
      plain: 'Real power (watts) is the power actually consumed. Reactive power (VAR) is stored and returned by L and C. Power factor = cos(θ) tells you how much of the apparent power is doing real work.',
      analogy: 'Lifting a box up a flight of stairs = real work. Swinging the box back and forth = reactive — effort spent but no net work done. Power factor is the fraction of your effort that actually moves the box upward.',
      formula: 'P = ½ V_m I_m cos(θ_v − θ_i),  PF = cos(θ)',
    },
  ],

  D: [
    {
      title: 'Thevenin Equivalent',
      plain: 'Any linear circuit with sources and resistors, viewed from two terminals, behaves exactly like a single voltage source (V_th) in series with a single resistor (R_th).',
      analogy: 'No matter how complex the power grid is — transformers, generators, miles of wire — the outlet in your wall looks like a simple voltage source + internal resistance. Thevenin lets you find that simplified model.',
      formula: 'V_th = open-circuit voltage at terminals',
    },
    {
      title: 'Finding R_th',
      plain: 'Turn off all independent sources (replace voltage sources with wires, current sources with open circuits). Then find the resistance seen looking into the terminals.',
      analogy: 'Imagine looking into a box of unknown electronics with a flashlight. If the box\'s batteries are removed, you can measure how much resistance the circuitry presents.',
      formula: 'R_th = V_oc / I_sc  (or by inspection with sources off)',
    },
    {
      title: 'Norton Equivalent',
      plain: 'Same idea as Thevenin, but represented as a current source (I_N) in parallel with R_N. Both models are equivalent — they describe the same circuit from the outside.',
      analogy: 'Two descriptions of the same road: "take the highway and merge onto Route 1" vs. "turn left at the light and merge at the intersection." Same destination, different map.',
      formula: 'I_N = I_sc,  R_N = R_th,  V_th = I_N × R_N',
    },
    {
      title: 'Maximum Power Transfer',
      plain: 'A load resistor receives maximum power from a source when R_load = R_th. At that point, exactly half the power is lost in R_th and half delivered to the load.',
      analogy: 'A rowing team works hardest when the oar resistance matches the rowers\' output. Too light and energy is wasted in speed; too heavy and they can\'t move. The sweet spot is matching.',
      formula: 'P_max = V_th² / (4 R_th)  when R_L = R_th',
    },
    {
      title: 'Superposition',
      plain: 'In a linear circuit, the response (voltage or current) due to multiple sources equals the sum of responses due to each source acting alone.',
      analogy: 'Two people pushing a shopping cart in different directions. To find the total motion, figure out where each person alone would push it, then add the effects.',
      formula: 'V_total = V due to source 1 + V due to source 2 + …',
    },
  ],

  F: [
    {
      title: 'First-Order Circuit — Big Picture',
      plain: 'A circuit with one capacitor (or one inductor) and resistors is first-order. After a switch flips, the voltage or current changes exponentially from its initial value to its final value.',
      analogy: 'A cup of hot coffee cooling in a room. It starts hot, cools quickly at first, then slower and slower as it approaches room temperature. That "exponential cooling" curve is exactly what happens in RC and RL circuits.',
      formula: 'x(t) = x(∞) + [x(0) − x(∞)] e^(−t/τ)',
    },
    {
      title: 'Time Constant (τ)',
      plain: 'τ controls how fast the circuit responds. After one τ, the circuit is 63% of the way to its final value. After 5τ, it\'s considered fully settled.',
      analogy: 'τ is like the snooze interval on an alarm. A small τ means the circuit responds quickly (short snooze). A large τ means it responds slowly. After 5 snoozes, the coffee is at room temperature.',
      formula: 'τ = RC  or  τ = L/R',
    },
    {
      title: 'Initial Value x(0⁺)',
      plain: 'The value of voltage or current at the instant just after the switch moves. Capacitor voltage and inductor current cannot jump instantaneously — they must be continuous.',
      analogy: 'You can\'t teleport. Your position just before and just after midnight is continuous, even if the date changes. Capacitor voltage is the same just before and just after a switch flips.',
      formula: 'V_C(0⁺) = V_C(0⁻),  I_L(0⁺) = I_L(0⁻)',
    },
    {
      title: 'Final Value x(∞)',
      plain: 'What the circuit settles to after a long time (at DC steady state). Capacitors act as open circuits at DC; inductors act as short circuits.',
      analogy: 'Once your coffee reaches room temperature, it stops changing. That\'s the final value. In a circuit, once all transients die out, the capacitor voltage stops changing — DC steady state.',
      formula: 'At DC: C = open circuit,  L = short circuit',
    },
    {
      title: 'Step-by-Step Solution Method',
      plain: '1. Find x(0): circuit state just before the switch. 2. Find x(∞): steady-state after switch. 3. Find τ: resistance seen by C or L with sources off. 4. Plug into the formula.',
      analogy: 'A GPS route: (1) where are you now? (2) where are you going? (3) how fast is traffic? Then calculate the path. Three inputs, one result.',
      formula: 'x(t) = x(∞) + [x(0) − x(∞)] e^(−t/τ)',
    },
  ],

  G: [
    {
      title: 'Second-Order Circuit — Big Picture',
      plain: 'Two energy-storage elements (e.g., one L and one C) produce a second-order differential equation. The response can oscillate, unlike first-order circuits.',
      analogy: 'A swing set. Push it once and it swings back and forth (oscillates). The interaction between gravity (restoring force) and momentum is what makes it second-order. L and C play those roles.',
      formula: 'd²x/dt² + 2α dx/dt + ω₀²x = constant',
    },
    {
      title: 'Characteristic Equation',
      plain: 'Plug in e^(st) and factor. The roots s₁ and s₂ determine the shape of the response.',
      analogy: 'Like solving "what gear ratio makes this bike efficient?" The characteristic equation gives you the natural frequencies — the circuit\'s built-in speeds.',
      formula: 's² + 2αs + ω₀² = 0  →  s = −α ± √(α²−ω₀²)',
    },
    {
      title: 'Overdamped Response',
      plain: 'When α > ω₀, there are two real roots. The response decays smoothly to zero — no oscillation.',
      analogy: 'A car door closing in thick oil. It moves slowly back to closed position without bouncing. Too much damping = no oscillation.',
      formula: 'x(t) = A₁e^(s₁t) + A₂e^(s₂t)  (s₁, s₂ real, negative)',
    },
    {
      title: 'Underdamped Response',
      plain: 'When α < ω₀, roots are complex. The response oscillates while decaying — like a bouncing spring.',
      analogy: 'A guitar string after being plucked. It vibrates (oscillates) and gradually quiets down. The oscillation frequency is ω_d; the decay rate is α.',
      formula: 'x(t) = e^(−αt)(A₁cos(ω_d t) + A₂sin(ω_d t))',
    },
    {
      title: 'Critically Damped',
      plain: 'When α = ω₀, there\'s one repeated root. The response returns to zero as fast as possible without oscillating.',
      analogy: 'A perfect car suspension — returns to level after a bump as fast as possible without bouncing. Engineers aim for this in many control systems.',
      formula: 'x(t) = (A₁ + A₂t)e^(−αt)',
    },
  ],

  H: [
    {
      title: 'Mesh Current Method — Big Picture',
      plain: 'Assign a circulating current (mesh current) to each independent loop. Write one KVL equation per mesh. Solve for the mesh currents, then find any branch current from them.',
      analogy: 'Think of traffic loops in a city grid. Each block has cars circulating around it. The flow on any given street is the sum (or difference) of the currents from adjacent loops that share that street.',
      formula: 'Assign I₁, I₂, … to each mesh, then write KVL',
    },
    {
      title: 'Writing a KVL Equation for a Mesh',
      plain: 'Trace the mesh loop. For each resistor, voltage drop = R × (mesh current − adjacent mesh current). Sum of drops = sum of voltage sources.',
      analogy: 'Balancing a shared bank account. Your spending on a shared credit card depends on your contribution minus your roommate\'s contribution for that shared expense.',
      formula: 'R₁I₁ − R₁₂I₂ = V_source  (for mesh 1)',
    },
    {
      title: 'Supermesh',
      plain: 'When a current source sits between two meshes, you can\'t write KVL directly (unknown voltage across a current source). Combine both meshes into a supermesh and add a constraint: I₁ − I₂ = I_source.',
      analogy: 'Two roommates sharing a car — you can\'t separately track each one\'s gas usage when they always drive together. Treat them as a unit and use the known rule (one drives twice as much) as a constraint.',
      formula: 'I₁ − I₂ = I_source  (constraint for supermesh)',
    },
    {
      title: 'Mesh vs. Nodal — When to Use Which',
      plain: 'Nodal works best when you have many current sources or need to find node voltages. Mesh works best when you have many voltage sources or need branch currents. Both give the same answers.',
      analogy: 'GPS vs. paper map. Both get you there. GPS (nodal) is easier when you know landmarks (voltages). A map (mesh) is easier when you\'re tracing roads (currents).',
      formula: 'Use mesh when # of mesh equations < # of node equations',
    },
  ],
};
