// --- Music Theory Engine: Leylazen & Hükm Style ---
// C#m Harmonic Minor / Phrygian vibes (C#m, D, E, F#m, G#, A, B, Bm)
const CHORDS = {
    'C#m': ['C#4', 'E4', 'G#4'],
    'C#': ['C#4', 'F4', 'G#4'],
    'D': ['D4', 'F#4', 'A4'],
    'Dm': ['D4', 'F4', 'A4'],
    'E': ['E4', 'G#4', 'B4'],
    'F#m': ['F#4', 'A4', 'C#5'],
    'F#': ['F#4', 'A#4', 'C#5'],
    'G#': ['G#4', 'C5', 'D#5'], // Dominant pull to C#m
    'A': ['A3', 'C#4', 'E4'],
    'B': ['B3', 'D#4', 'F#4'],
    'Bm': ['B3', 'D4', 'F#4'],
    'G': ['G3', 'B3', 'D4'],
    'Em': ['E3', 'G3', 'B3'],
    'G#m': ['G#3', 'B3', 'D#4'],
    'Gm': ['G3', 'Bb3', 'D4'],
    'Am': ['A3', 'C4', 'E4'],
    'F': ['F3', 'A3', 'C4'],
    'Bb': ['Bb3', 'D4', 'F4'],
    'Bbm': ['Bb3', 'Db4', 'F4'],
    'C': ['C4', 'E4', 'G4'],
    'Eb': ['Eb4', 'G4', 'Bb4'],
    'Ebm': ['Eb4', 'Gb4', 'Bb4'],
    'Cm': ['C4', 'Eb4', 'G4'],
    // New chords needed for extended scales
    'A#m': ['A#3', 'C#4', 'E#4'], // enharmonic Bbm
    'D#m': ['D#4', 'F#4', 'A#4'], // enharmonic Ebm
    'G#dim': ['G#3', 'B3', 'D4'],
    'Bdim': ['B3', 'D4', 'F4'],
    'Fdim': ['F3', 'G#3', 'B3'],
    'Ddim': ['D4', 'F4', 'G#4'],
    'C#dim': ['C#4', 'E4', 'G4'],
    'Edim': ['E4', 'G4', 'Bb4'],
    'Gdim': ['G3', 'Bb3', 'Db4'],
    'Bbdim': ['Bb3', 'Db4', 'E4'],
    'Adim': ['A3', 'C4', 'Eb4'],
    'F#dim': ['F#3', 'A3', 'C4'],
    'D#dim': ['D#4', 'F#4', 'A4'],
    'Db': ['Db4', 'F4', 'Ab4'],
    'Ab': ['Ab3', 'C4', 'Eb4'],
    'Cb': ['Cb4', 'Eb4', 'Gb4'], // B
    'Gb': ['Gb3', 'Bb3', 'Db4'], // F#
    'Fm': ['F3', 'Ab3', 'C4']
};

const SCALES = [
    'C# Harmonic Minor', 'C# Phrygian Dominant (Hicaz)', 'A Minor (Nihavend)', 'D Phrygian (Kürdi)', 'C# Double Harmonic (Kürdi)',
    'C# Dorian (Hüseyni)', 'C# Mixolydian (Rast)', 'C# Phrygian (Uşşak)', 'C# Lydian (Çargah)', 'C# Locrian (Sabâ)',
    'C# Major', 'C# Melodic Minor', 'C# Harmonic Major', 'C# Dorian #4 (Nihavend)', 'C# Lydian Dominant', 'C# Super Locrian (Altered)',
    'C# Neapolitan Minor', 'C# Neapolitan Major', 'C# Hungarian Minor', 'C# Hungarian Major', 'C# Enigmatic', 'C# Hirajoshi'
];

const SCALE_TRANSFORM = {
    // i chord
    'C#m': {
        'C# Harmonic Minor': 'C#m', 'C# Phrygian Dominant (Hicaz)': 'C#', 'A Minor (Nihavend)': 'Am', 'D Phrygian (Kürdi)': 'Dm',
        'C# Double Harmonic (Kürdi)': 'C#', 'C# Dorian (Hüseyni)': 'C#m', 'C# Mixolydian (Rast)': 'C#', 'C# Phrygian (Uşşak)': 'C#m',
        'C# Lydian (Çargah)': 'C#', 'C# Locrian (Sabâ)': 'C#dim', 'C# Major': 'C#', 'C# Melodic Minor': 'C#m', 'C# Harmonic Major': 'C#',
        'C# Dorian #4 (Nihavend)': 'C#m', 'C# Lydian Dominant': 'C#', 'C# Super Locrian (Altered)': 'C#m', 'C# Neapolitan Minor': 'C#m',
        'C# Neapolitan Major': 'C#m', 'C# Hungarian Minor': 'C#m', 'C# Hungarian Major': 'C#', 'C# Enigmatic': 'C#', 'C# Hirajoshi': 'C#m'
    },
    // V chord
    'G#': {
        'C# Harmonic Minor': 'G#', 'C# Phrygian Dominant (Hicaz)': 'G#dim', 'A Minor (Nihavend)': 'E', 'D Phrygian (Kürdi)': 'A',
        'C# Double Harmonic (Kürdi)': 'G#', 'C# Dorian (Hüseyni)': 'G#m', 'C# Mixolydian (Rast)': 'G#m', 'C# Phrygian (Uşşak)': 'G#dim',
        'C# Lydian (Çargah)': 'G#', 'C# Locrian (Sabâ)': 'G#', 'C# Major': 'G#', 'C# Melodic Minor': 'G#', 'C# Harmonic Major': 'G#',
        'C# Dorian #4 (Nihavend)': 'G#', 'C# Lydian Dominant': 'G#dim', 'C# Super Locrian (Altered)': 'G#', 'C# Neapolitan Minor': 'G#',
        'C# Neapolitan Major': 'G#m', 'C# Hungarian Minor': 'G#', 'C# Hungarian Major': 'G#dim', 'C# Enigmatic': 'G#', 'C# Hirajoshi': 'G#m'
    },
    // VI chord
    'A': {
        'C# Harmonic Minor': 'A', 'C# Phrygian Dominant (Hicaz)': 'A#m', 'A Minor (Nihavend)': 'F', 'D Phrygian (Kürdi)': 'Bb',
        'C# Double Harmonic (Kürdi)': 'A', 'C# Dorian (Hüseyni)': 'A#dim', 'C# Mixolydian (Rast)': 'A#m', 'C# Phrygian (Uşşak)': 'A',
        'C# Lydian (Çargah)': 'A#m', 'C# Locrian (Sabâ)': 'A', 'C# Major': 'A#m', 'C# Melodic Minor': 'A#dim', 'C# Harmonic Major': 'A',
        'C# Dorian #4 (Nihavend)': 'A', 'C# Lydian Dominant': 'A#m', 'C# Super Locrian (Altered)': 'A', 'C# Neapolitan Minor': 'A',
        'C# Neapolitan Major': 'A', 'C# Hungarian Minor': 'A', 'C# Hungarian Major': 'A', 'C# Enigmatic': 'A#', 'C# Hirajoshi': 'A'
    },
    // iv chord
    'F#m': {
        'C# Harmonic Minor': 'F#m', 'C# Phrygian Dominant (Hicaz)': 'F#m', 'A Minor (Nihavend)': 'Dm', 'D Phrygian (Kürdi)': 'Gm',
        'C# Double Harmonic (Kürdi)': 'F#m', 'C# Dorian (Hüseyni)': 'F#', 'C# Mixolydian (Rast)': 'F#', 'C# Phrygian (Uşşak)': 'F#m',
        'C# Lydian (Çargah)': 'F#dim', 'C# Locrian (Sabâ)': 'F#m', 'C# Major': 'F#m', 'C# Melodic Minor': 'F#', 'C# Harmonic Major': 'F#m',
        'C# Dorian #4 (Nihavend)': 'F#', 'C# Lydian Dominant': 'F#', 'C# Super Locrian (Altered)': 'F#m', 'C# Neapolitan Minor': 'F#m',
        'C# Neapolitan Major': 'F#', 'C# Hungarian Minor': 'F#m', 'C# Hungarian Major': 'F#m', 'C# Enigmatic': 'F#m', 'C# Hirajoshi': 'F#m'
    },
    // II chord (Flat II)
    'D': {
        'C# Harmonic Minor': 'D#dim', 'C# Phrygian Dominant (Hicaz)': 'D', 'A Minor (Nihavend)': 'Bdim', 'D Phrygian (Kürdi)': 'Eb',
        'C# Double Harmonic (Kürdi)': 'D', 'C# Dorian (Hüseyni)': 'D#m', 'C# Mixolydian (Rast)': 'D#m', 'C# Phrygian (Uşşak)': 'D',
        'C# Lydian (Çargah)': 'D#', 'C# Locrian (Sabâ)': 'D', 'C# Major': 'D#m', 'C# Melodic Minor': 'D#m', 'C# Harmonic Major': 'D#dim',
        'C# Dorian #4 (Nihavend)': 'D#m', 'C# Lydian Dominant': 'D#', 'C# Super Locrian (Altered)': 'D', 'C# Neapolitan Minor': 'D',
        'C# Neapolitan Major': 'D', 'C# Hungarian Minor': 'D#dim', 'C# Hungarian Major': 'D#dim', 'C# Enigmatic': 'D#', 'C# Hirajoshi': 'C#'
    },
    // VII chord
    'B': {
        'C# Harmonic Minor': 'B', 'C# Phrygian Dominant (Hicaz)': 'B', 'A Minor (Nihavend)': 'G', 'D Phrygian (Kürdi)': 'C',
        'C# Double Harmonic (Kürdi)': 'C', 'C# Dorian (Hüseyni)': 'B', 'C# Mixolydian (Rast)': 'B', 'C# Phrygian (Uşşak)': 'B',
        'C# Lydian (Çargah)': 'C', 'C# Locrian (Sabâ)': 'B', 'C# Major': 'C', 'C# Melodic Minor': 'B', 'C# Harmonic Major': 'C',
        'C# Dorian #4 (Nihavend)': 'B', 'C# Lydian Dominant': 'B', 'C# Super Locrian (Altered)': 'B', 'C# Neapolitan Minor': 'B',
        'C# Neapolitan Major': 'B', 'C# Hungarian Minor': 'C', 'C# Hungarian Major': 'C', 'C# Enigmatic': 'C', 'C# Hirajoshi': 'B'
    },
    // III chord
    'E': {
        'C# Harmonic Minor': 'E', 'C# Phrygian Dominant (Hicaz)': 'D#dim', 'A Minor (Nihavend)': 'C', 'D Phrygian (Kürdi)': 'F',
        'C# Double Harmonic (Kürdi)': 'E', 'C# Dorian (Hüseyni)': 'E', 'C# Mixolydian (Rast)': 'E#dim', 'C# Phrygian (Uşşak)': 'E',
        'C# Lydian (Çargah)': 'F#m', 'C# Locrian (Sabâ)': 'E', 'C# Major': 'E#m', 'C# Melodic Minor': 'E', 'C# Harmonic Major': 'E#dim',
        'C# Dorian #4 (Nihavend)': 'E', 'C# Lydian Dominant': 'F#', 'C# Super Locrian (Altered)': 'E', 'C# Neapolitan Minor': 'E',
        'C# Neapolitan Major': 'E', 'C# Hungarian Minor': 'E', 'C# Hungarian Major': 'E', 'C# Enigmatic': 'E', 'C# Hirajoshi': 'E'
    },
    // v chord
    'G#m': {
        'C# Harmonic Minor': 'G#m', 'C# Phrygian Dominant (Hicaz)': 'G#dim', 'A Minor (Nihavend)': 'Em', 'D Phrygian (Kürdi)': 'Am',
        'C# Double Harmonic (Kürdi)': 'G#', 'C# Dorian (Hüseyni)': 'G#m', 'C# Mixolydian (Rast)': 'G#m', 'C# Phrygian (Uşşak)': 'G#dim',
        'C# Lydian (Çargah)': 'G#', 'C# Locrian (Sabâ)': 'G#', 'C# Major': 'G#', 'C# Melodic Minor': 'G#', 'C# Harmonic Major': 'G#',
        'C# Dorian #4 (Nihavend)': 'G#', 'C# Lydian Dominant': 'G#dim', 'C# Super Locrian (Altered)': 'G#', 'C# Neapolitan Minor': 'G#',
        'C# Neapolitan Major': 'G#m', 'C# Hungarian Minor': 'G#', 'C# Hungarian Major': 'G#dim', 'C# Enigmatic': 'G#', 'C# Hirajoshi': 'G#m'
    },
    // ii chord
    'D#dim': {
        'C# Harmonic Minor': 'D#dim', 'C# Phrygian Dominant (Hicaz)': 'D', 'A Minor (Nihavend)': 'Bdim', 'D Phrygian (Kürdi)': 'Eb',
        'C# Double Harmonic (Kürdi)': 'D', 'C# Dorian (Hüseyni)': 'D#m', 'C# Mixolydian (Rast)': 'D#m', 'C# Phrygian (Uşşak)': 'D',
        'C# Lydian (Çargah)': 'D#', 'C# Locrian (Sabâ)': 'D', 'C# Major': 'D#m', 'C# Melodic Minor': 'D#m', 'C# Harmonic Major': 'D#dim',
        'C# Dorian #4 (Nihavend)': 'D#m', 'C# Lydian Dominant': 'D#', 'C# Super Locrian (Altered)': 'D', 'C# Neapolitan Minor': 'D',
        'C# Neapolitan Major': 'D', 'C# Hungarian Minor': 'D#dim', 'C# Hungarian Major': 'D#dim', 'C# Enigmatic': 'D#', 'C# Hirajoshi': 'C#'
    },
    // vii chord
    'C': {
        'C# Harmonic Minor': 'B', 'C# Phrygian Dominant (Hicaz)': 'B', 'A Minor (Nihavend)': 'C', 'D Phrygian (Kürdi)': 'C',
        'C# Double Harmonic (Kürdi)': 'C', 'C# Dorian (Hüseyni)': 'B', 'C# Mixolydian (Rast)': 'B', 'C# Phrygian (Uşşak)': 'B',
        'C# Lydian (Çargah)': 'C', 'C# Locrian (Sabâ)': 'B', 'C# Major': 'C', 'C# Melodic Minor': 'B', 'C# Harmonic Major': 'C',
        'C# Dorian #4 (Nihavend)': 'B', 'C# Lydian Dominant': 'B', 'C# Super Locrian (Altered)': 'B', 'C# Neapolitan Minor': 'B',
        'C# Neapolitan Major': 'B', 'C# Hungarian Minor': 'C', 'C# Hungarian Major': 'C', 'C# Enigmatic': 'C', 'C# Hirajoshi': 'B'
    },
    // II (Major)
    'C#': {
        'C# Harmonic Minor': 'C#', 'C# Phrygian Dominant (Hicaz)': 'C#', 'A Minor (Nihavend)': 'A', 'D Phrygian (Kürdi)': 'D',
        'C# Double Harmonic (Kürdi)': 'C#', 'C# Dorian (Hüseyni)': 'C#', 'C# Mixolydian (Rast)': 'C#', 'C# Phrygian (Uşşak)': 'C#',
        'C# Lydian (Çargah)': 'C#', 'C# Locrian (Sabâ)': 'C#', 'C# Major': 'C#', 'C# Melodic Minor': 'C#', 'C# Harmonic Major': 'C#',
        'C# Dorian #4 (Nihavend)': 'C#', 'C# Lydian Dominant': 'C#', 'C# Super Locrian (Altered)': 'C#', 'C# Neapolitan Minor': 'C#',
        'C# Neapolitan Major': 'C#', 'C# Hungarian Minor': 'C#', 'C# Hungarian Major': 'C#', 'C# Enigmatic': 'C#', 'C# Hirajoshi': 'C#'
    },
    // vi chord
    'Bm': {
        'C# Harmonic Minor': 'Bm', 'C# Phrygian Dominant (Hicaz)': 'Bm', 'A Minor (Nihavend)': 'Gm', 'D Phrygian (Kürdi)': 'Cm',
        'C# Double Harmonic (Kürdi)': 'Cm', 'C# Dorian (Hüseyni)': 'B', 'C# Mixolydian (Rast)': 'B', 'C# Phrygian (Uşşak)': 'Bm',
        'C# Lydian (Çargah)': 'Cm', 'C# Locrian (Sabâ)': 'Bm', 'C# Major': 'Cm', 'C# Melodic Minor': 'B', 'C# Harmonic Major': 'Cm',
        'C# Dorian #4 (Nihavend)': 'B', 'C# Lydian Dominant': 'B', 'C# Super Locrian (Altered)': 'Bm', 'C# Neapolitan Minor': 'Bm',
        'C# Neapolitan Major': 'B', 'C# Hungarian Minor': 'Cm', 'C# Hungarian Major': 'Cm', 'C# Enigmatic': 'Cm', 'C# Hirajoshi': 'Bm'
    },
    // iv minor
    'Dm': {
        'C# Harmonic Minor': 'Dm', 'C# Phrygian Dominant (Hicaz)': 'Dm', 'A Minor (Nihavend)': 'Bbm', 'D Phrygian (Kürdi)': 'Ebm',
        'C# Double Harmonic (Kürdi)': 'Dm', 'C# Dorian (Hüseyni)': 'D#m', 'C# Mixolydian (Rast)': 'D#m', 'C# Phrygian (Uşşak)': 'Dm',
        'C# Lydian (Çargah)': 'D#m', 'C# Locrian (Sabâ)': 'Dm', 'C# Major': 'D#m', 'C# Melodic Minor': 'D#m', 'C# Harmonic Major': 'D#m',
        'C# Dorian #4 (Nihavend)': 'D#m', 'C# Lydian Dominant': 'D#m', 'C# Super Locrian (Altered)': 'Dm', 'C# Neapolitan Minor': 'Dm',
        'C# Neapolitan Major': 'Dm', 'C# Hungarian Minor': 'D#m', 'C# Hungarian Major': 'D#m', 'C# Enigmatic': 'D#m', 'C# Hirajoshi': 'Dm'
    }
};

// --- Transposition Engine ---
const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const CHROMATIC_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb'];

function getNoteIndex(noteRaw) {
    let idx = CHROMATIC_SCALE.indexOf(noteRaw);
    if (idx === -1) idx = CHROMATIC_FLATS.indexOf(noteRaw);
    return idx;
}

function getGlobalTransposeOffset() {
    const keySig = document.getElementById('keySelect') ? document.getElementById('keySelect').value : 'C#';
    const baseIdx = getNoteIndex('C#');
    const targetIdx = getNoteIndex(keySig);
    if (targetIdx === -1) return 0;

    // Calculate difference
    let diff = targetIdx - baseIdx;
    // Keep it between -6 and +5 for most logical octave jumps
    if (diff > 5) diff -= 12;
    if (diff < -6) diff += 12;
    return diff;
}

function transposeNote(noteStr, semitones) {
    if (semitones === 0 && (!document.getElementById('octaveSelect') || parseInt(document.getElementById('octaveSelect').value) === 0)) {
        return noteStr;
    }
    const match = noteStr.match(/^([A-Ga-g][#b]?)([0-9])$/);
    if (!match) return noteStr;

    const noteRaw = match[1];
    const octave = parseInt(match[2]);
    const idx = getNoteIndex(noteRaw);

    if (idx === -1) return noteStr;

    const totalSemitones = idx + semitones;
    const globalOctaveOffset = document.getElementById('octaveSelect') ? parseInt(document.getElementById('octaveSelect').value) || 0 : 0;

    // Ensure octave never falls below 0 or goes above 8 reasonably
    let newOctave = octave + Math.floor(totalSemitones / 12) + globalOctaveOffset;
    if (newOctave < 0) newOctave = 0;
    if (newOctave > 8) newOctave = 8;

    const newIdx = ((totalSemitones % 12) + 12) % 12;

    return CHROMATIC_SCALE[newIdx] + newOctave;
}

function transposeChordName(chordName, semitones) {
    if (semitones === 0) return chordName;
    const match = chordName.match(/^([A-Ga-g][#b]?)(.*)$/);
    if (!match) return chordName;

    const root = match[1];
    const flavor = match[2];
    const idx = getNoteIndex(root);
    if (idx === -1) return chordName;

    const newIdx = ((idx + semitones) % 12 + 12) % 12;
    return CHROMATIC_SCALE[newIdx] + flavor;
}

const PROGRESSION_PATTERNS = {
    intro: [
        ['C#m', 'D', 'C#m', 'D'],
        ['C#m', 'F#m', 'C#m', 'G#'],
        ['C#m', 'A', 'F#m', 'G#']
    ],
    verse: [
        ['C#m', 'B', 'A', 'G#'],
        ['C#m', 'F#m', 'E', 'D'],
        ['C#m', 'C#', 'F#m', 'E'],
        ['C#m', 'Bm', 'A', 'G#']
    ],
    chorus: [
        ['G#', 'C#m', 'F#m', 'C#m'], // Strong dominant intro
        ['C#m', 'F#m', 'D', 'G#'],
        ['A', 'G#', 'C#m', 'D']
    ],
    bridge: [
        ['F#m', 'G#', 'C#m', 'A'],
        ['D', 'E', 'F#m', 'G#']
    ],
    outro: [
        ['C#m', 'D', 'C#m', 'C#m'],
        ['A', 'G#', 'C#m', 'C#m']
    ]
};

// --- Arrangement Logic ---

let currentArrangement = [];
let audioCtx = null;
let analyser = null;
let visualizerDataArray = null;
let isVisualizerRunning = false;
let globalReverbNode = null;
let globalReverbMix = null;
let masterCompressor = null;
let reverbFilter = null;
let activeNodes = [];
let gainNodes = []; // References to track nodes for pausing/canceling early
let macroModeTimeout = null;

// Ensure macros array exists locally to prevent errors if we switch to manual mode
let currentMacros = [];

// --- Persona Library Settings ---
let activePersona = null;
let previewingPersona = null;
const PERSONA_LIBRARY = {
    'Leylazen': {
        name: 'Leylazen',
        gender: 'Kadin Vokal',
        genderCode: 'Female V.',
        avatarLetter: 'L',
        avatarGradient: 'linear-gradient(135deg, #d845ff, #8a2be2)',
        style: 'Ethereal, Melancholic, Dark Cinematic Trap, Ethnic',
        tags: 'Mystical Female Chorus, Ethnic Vocalise, Duet with Hükm',
        sunoStyle: 'Turkish cinematic ethnic-trap duet: Leylazen (mystical female sung chorus + wordless ethnic vocalise intro/break/outro) and Hükm (hard, clear Turkish rap verses, authoritative tone, no mumble), 140 BPM dark trap with occasional halftime feel, heavy 808, crisp hats, sparse ney/bağlama/oud textures, tribal percussion hits, spacious reverb on vocalise only, hook is memorable and chant-like, vocals highly intelligible, Avoid mezdeke/dance vibe',
        // General Settings presets
        bpm: 140,
        genre: 'Arabesque Trap',
        mood: 'Aggressive, Dark, Deep bass',
        scale: 'C# Phrygian Dominant (Hicaz)',
        tempoFeel: 'Normal',
        key: 'C#',
        instRhythm: '808 Trap Drums',
        instBass: '808 Sub Bass',
        instHarmony: '',
        instLead: 'Ney Flute',
        instAtmosphere: 'Dark Ambient Drone',
        vocalGender: 'duo'
    },
    'Hukm': {
        name: 'Hükm',
        gender: 'Erkek Vokal',
        genderCode: 'Male Rap V.',
        avatarLetter: 'H',
        avatarGradient: 'linear-gradient(135deg, #ff6020, #8b0000)',
        style: 'Trap, Dark Rap, Authoritative, Military Cinematic',
        tags: 'Erkek Vokal, Trap / Rap, Aggressive, Authoritative, Clean Diction',
        sunoStyle: 'trap, rap, agressive, low melodic Turkish male rap, authoritative military-commander persona, calm intimidation, strict discipline, direct messaging; clean consonants, sharp S/T/K articulation, steady breath control, staccato rhythm; mid-low register, slight rasp, confident projection; hook is chant-like and memorable; 140 BPM dark cinematic trap, heavy sub/808, tight snare, crisp hats, occasional tribal/military percussion hits; minimal melodic content, spacious reverb on adlibs only; avoid melodic singing, avoid mumble, avoid overly comedic tone',
        // General Settings presets
        bpm: 140,
        genre: 'Arabesque Trap',
        mood: 'Aggressive, Dark, Deep bass',
        scale: 'C# Harmonic Minor',
        tempoFeel: 'Normal',
        key: 'C#',
        instRhythm: '808 Trap Drums',
        instBass: '808 Sub Bass',
        instHarmony: '',
        instLead: '',
        instAtmosphere: 'Dark Ambient Drone',
        vocalGender: 'Erkek'
    },
    'Ozan': {
        name: 'Ozan',
        gender: 'Erkek Vokal',
        genderCode: 'Male Acoustic V.',
        avatarLetter: 'O',
        avatarGradient: 'linear-gradient(135deg, #00e5ff, #005f9e)',
        style: 'Acoustic Turkish Pop, Sentimental, Storytelling, Duygusal',
        tags: 'Erkek Vokal, Akustik Turkish Pop, Duygusal, Balad',
        sunoStyle: 'warm male vocals, acoustic guitar, Turkish sentimental pop, emotional storytelling, bağlama texture',
        // General Settings presets
        bpm: 95,
        genre: 'Turkish Pop',
        mood: 'Melancholic, Emotional',
        scale: 'A Minor (Nihavend)',
        tempoFeel: 'Normal',
        key: 'A',
        instRhythm: '',
        instBass: '',
        instHarmony: 'Acoustic Guitar',
        instLead: 'Ney Flute',
        instAtmosphere: 'Epic Strings',
        vocalGender: 'Erkek'
    }
};


// =====================
// MACRO / ARRANGEMENT STATE
// =====================
let isPlaying = false;
let currentTimeout = null;
let currentPlayingSectionIdx = -1; // -1 means all or none

// Calculate the number of bars needed based on target duration & bpm
function generateStructure(targetMinutes, bpm) {
    // Defines the exact structure requested by the user
    const exactStructure = [
        { type: 'intro', bars: 4, name: 'Giriş (Intro)' },
        { type: 'verse', bars: 8, name: 'Söz 1 (Verse 1)' },
        { type: 'bridge', bars: 4, name: 'Köprü (Bridge)' },
        { type: 'chorus', bars: 8, name: 'Nakarat (Chorus)' },
        { type: 'bridge', bars: 4, name: 'Köprü (Bridge)' },
        { type: 'verse', bars: 8, name: 'Söz 2 (Verse 2)' },
        { type: 'outro', bars: 4, name: 'Çıkış (Outro)' }
    ];

    let generatedBase = [];

    // Add each section to the base
    exactStructure.forEach(sec => {
        generatedBase.push({ type: sec.type, duration: sec.bars, name: sec.name });
    });

    return fillChords(generatedBase);
}

function fillChords(structure) {
    let arrangement = [];

    structure.forEach(section => {
        // Pick a random progress pattern for this section type
        const patterns = PROGRESSION_PATTERNS[section.type] || PROGRESSION_PATTERNS['verse'];
        const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];

        let chords = [];
        // Fill the duration by repeating the 4-chord pattern
        const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';

        for (let i = 0; i < section.duration; i++) {
            const baseName = selectedPattern[i % selectedPattern.length];
            chords.push({
                baseName: baseName,
                originalBaseName: baseName,
                name: SCALE_TRANSFORM[baseName] ? (SCALE_TRANSFORM[baseName][currentScale] || baseName) : baseName,
                repeats: 1, // Default to 1 bar of 4/4
                id: Math.random().toString(36).substr(2, 9)
            });
        }

        arrangement.push({
            id: 'sec_' + Math.random().toString(36).substr(2, 9),
            type: section.type,
            name: section.name,
            duration: section.duration, // in bars
            chords: chords,
            vocalStyle: 'Pop / Melodic'
        });
    });

    return arrangement;
}

// --- UI Rendering ---

function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = '';

    currentArrangement.forEach((section, secIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-block';
        sectionDiv.id = section.id;
        sectionDiv.dataset.type = section.type;

        const header = document.createElement('div');
        header.className = 'section-header';

        const titleInfo = document.createElement('div');
        titleInfo.className = 'section-info';

        const titleSelect = document.createElement('select');
        titleSelect.className = 'section-title-select';

        const sectionTypes = [
            { type: 'intro', name: 'Giriş (Intro)' },
            { type: 'verse', name: 'Söz (Verse)' },
            { type: 'chorus', name: 'Nakarat (Chorus)' },
            { type: 'bridge', name: 'Köprü (Bridge)' },
            { type: 'break', name: '⏸ Vokal Arası (Break)' },
            { type: 'outro', name: 'Çıkış (Outro)' }
        ];

        if (!sectionTypes.some(s => s.type === section.type)) {
            sectionTypes.push({ type: section.type, name: section.name });
        }

        sectionTypes.forEach(s => {
            let opt = document.createElement('option');
            opt.value = s.type;
            opt.innerText = s.name;
            if (s.type === section.type) opt.selected = true;
            titleSelect.appendChild(opt);
        });

        titleSelect.addEventListener('change', (e) => {
            section.type = e.target.value;
            section.name = titleSelect.options[titleSelect.selectedIndex].text;
            sectionDiv.dataset.type = section.type; // Update border color visually
            generateSunoPrompt(); // Re-trigger prompt generation
        });

        // ── Bar Badge (prominently labeled) ──────────────────────────
        const duration = document.createElement('div');
        duration.className = 'section-duration bar-badge';

        const barIcon = document.createElement('span');
        barIcon.className = 'bar-icon';
        barIcon.textContent = '𝄞';   // music clef icon

        const barLabel = document.createElement('span');
        barLabel.className = 'bar-label';
        barLabel.textContent = 'BAR';

        const durationInput = document.createElement('input');
        durationInput.type = 'number';
        durationInput.min = '1';
        durationInput.max = '64';
        durationInput.value = section.duration;
        durationInput.title = 'Kaç bar olduğunu ayarla';
        durationInput.className = 'duration-input bar-input';

        durationInput.addEventListener('change', (e) => {
            const newDuration = parseInt(e.target.value) || 4;
            const diff = newDuration - section.duration;
            section.duration = newDuration;

            if (diff > 0) {
                // Add more chords to fill new duration using fallback pattern
                const patterns = PROGRESSION_PATTERNS[section.type] || PROGRESSION_PATTERNS['verse'];
                const selectedPattern = patterns[0];
                const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
                for (let i = 0; i < diff; i++) {
                    const baseName = selectedPattern[i % selectedPattern.length];
                    section.chords.push({
                        baseName: baseName,
                        originalBaseName: baseName,
                        name: SCALE_TRANSFORM[baseName] ? (SCALE_TRANSFORM[baseName][currentScale] || baseName) : baseName,
                        repeats: 1,
                        id: Math.random().toString(36).substr(2, 9)
                    });
                }
            } else if (diff < 0) {
                const absDiff = Math.abs(diff);
                section.chords.splice(section.chords.length - absDiff, absDiff);
            }
            renderTimeline();
        });

        duration.appendChild(barIcon);
        duration.appendChild(barLabel);

        // Glassy spin-wrapper for bar number input
        const spinWrapper = document.createElement('div');
        spinWrapper.className = 'bar-spin-wrapper';
        spinWrapper.appendChild(durationInput);

        const arrowCol = document.createElement('div');
        arrowCol.style.cssText = 'display:flex;flex-direction:column;height:100%;';
        const upBtn = document.createElement('button');
        upBtn.className = 'bar-spin-btn bar-spin-up';
        upBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        upBtn.type = 'button'; upBtn.title = 'Bar artır (+4)';
        upBtn.onclick = () => {
            durationInput.value = Math.min(64, (parseInt(durationInput.value) || 4) + 4);
            durationInput.dispatchEvent(new Event('change'));
        };
        const downBtn = document.createElement('button');
        downBtn.className = 'bar-spin-btn bar-spin-down';
        downBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
        downBtn.type = 'button'; downBtn.title = 'Bar azalt (-4)';
        downBtn.onclick = () => {
            durationInput.value = Math.max(1, (parseInt(durationInput.value) || 4) - 4);
            durationInput.dispatchEvent(new Event('change'));
        };
        arrowCol.appendChild(upBtn);
        arrowCol.appendChild(downBtn);
        spinWrapper.appendChild(arrowCol);
        duration.appendChild(spinWrapper);

        titleInfo.appendChild(titleSelect);
        titleInfo.appendChild(duration);

        // ── Syllable Count Badge (shown after analysis) ───────────────
        if (section.syllableCount > 0) {
            const sylBadge = document.createElement('div');
            sylBadge.className = 'syl-badge';
            sylBadge.title = 'Sözden hesaplanan hece sayısı';

            const sylIcon = document.createElement('span');
            sylIcon.className = 'syl-icon';
            sylIcon.textContent = '≈';

            const sylVal = document.createElement('span');
            sylVal.className = 'syl-value';
            sylVal.textContent = section.syllableCount;

            const sylLabel = document.createElement('span');
            sylLabel.className = 'syl-label';
            sylLabel.textContent = 'HECE';

            sylBadge.appendChild(sylIcon);
            sylBadge.appendChild(sylVal);
            sylBadge.appendChild(sylLabel);
            titleInfo.appendChild(sylBadge);
        }

        // Section playback controls
        const sectionControls = document.createElement('div');
        sectionControls.className = 'section-controls';

        const vocalSelect = document.createElement('select');
        vocalSelect.className = 'vocal-select';
        const styles = ['Pop / Melodic', 'Rap / Trap', 'R&B / Soul', 'Rock / Aggressive', 'Enstrümantal'];
        styles.forEach(s => {
            let opt = document.createElement('option');
            opt.value = s;
            opt.innerText = s;
            if (s === section.vocalStyle) opt.selected = true;
            vocalSelect.appendChild(opt);
        });

        // Vocal Gender Selector
        const vocalGenderSelect = document.createElement('select');
        vocalGenderSelect.className = 'vocal-select'; // Reuse style
        vocalGenderSelect.style.marginRight = '0';
        const genders = ['Erkek (Male)', 'Kadın (Female)', 'Koro/Çoklu (Choir)', 'Düet (Duet)', 'Vokal Yok'];
        // Provide a default if not set
        if (!section.vocalGender) section.vocalGender = 'Erkek (Male)';

        genders.forEach(g => {
            let opt = document.createElement('option');
            opt.value = g;
            opt.innerText = g;
            if (g === section.vocalGender) opt.selected = true;
            vocalGenderSelect.appendChild(opt);
        });

        vocalSelect.addEventListener('change', (e) => {
            section.vocalStyle = e.target.value;
            // Handle Trap simplify exactly as before
            const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';

            if (section.vocalStyle === 'Rap / Trap') {
                const tonicName = SCALE_TRANSFORM['C#m'][currentScale] || 'C#m';
                section.chords.forEach(c => {
                    // Store original baseName before overriding for vocal style
                    if (!c.originalBaseNameForVocal) c.originalBaseNameForVocal = c.baseName;
                    c.baseName = 'C#m';
                    c.name = tonicName;
                });
            } else {
                // Restore original base names to get original progression back
                section.chords.forEach(c => {
                    if (c.originalBaseNameForVocal) {
                        c.baseName = c.originalBaseNameForVocal;
                        delete c.originalBaseNameForVocal; // Clean up
                    } else {
                        c.baseName = c.originalBaseName || c.baseName;
                    }

                    if (SCALE_TRANSFORM[c.baseName]) {
                        c.name = SCALE_TRANSFORM[c.baseName][currentScale] || c.baseName;
                    } else {
                        c.name = c.baseName; // Fallback if no transform
                    }
                });
            }
            renderTimeline();
            generateSunoPrompt();
        });

        vocalGenderSelect.addEventListener('change', (e) => {
            section.vocalGender = e.target.value;
            generateSunoPrompt();
        });

        // ── Performance Hint (Ek Yönlendirmeler) ─────────────────────
        const perfSelect = document.createElement('select');
        perfSelect.className = 'vocal-select perf-select';

        let defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.innerText = '— Ek Detay / Not Yok —';
        perfSelect.appendChild(defaultOpt);

        const perfGroups = [
            { group: 'Yapı / Alan', items: ['[Intro]', '[Verse]', '[Verse 1]', '[Verse 2]', '[Pre-Chorus]', '[Chorus]', '[Hook]', '[Post-Chorus]', '[Bridge]', '[Break]', '[Interlude]', '[Instrumental]', '[Rap]', '[Rap Verse]', '[Outro]', '[Tag]'] },
            { group: 'Okuma Tarzı', items: ['[Spoken]', '[Spoken Word]', '(whisper)', '(softly)', '(higher)', '(lower)', '(spoken)'] },
            { group: 'Süsleme', items: ['[Adlibs]', '(ad lib)', '[Harmony]', '[Backing Vocals]', '()'] },
            { group: 'Uzatma / Tekrar', items: ['[Repeat]', '[Refrain]', '[Reprise]', 'x2', 'x3', 'repeat x2', '(repeat)', '(hold)', '(sustain)'] },
            { group: 'Es / Geçiş', items: ['(fade out)', '[Pause]', '(pause)', '[Breath]', '(breath)', '[Rest]', '[Rest 1 bar]', '[Rest 2 bars]', '[Rest 4 bars]', '...', '—'] }
        ];

        perfGroups.forEach(g => {
            let optgroup = document.createElement('optgroup');
            optgroup.label = g.group;
            g.items.forEach(item => {
                let opt = document.createElement('option');
                opt.value = item;
                opt.innerText = item;
                if (item === section.perfHint) opt.selected = true;
                optgroup.appendChild(opt);
            });
            perfSelect.appendChild(optgroup);
        });

        perfSelect.addEventListener('change', (e) => {
            section.perfHint = e.target.value;
            generateSunoPrompt();
        });

        sectionControls.appendChild(vocalSelect);
        sectionControls.appendChild(vocalGenderSelect);
        sectionControls.appendChild(perfSelect);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'icon-btn small-btn';
        copyBtn.innerText = 'Kopyala';
        copyBtn.title = 'Bölümü Çoğalt';
        copyBtn.onclick = () => {
            // Deep clone the section and insert right after it
            const newSection = JSON.parse(JSON.stringify(section));
            // Need new random IDs for chords so dragging works
            newSection.chords.forEach(c => c.id = Math.random().toString(36).substr(2, 9));
            currentArrangement.splice(secIndex + 1, 0, newSection);

            // Wait a tiny bit and re-render
            setTimeout(renderTimeline, 50);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'icon-btn small-btn';
        deleteBtn.style.color = '#ff453a';
        deleteBtn.style.borderColor = 'rgba(255, 69, 58, 0.5)';
        deleteBtn.innerText = 'Sil';
        deleteBtn.title = 'Bölümü Sil';
        deleteBtn.onclick = () => {
            currentArrangement.splice(secIndex, 1);
            if (currentPlayingSectionIdx === secIndex) stopTimeline();
            renderTimeline();
            generateSunoPrompt();
        };

        const playBtn = document.createElement('button');
        playBtn.className = 'icon-btn small-btn section-play-btn';
        playBtn.id = `playBtn_sec_${secIndex}`;
        playBtn.innerText = (isPlaying && currentPlayingSectionIdx === secIndex) ? '⏹ Durdur' : '▶ Çal';
        playBtn.title = 'Bu bölümü çal / durdur';
        playBtn.onclick = () => {
            if (isPlaying && currentPlayingSectionIdx === secIndex) {
                stopTimeline();
            } else {
                playTimeline(secIndex);
            }
        };

        const regenBtn = document.createElement('button');
        regenBtn.className = 'icon-btn small-btn';
        regenBtn.innerText = '🔄 Yenile';
        regenBtn.title = 'Ölçüye/Geçerli Türe uygun yeni rastgele akorlar üretir';
        regenBtn.onclick = () => {
            if (confirm("Bu bölümdeki akorları tamamen rastgele yeniden oluşturmak istediğinize emin misiniz?")) {
                const patterns = PROGRESSION_PATTERNS[section.type] || PROGRESSION_PATTERNS['verse'];
                // Select a random pattern array out of the available ones
                const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];

                let newChords = [];
                const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
                for (let i = 0; i < section.duration; i++) {
                    const baseName = selectedPattern[i % selectedPattern.length];
                    newChords.push({
                        baseName: baseName,
                        originalBaseName: baseName,
                        name: SCALE_TRANSFORM[baseName] ? (SCALE_TRANSFORM[baseName][currentScale] || baseName) : baseName,
                        repeats: 1,
                        id: Math.random().toString(36).substr(2, 9)
                    });
                }

                // Keep the original base name if it was trapped
                if (section.vocalStyle === 'Rap / Trap') {
                    const tonicName = SCALE_TRANSFORM['C#m'][currentScale] || 'C#m';
                    newChords.forEach(c => {
                        c.originalBaseNameForVocal = c.baseName;
                        c.baseName = 'C#m';
                        c.name = tonicName;
                    });
                }

                section.chords = newChords;
                renderTimeline();
                generateSunoPrompt();
            }
        };

        // ▲▼ Section Reorder Buttons
        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'icon-btn small-btn section-move-btn';
        moveUpBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        moveUpBtn.title = 'Bölümü Yukarı Taşı';
        moveUpBtn.disabled = secIndex === 0;
        moveUpBtn.style.opacity = secIndex === 0 ? '0.3' : '1';
        moveUpBtn.onclick = () => {
            if (secIndex === 0) return;
            // Swap with previous section
            [currentArrangement[secIndex - 1], currentArrangement[secIndex]] =
                [currentArrangement[secIndex], currentArrangement[secIndex - 1]];
            renderTimeline();
            liveRefreshPrompt();
        };

        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'icon-btn small-btn section-move-btn';
        moveDownBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
        moveDownBtn.title = 'Bölümü Aşağı Taşı';
        moveDownBtn.disabled = secIndex === currentArrangement.length - 1;
        moveDownBtn.style.opacity = secIndex === currentArrangement.length - 1 ? '0.3' : '1';
        moveDownBtn.onclick = () => {
            if (secIndex === currentArrangement.length - 1) return;
            // Swap with next section
            [currentArrangement[secIndex], currentArrangement[secIndex + 1]] =
                [currentArrangement[secIndex + 1], currentArrangement[secIndex]];
            renderTimeline();
            liveRefreshPrompt();
        };

        // ⏸ Vocal Break insert button
        const breakBtn = document.createElement('button');
        breakBtn.className = 'icon-btn small-btn section-move-btn';
        breakBtn.innerText = '⏸';
        breakBtn.title = 'Hemen altına Vokal Arası (Break) ekle';
        breakBtn.style.color = 'rgba(255,200,80,0.85)';
        breakBtn.style.borderColor = 'rgba(255,200,80,0.35)';
        breakBtn.onclick = () => {
            const cs = document.getElementById('scaleSelect')?.value || 'C# Harmonic Minor';
            const defPat = ['C#m', 'A', 'F#m', 'G#'];
            const breakChords = defPat.map(b => ({
                baseName: b, originalBaseName: b,
                name: SCALE_TRANSFORM[b] ? (SCALE_TRANSFORM[b][cs] || b) : b,
                repeats: 1, id: Math.random().toString(36).substr(2, 9)
            }));
            currentArrangement.splice(secIndex + 1, 0, {
                id: 'sec_' + Math.random().toString(36).substr(2, 9),
                type: 'break', name: 'Vokal Arası (Break)', duration: 4,
                chords: breakChords, vocalStyle: 'Enstrümantal', vocalGender: 'Vokal Yok'
            });
            renderTimeline();
            liveRefreshPrompt();
        };

        sectionControls.appendChild(moveUpBtn);
        sectionControls.appendChild(moveDownBtn);
        sectionControls.appendChild(breakBtn);
        sectionControls.appendChild(copyBtn);
        sectionControls.appendChild(deleteBtn);
        sectionControls.appendChild(regenBtn);
        sectionControls.appendChild(playBtn);

        header.appendChild(titleInfo);
        header.appendChild(sectionControls);
        sectionDiv.appendChild(header);

        const chordRow = document.createElement('div');
        chordRow.className = 'chord-row';
        // Populate chord blocks
        section.chords.forEach((chordObj, chordIndex) => {
            const chordCard = document.createElement('div');
            chordCard.className = 'chord-card';
            chordCard.draggable = true;
            chordCard.id = chordObj.id; // Use the chord's unique ID

            // Re-map name just in case scale changed but keeping baseName intact
            const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
            // Only re-map if it's not Rap/Trap override
            if (section.vocalStyle !== 'Rap / Trap') {
                chordObj.name = SCALE_TRANSFORM[chordObj.baseName] ? (SCALE_TRANSFORM[chordObj.baseName][currentScale] || chordObj.baseName) : chordObj.baseName;
            }

            const transposeOffset = getGlobalTransposeOffset();
            const displayChordName = transposeChordName(chordObj.name, transposeOffset);

            const select = document.createElement('select');
            select.className = 'chord-dropdown';

            // Get all valid chords for this scale
            let validChordsInScale = [];
            if (currentScale === 'Varsayılan (Standart Akorlar)') {
                // If it's the raw default, just populate all base chords we have defined maps for
                validChordsInScale = Object.keys(SCALE_TRANSFORM).filter(c => CHORDS[c]);
            } else {
                Object.values(SCALE_TRANSFORM).forEach(mapping => {
                    const mappedChord = mapping[currentScale];
                    if (mappedChord && !validChordsInScale.includes(mappedChord)) {
                        validChordsInScale.push(mappedChord);
                    }
                });
            }

            // Generate options based on available chords for the current makam
            validChordsInScale.forEach(cName => {
                if (!CHORDS[cName]) return; // Ensure chord exists in engine
                const opt = document.createElement('option');
                // The actual value stored is the untransposed name
                opt.value = cName;
                opt.innerText = transposeChordName(cName, transposeOffset);
                if (cName === chordObj.name) opt.selected = true;
                select.appendChild(opt);
            });
            // If the current chord is somehow manually set and not in the makam, add it
            if (!validChordsInScale.includes(chordObj.name) && CHORDS[chordObj.name]) {
                const opt = document.createElement('option');
                opt.value = chordObj.name;
                opt.innerText = transposeChordName(chordObj.name, transposeOffset);
                opt.selected = true;
                select.appendChild(opt);
            }

            select.addEventListener('change', (e) => {
                chordObj.name = e.target.value;
                chordObj.baseName = e.target.value; // manual override
                generateSunoPrompt();
            });
            chordCard.appendChild(select);

            // Repeat/Bar control
            const controls = document.createElement('div');
            controls.className = 'chord-controls';
            controls.title = 'Ölçü sayısı (Kaç kez çalınacak)';
            const repeatInput = document.createElement('input');
            repeatInput.type = 'number';
            repeatInput.min = '1';
            repeatInput.max = '16';
            repeatInput.value = chordObj.repeats;
            repeatInput.addEventListener('change', (e) => {
                chordObj.repeats = parseInt(e.target.value) || 1;
            });
            controls.appendChild(document.createTextNode('×'));
            controls.appendChild(repeatInput);
            chordCard.appendChild(controls);

            // Click to play feature with animation
            let stopCurrentChord = null;
            chordCard.addEventListener('pointerdown', (e) => {
                if (e.target.tagName.toLowerCase() === 'select' || e.target.tagName.toLowerCase() === 'input') return; // Don't block UI clicks

                chordCard.classList.add('playing-manual');
                if (stopCurrentChord) stopCurrentChord(); // Clean up previous
                // Use untransposed internal name, playback handles transpose
                stopCurrentChord = playSustainedChord(chordObj.name);
            });

            const releaseChord = () => {
                chordCard.classList.remove('playing-manual');
                if (stopCurrentChord) {
                    stopCurrentChord();
                    stopCurrentChord = null;
                }
            };

            chordCard.addEventListener('pointerup', releaseChord);
            chordCard.addEventListener('pointerleave', releaseChord);

            // Drag and drop events
            chordCard.addEventListener('dragstart', (e) => {
                // Stop playback when picking it up to move
                if (stopCurrentChord) {
                    stopCurrentChord();
                    stopCurrentChord = null;
                }

                // Allow a tiny delay before adding dragging class so the ghost image looks full
                setTimeout(() => chordCard.classList.add('dragging'), 0);

                e.dataTransfer.setData('sourceSec', secIndex);
                e.dataTransfer.setData('sourceIdx', chordIndex);
                e.dataTransfer.effectAllowed = 'move';
            });

            chordCard.addEventListener('dragend', () => {
                chordCard.classList.remove('dragging');
                document.querySelectorAll('.chord-row').forEach(row => {
                    row.classList.remove('drag-over');
                    const placeholder = row.querySelector('.drop-placeholder');
                    if (placeholder) placeholder.remove();
                });
            });

            chordRow.appendChild(chordCard);
        });

        // Drop zone events for the row
        chordRow.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            chordRow.classList.add('drag-over');

            // Handle placeholder
            let placeholder = chordRow.querySelector('.drop-placeholder');
            if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.className = 'drop-placeholder';
            }

            const afterElement = getDragAfterElement(chordRow, e.clientX);
            if (afterElement == null) {
                chordRow.appendChild(placeholder);
            } else {
                chordRow.insertBefore(placeholder, afterElement);
            }
        });

        chordRow.addEventListener('dragleave', (e) => {
            // Only remove drag-over if we are genuinely leaving the row
            if (e.target === chordRow) {
                chordRow.classList.remove('drag-over');
            }
        });

        chordRow.addEventListener('drop', (e) => {
            e.preventDefault();
            chordRow.classList.remove('drag-over');

            const placeholder = chordRow.querySelector('.drop-placeholder');
            if (placeholder) placeholder.remove();

            const sourceSecStr = e.dataTransfer.getData('sourceSec');
            const sourceIdxStr = e.dataTransfer.getData('sourceIdx');
            if (!sourceSecStr || !sourceIdxStr) return;

            const sourceSec = parseInt(sourceSecStr);
            const sourceIdx = parseInt(sourceIdxStr);
            const targetSec = secIndex;

            // Determine target index based on drop position relative to children
            const afterElement = getDragAfterElement(chordRow, e.clientX);
            let targetIdx = currentArrangement[targetSec].chords.length;

            if (afterElement && afterElement.dataset && afterElement.dataset.chordIndex !== undefined) {
                targetIdx = parseInt(afterElement.dataset.chordIndex);
                if (sourceSec === targetSec && sourceIdx < targetIdx) {
                    targetIdx--; // Account for removal shift
                }
            }

            if (!isNaN(sourceSec) && !isNaN(sourceIdx)) {
                const item = currentArrangement[sourceSec].chords.splice(sourceIdx, 1)[0];
                currentArrangement[targetSec].chords.splice(targetIdx, 0, item);
                renderTimeline();
            }
        });

        sectionDiv.appendChild(chordRow);
        container.appendChild(sectionDiv);
    });

    document.getElementById('timelineSection').style.display = 'block';

    // Auto generate prompt
    generateSunoPrompt();
}

function getDragAfterElement(container, x) {
    // Select cards that are not dragging and are not the placeholder
    const draggableElements = [...container.querySelectorAll('.chord-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // Calculate middle point
        const offset = x - box.left - box.width / 2;
        // If x is before the middle, we want to insert before this element
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// --- Audio Synthesizer ---

function createReverbBuffer() {
    const sampleRate = audioCtx.sampleRate;
    const length = sampleRate * 3.5; // 3.5 seconds long lush reverb
    const impulse = audioCtx.createBuffer(2, length, sampleRate);
    for (let i = 0; i < 2; i++) {
        const channelData = impulse.getChannelData(i);
        let lastOut = 0; // for simple lowpass
        for (let j = 0; j < length; j++) {
            // Generate softer noise by slightly lowpassing white noise
            const white = (Math.random() * 2 - 1);
            lastOut = (lastOut + (0.05 * white)) / 1.05;
            // Exponential decay for smooth tail
            channelData[j] = lastOut * 4.0 * Math.pow(1 - j / length, 4.0);
        }
    }
    return impulse;
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Master Compressor — prevents hard clipping when multiple chords stack
        masterCompressor = audioCtx.createDynamicsCompressor();
        masterCompressor.threshold.value = -18; // Start compressing at -18 dBFS
        masterCompressor.knee.value = 8;    // Soft knee for transparent compression
        masterCompressor.ratio.value = 6;    // 6:1 — firm but not limiting
        masterCompressor.attack.value = 0.005; // 5 ms fast attack
        masterCompressor.release.value = 0.25;  // 250 ms release
        masterCompressor.connect(audioCtx.destination);

        // Setup Visualizer Analyser
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        const bufferLength = analyser.frequencyBinCount;
        visualizerDataArray = new Uint8Array(bufferLength);

        // Route everything to analyser -> compressor -> destination
        analyser.connect(masterCompressor);
        startVisualizerLoop();

        // Setup Ethereal Reverb Bus with a lowpass filter to prevent ringing
        globalReverbNode = audioCtx.createConvolver();
        globalReverbNode.buffer = createReverbBuffer();

        reverbFilter = audioCtx.createBiquadFilter();
        reverbFilter.type = 'lowpass';
        reverbFilter.frequency.value = 1800; // Cut off harsh high frequencies

        globalReverbMix = audioCtx.createGain();
        globalReverbMix.gain.value = 0.6; // 60% Wet mixture

        globalReverbNode.connect(reverbFilter);
        reverbFilter.connect(globalReverbMix);
        globalReverbMix.connect(analyser); // Route Reverb -> visualizer -> etc.
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function startVisualizerLoop() {
    if (isVisualizerRunning) return;
    isVisualizerRunning = true;

    const canvas = document.getElementById('visualizerCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (analyser) analyser.fftSize = 256;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const BINS = 128;
    const smooth = new Float32Array(BINS);
    const SF = 0.80;  // smoothing: slower = silkier

    const MAX_D = 9;     // max bar depth inward (px) — very subtle
    const GAP = 1;     // gap between bar segments
    const CR = 16;    // corner radius — skip corners, draw only straight edges

    let rgbHue = 0; // rotates every frame for RGB effect

    function draw() {
        requestAnimationFrame(draw);
        if (!analyser || !visualizerDataArray) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }

        analyser.getByteFrequencyData(visualizerDataArray);
        for (let i = 0; i < BINS; i++) {
            smooth[i] = smooth[i] * SF + (visualizerDataArray[i] / 255) * (1 - SF);
        }

        rgbHue = (rgbHue + 0.6) % 360; // slow RGB rotation

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const panel = document.getElementById('timelineSection');
        if (!panel || panel.style.display === 'none') return;
        const r = panel.getBoundingClientRect();
        if (r.width < 10) return;

        const N = Math.floor(BINS / 4); // 32 bins per side

        // Average energy for border breathe
        let avg = 0;
        for (let i = 0; i < BINS; i++) avg += smooth[i];
        avg /= BINS;

        // ── Rounded-rect border outline (single thin stroke, subtle) ──
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(r.left, r.top, r.width, r.height, CR);
        ctx.strokeStyle = `hsla(${rgbHue}, 80%, 60%, ${0.12 + avg * 0.22})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = `hsl(${rgbHue}, 90%, 65%)`;
        ctx.shadowBlur = 2 + avg * 6;
        ctx.stroke();
        ctx.restore();

        // ── Helper: one segment, inward from border ─────────────────
        function seg(x, y, w, h, amp, hue) {
            if (amp < 0.02) return;
            const lit = 55 + amp * 25;
            const col = `hsl(${hue}, 90%, ${lit}%)`;
            ctx.save();
            ctx.shadowColor = col;
            ctx.shadowBlur = 3 + amp * 10;
            ctx.fillStyle = col;
            ctx.globalAlpha = 0.6 + amp * 0.4;
            ctx.fillRect(x, y, w, h);
            ctx.restore();
        }

        // ─── Determine active section bounds for left+right lights ───
        // Use playing section el if available, else fall back to full panel
        let secTop = r.top + CR;
        let secHeight = r.height - CR * 2;

        if (typeof currentPlayingSectionIdx !== 'undefined' && currentPlayingSectionIdx >= 0) {
            const secId = currentArrangement[currentPlayingSectionIdx]?.id;
            const secEl = secId ? document.getElementById(secId) : null;
            if (secEl) {
                const sr = secEl.getBoundingClientRect();
                secTop = sr.top;
                secHeight = sr.height;
            }
        }

        // ── LEFT — bass (bins 0–31) → RGB, locked to active section ─
        {
            const bH = secHeight / N;
            for (let i = 0; i < N; i++) {
                const amp = smooth[i];
                const hue = (rgbHue + i * 5) % 360; // rainbow sweep down section
                seg(r.left, secTop + i * bH + GAP, amp * MAX_D * 1.6, bH - GAP * 2, amp, hue);
            }
        }

        // ── RIGHT — high-mid (bins 64–95) → RGB+180°, locked to section
        {
            const bH = secHeight / N;
            for (let i = 0; i < N; i++) {
                const amp = smooth[64 + i];
                const len = amp * MAX_D * 1.6;
                const hue = (rgbHue + 180 + i * 5) % 360;
                seg(r.right - len, secTop + i * bH + GAP, len, bH - GAP * 2, amp, hue);
            }
        }

        // ── TOP — treble (bins 96–127) → bars grow DOWN ────────────
        {
            const eW = r.width - CR * 2;
            const bW = eW / N;
            const x0 = r.left + CR;
            for (let i = 0; i < N; i++) {
                const amp = smooth[96 + i];
                const hue = (rgbHue + 90 + i * 4) % 360;
                seg(x0 + i * bW + GAP, r.top, bW - GAP * 2, amp * MAX_D * 0.75, amp, hue);
            }
        }

        // ── BOTTOM — low-mid (bins 32–63) → bars grow UP ───────────
        {
            const eW = r.width - CR * 2;
            const bW = eW / N;
            const x0 = r.left + CR;
            for (let i = 0; i < N; i++) {
                const amp = smooth[32 + i];
                const len = amp * MAX_D * 0.75;
                const hue = (rgbHue + 270 + i * 4) % 360;
                seg(x0 + i * bW + GAP, r.bottom - len, bW - GAP * 2, len, amp, hue);
            }
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    draw();
}



// Map note name (e.g. C#4) to frequency
function noteToFreq(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = parseInt(note.slice(-1));
    const keyNumber = notes.indexOf(note.slice(0, -1));

    if (keyNumber < 0) return 0;

    // A4 = 440Hz is note 9 in octave 4. Formula: f = 440 * 2^((n - 49)/12)
    // C0 is key 0. A4 is key 57.
    const keyOffset = (octave * 12) + keyNumber;
    return 440 * Math.pow(2, (keyOffset - 57) / 12);
}


// Fixed duration chords (for timeline playback)
function playChordString(chordName, durationSec = 1.0) {
    const stopFn = playSustainedChord(chordName);
    if (stopFn) {
        setTimeout(stopFn, durationSec * 1000);
    }
}

// Melody / Arpeggio sequence playback
function playArpeggiatedChord(chordName, durationSec, secondsPerBar) {
    initAudio();
    const notes = CHORDS[chordName];
    if (!notes || notes.length === 0) return;

    const offset = getGlobalTransposeOffset();
    const now = audioCtx.currentTime;

    const synthPatch = document.getElementById('synthPatchSelect') ? document.getElementById('synthPatchSelect').value : 'pad';
    const playbackStyle = document.getElementById('playbackStyleSelect') ? document.getElementById('playbackStyleSelect').value : 'arpeggio';

    let notesPerBar = 8;
    let pattern = [0, 1, 2, 1]; // Default simple arpeggio

    if (playbackStyle === 'arpeggio_fast') {
        notesPerBar = 16;
        pattern = [0, 1, 2, 1, 0, 2, 1, 2];
    } else if (playbackStyle === 'arpeggio_updown_fast') {
        notesPerBar = 16;
        pattern = [0, 1, 2, 3, 2, 1, 0, 1]; // Wider arpeggio
    } else if (playbackStyle === 'random_arp') {
        notesPerBar = 16;
        pattern = Array.from({ length: 16 }, () => Math.floor(Math.random() * 4));
    } else if (playbackStyle === 'chord_pulse') {
        notesPerBar = 8;
        // Pulse plays blocks of chords. Array means play them simultaneously.
        pattern = [[0, 1, 2], [0, 1, 2], -1, [0, 1, 2], [0, 1, 2], [0, 1, 2], -1, [0, 1, 2]];
    } else if (playbackStyle === 'rhythmic_chop') {
        notesPerBar = 8;
        pattern = [0, 1, -1, 2, 1, -1, 0, 2]; // -1 means rest
    } else if (playbackStyle === 'waltz_feel') {
        notesPerBar = 6;
        pattern = [0, 1, 2, 0, 1, 2];
    }

    const totalNotes = Math.round(durationSec / (secondsPerBar / notesPerBar));
    const stepDuration = secondsPerBar / notesPerBar;

    for (let i = 0; i < totalNotes; i++) {
        const pItem = pattern[i % pattern.length];
        if (pItem === -1) continue; // Rest

        const noteIndices = Array.isArray(pItem) ? pItem : [pItem];

        noteIndices.forEach(noteIdx => {
            const noteName = notes[noteIdx % notes.length];
            const freq = noteToFreq(transposeNote(noteName, offset));

            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            const startTime = now + i * stepDuration;
            const endTime = now + (i + 1) * stepDuration;

            let filter = null;
            if (synthPatch === 'synth_brass' || synthPatch === 'bass') {
                filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(synthPatch === 'bass' ? 600 : 2000, startTime);
                // Simple envelope for the filter
                filter.frequency.exponentialRampToValueAtTime(synthPatch === 'bass' ? 200 : 800, endTime);
            }

            if (synthPatch === 'keys') {
                osc.type = 'sine';
                gainNode.gain.setValueAtTime(0, startTime);
                // Reduce peak gain slightly
                gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.03);
                gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);
            } else if (synthPatch === 'sad_flute') {
                osc.type = 'sine';
                const lfo = audioCtx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = 5.5;
                const lfoGain = audioCtx.createGain();

                lfoGain.gain.setValueAtTime(0, startTime);
                lfoGain.gain.linearRampToValueAtTime(15, startTime + 0.4);

                lfo.connect(lfoGain);
                lfoGain.connect(osc.detune);
                lfo.start(startTime);
                lfo.stop(endTime + 0.5);

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.15); // softer attack
                gainNode.gain.linearRampToValueAtTime(0.15, endTime - 0.1);
                gainNode.gain.linearRampToValueAtTime(0, endTime + 0.05); // Clean release, avoid exponential zero
            } else if (synthPatch === 'ethereal_pad') {
                osc.type = 'sine';
                osc.detune.setValueAtTime(i % 2 === 0 ? 12 : -12, startTime);
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.2); // lowered gain
                gainNode.gain.linearRampToValueAtTime(0, endTime + 0.5); // clean release
            } else if (synthPatch === 'synth_brass') {
                osc.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.05); // lowered to prevent saw tearing
                gainNode.gain.exponentialRampToValueAtTime(0.01, endTime - 0.05);
            } else if (synthPatch === 'pluck') {
                osc.type = 'triangle';
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, endTime - 0.05);
            } else if (synthPatch === 'bass') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq / 2, startTime);
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, endTime - 0.05);
            } else {
                osc.type = 'triangle';
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0, endTime); // safe release
            }

            if (synthPatch === 'sad_flute') {
                osc.frequency.setValueAtTime(freq * 2, startTime);
            } else if (synthPatch !== 'bass') {
                osc.frequency.setValueAtTime(freq, startTime);
            }

            if (filter) {
                osc.connect(filter);
                filter.connect(gainNode);
            } else {
                osc.connect(gainNode);
            }

            // Route through analyser (analyser→compressor is already wired in initAudio)
            if (analyser) {
                gainNode.connect(analyser);
            } else {
                gainNode.connect(masterCompressor);
            }

            if ((synthPatch === 'ethereal_pad' || synthPatch === 'sad_flute') && globalReverbNode) {
                gainNode.connect(globalReverbNode);
            }

            osc.start(startTime);
            osc.stop(endTime + ((synthPatch === 'ethereal_pad' || synthPatch === 'sad_flute') ? 0.5 : 0)); // Allow pad to ring out briefly
        });
    }
}

// Sustained chords (for holding mousedown)
// Returns a function to call when the chord should stop (release)
function playSustainedChord(chordName) {
    initAudio();
    const notes = CHORDS[chordName];
    if (!notes) return null;

    const offset = getGlobalTransposeOffset();
    const now = audioCtx.currentTime;
    let activeNodes = [];

    notes.forEach(noteName => {
        const transposedNote = transposeNote(noteName, offset);
        const freq = noteToFreq(transposedNote);

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Check Synth Patch Selection
        const synthPatch = document.getElementById('synthPatchSelect') ? document.getElementById('synthPatchSelect').value : 'pad';

        // Set default frequency
        osc.frequency.setValueAtTime(freq, now);

        let filter = null;
        if (synthPatch === 'synth_brass' || synthPatch === 'bass') {
            filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(synthPatch === 'bass' ? 600 : 2500, now);
            // Envelope for sustained notes
            filter.frequency.exponentialRampToValueAtTime(synthPatch === 'bass' ? 300 : 1200, now + 0.5);
        }

        if (synthPatch === 'keys') {
            osc.type = 'sine';
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        } else if (synthPatch === 'sad_flute') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq * 2, now);

            const lfo = audioCtx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 5.0;
            const lfoGain = audioCtx.createGain();

            lfoGain.gain.setValueAtTime(0, now);
            lfoGain.gain.linearRampToValueAtTime(20, now + 0.8);

            lfo.connect(lfoGain);
            lfoGain.connect(osc.detune);
            lfo.start(now);
            activeNodes.push({ osc: lfo, gainNode: lfoGain });

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.2); // lowered gain
            gainNode.gain.linearRampToValueAtTime(0.2, now + 1.0);
        } else if (synthPatch === 'ethereal_pad') {
            osc.type = 'sine';
            osc.detune.setValueAtTime(Math.random() * 20 - 10, now);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.5); // lowered gain
            gainNode.gain.exponentialRampToValueAtTime(0.02, now + 3.0);
        } else if (synthPatch === 'synth_brass') {
            osc.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.12, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.5);
        } else if (synthPatch === 'pluck') {
            osc.type = 'triangle';
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        } else if (synthPatch === 'bass') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq / 2, now);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.03, now + 0.5);
        } else {
            // Default Pad
            osc.type = 'triangle';
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.3);
        }

        if (filter) {
            osc.connect(filter);
            filter.connect(gainNode);
        } else {
            osc.connect(gainNode);
        }

        // Route through analyser (analyser→compressor is already wired in initAudio)
        if (analyser) {
            gainNode.connect(analyser);
        } else {
            gainNode.connect(masterCompressor);
        }

        if ((synthPatch === 'ethereal_pad' || synthPatch === 'sad_flute') && globalReverbNode) {
            gainNode.connect(globalReverbNode);
        }

        osc.start(now);
        activeNodes.push({ osc, gainNode });
    });

    // Return the stop function
    return () => {
        const stopTime = audioCtx.currentTime;
        activeNodes.forEach(({ osc, gainNode }) => {
            // Anti-click release curve
            const currentGain = gainNode.gain.value;
            gainNode.gain.cancelScheduledValues(stopTime);
            gainNode.gain.setValueAtTime(currentGain, stopTime);
            gainNode.gain.linearRampToValueAtTime(0, stopTime + 0.05); // 50ms fade out removes click
            osc.stop(stopTime + 0.05);
        });
    };
}

async function playTimeline(targetSectionIndex = -1) {
    if (isPlaying) {
        stopTimeline();
        // Give it a tiny delay to clean up before restarting
        await new Promise(r => setTimeout(r, 50));
    }

    currentPlayingSectionIdx = targetSectionIndex;

    // Update button visual states
    if (targetSectionIndex !== -1) {
        const activeBtn = document.getElementById(`playBtn_sec_${targetSectionIndex}`);
        if (activeBtn) activeBtn.innerText = '⏹ Durdur';
    } else {
        const mainPlayBtn = document.getElementById('btnPlayAll');
        if (mainPlayBtn) {
            mainPlayBtn.innerText = '⏹ Tümünü Durdur';
        }
    }

    initAudio();

    const bpm = parseInt(document.getElementById('bpm').value) || 95;
    const tempoFeel = document.getElementById('tempoFeel') ? document.getElementById('tempoFeel').value : 'Normal';

    isPlaying = true;

    // Flatten chords into a playable list with references to UI elements
    let flatTimeline = [];
    currentArrangement.forEach((sec, sIdx) => {
        // If a target section is provided, skip other sections
        if (targetSectionIndex !== -1 && targetSectionIndex !== sIdx) return;

        sec.chords.forEach((chordObj, cIdx) => {
            // Unroll repeats so the audio plays it repeatedly
            for (let r = 0; r < chordObj.repeats; r++) {
                flatTimeline.push({
                    chord: chordObj.name,
                    id: chordObj.id, // Ensure we use the actual DOM element ID
                    repeats: chordObj.repeats // Store repeats for dynamic duration
                });
            }
        });
    });

    let currentIndex = 0;

    function playNext() {
        if (!isPlaying || flatTimeline.length === 0) {
            isPlaying = false;
            document.querySelectorAll('.chord-card').forEach(c => c.classList.remove('playing'));
            return;
        }

        // Loop back to start if we reached the end
        if (currentIndex >= flatTimeline.length) {
            currentIndex = 0;
        }

        const step = flatTimeline[currentIndex];

        // UI
        document.querySelectorAll('.chord-card').forEach(c => c.classList.remove('playing'));
        const el = document.getElementById(step.id);
        if (el) {
            el.classList.add('playing');
            // Scroll to view if needed
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Audio
        // Duration of a full bar
        let secondsPerBar = (60 / bpm) * 4;

        if (tempoFeel === 'Half-Time') {
            secondsPerBar *= 2; // Chords are held twice as long
        } else if (tempoFeel === 'Double-Time') {
            secondsPerBar /= 2; // Chords fly by twice as fast
        }

        // We assume 1 repeat = 1 bar
        // Time in ms before next chord
        const durationMs = secondsPerBar * step.repeats * 1000;

        const playbackStyle = document.getElementById('playbackStyleSelect');
        if (playbackStyle && playbackStyle.value !== 'chords') {
            playArpeggiatedChord(step.chord, secondsPerBar * step.repeats, secondsPerBar);
        } else {
            playChordString(step.chord, secondsPerBar * step.repeats); // Play for the actual duration of the chord
        }

        currentIndex++;
        currentTimeout = setTimeout(playNext, durationMs);
    }

    playNext();
}

function stopTimeline() {
    isPlaying = false;
    currentPlayingSectionIdx = -1;
    clearTimeout(currentTimeout);
    document.querySelectorAll('.chord-card').forEach(c => c.classList.remove('playing'));

    // Reset all section buttons
    document.querySelectorAll('.section-play-btn').forEach(btn => btn.innerText = '▶ Çal');

    const mainPlayBtn = document.getElementById('btnPlayAll');
    if (mainPlayBtn) {
        // Find text node inside and update to play icon if it had a stop icon
        mainPlayBtn.innerText = '▶ Tümünü Çal';
    }
}

// --- Suno AI Prompt Generator ---

function generateSunoPrompt() {
    document.getElementById('promptOutputContainer').style.display = 'flex';
    document.getElementById('promptOutputContainer').style.flexDirection = 'column';

    // 1. Style / Genre
    const bpm = document.getElementById('bpm') ? document.getElementById('bpm').value : '95';
    const genre = document.getElementById('genreSelect') ? document.getElementById('genreSelect').value : 'Turkish Pop';
    const mood = document.getElementById('moodSelect') ? document.getElementById('moodSelect').value : 'Melancholic, Emotional';
    const scale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
    const keySig = document.getElementById('keySelect') ? document.getElementById('keySelect').value : 'C#';
    const tempoFeel = document.getElementById('tempoFeel') ? document.getElementById('tempoFeel').value : 'Normal';

    // Grab layers
    const instRhythm = document.getElementById('instRhythm') ? document.getElementById('instRhythm').value : '';
    const instBass = document.getElementById('instBass') ? document.getElementById('instBass').value : '';
    const instHarmony = document.getElementById('instHarmony') ? document.getElementById('instHarmony').value : '';
    const instLead = document.getElementById('instLead') ? document.getElementById('instLead').value : '';
    const instAtmosphere = document.getElementById('instAtmosphere') ? document.getElementById('instAtmosphere').value : '';

    let layerArr = [];
    if (instRhythm) layerArr.push(instRhythm);
    if (instBass) layerArr.push(instBass);
    if (instHarmony) layerArr.push(instHarmony);
    if (instLead) layerArr.push(instLead);
    if (instAtmosphere) layerArr.push(instAtmosphere);

    let feelText = '';
    if (tempoFeel === 'Half-Time') feelText = 'Half-Time Feel, ';
    else if (tempoFeel === 'Double-Time') feelText = 'Double-Time Feel, ';

    // Extract basic scale flavor (e.g. "C# Harmonic Minor" -> "Harmonic Minor")
    let scaleFlavor = scale.includes(' ') ? scale.substring(scale.indexOf(' ') + 1) : scale;
    // Build combined Key Signature
    let finalKeySig = `Key of ${keySig} ${scaleFlavor}`;

    // Octave → Register descriptor (mirrors how octave affects the audio)
    const octaveVal = document.getElementById('octaveSelect') ? parseInt(document.getElementById('octaveSelect').value) : 0;
    const OCTAVE_LABELS = {
        2: 'very high register, airy and bright, crystal clear highs',
        1: 'high register, bright tonal range',
        0: '', // default — no extra label needed
        '-1': 'low register, deep bass presence, dark low-end',
        '-2': 'very low register, sub-heavy, dark cinematic depth'
    };
    const octaveLabel = OCTAVE_LABELS[octaveVal] || '';

    let stylePrompt = `${genre}, ${mood}, ${finalKeySig}, ${feelText}${bpm} BPM`;
    if (octaveLabel) stylePrompt += `, ${octaveLabel}`;
    if (layerArr.length > 0) {
        stylePrompt += `, ${layerArr.join(', ')}`;
    } else {
        stylePrompt += `, Cinematic strings, deep beat`;
    }

    // PERSONA OVERRIDE: use sunoStyle (English) + genderCode (English vocal label)
    if (activePersona && PERSONA_LIBRARY[activePersona]) {
        const persona = PERSONA_LIBRARY[activePersona];
        stylePrompt = `${persona.sunoStyle}, ${stylePrompt}`; // Prepend persona-specific vocal style
    } else {
        // Default: read from global vocal gender dropdown if present
        const globalGender = document.getElementById('vocalGenderSelect') ? document.getElementById('vocalGenderSelect').value : '';
        if (globalGender === 'Kadın') stylePrompt += `, Female Vocals`;
        else if (globalGender === 'Erkek') stylePrompt += `, Male Vocals`;
        else if (globalGender === 'Koro') stylePrompt += `, Choir / Group Vocals`;
        else if (globalGender === 'inst') stylePrompt += `, Instrumental, No Vocals`;
        else stylePrompt += `, Male and Female vocal duet`;
    }

    // Append Target Duration
    const durationValue = document.getElementById('songDuration') ? document.getElementById('songDuration').value : '';
    if (durationValue) {
        stylePrompt += `, ~${durationValue} minutes duration`;
    }

    // Enforce max 1000 characters limit for style tag
    if (stylePrompt.length > 1000) {
        stylePrompt = stylePrompt.substring(0, 997) + '...';
    }

    document.getElementById('sunoStyleOutput').value = stylePrompt;

    // 3. Custom Lyrics — paragraph-aware parsing
    const customLyrics = document.getElementById('customLyricsInput') ? document.getElementById('customLyricsInput').value : '';

    // Split into paragraphs first (blocks separated by one or more blank lines)
    const rawParagraphs = customLyrics.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
    const hasParagraphs = rawParagraphs.length > 1;  // user explicitly divided text into blocks

    // Known section keywords (TR + EN)
    const SECTION_KEYWORDS = /\b(verse|s[oö]z|nakarat|chorus|bridge|k[oö]pr[uü]|intro|giri[sş]|outro|[cç][iı]k[iı][sş]|hook|kanca|interlude|ara|pre|breakdown|refrain|couplet|bölüm|refrein)\b/i;

    /**
     * Parse a paragraph: if its first line looks like a section label, extract it.
     * Returns { label: string|null, body: string }
     * Works with: [Verse 1], Verse 1:, Verse 1, NAKARAT, Bridge — no brackets needed.
     */
    function parseParagraph(paraText) {
        const lines = paraText.split('\n');
        const firstLine = lines[0].trim();
        // A label line is: short (≤40 chars) AND contains a section keyword OR is inside brackets
        const isBracketed = /^\[.+\]$/.test(firstLine);
        const isKeyword = firstLine.length <= 40 && SECTION_KEYWORDS.test(firstLine);
        if (isBracketed || isKeyword) {
            const label = firstLine.replace(/^\[/, '').replace(/\]$/, '').replace(/:?\s*$/, '').trim();
            const body = lines.slice(1).join('\n').trim();
            return { label, body };
        }
        return { label: null, body: paraText };
    }

    // Pre-parse all paragraphs
    const parsedParagraphs = rawParagraphs.map(parseParagraph);

    // Use paragraph mode if: multiple blank-line-separated blocks
    //   OR even a single block if it starts with a detectable section label
    const hasAnyLabel = parsedParagraphs.some(p => p.label !== null);
    const useParagraphMode = rawParagraphs.length > 1 || hasAnyLabel;

    let lyricsParagraphs = [];   // array of {label, body} objects
    let customLyricsLines = [];  // flat lines for fallback mode
    let lyricIndex = 0;

    if (useParagraphMode) {
        lyricsParagraphs = parsedParagraphs;
    } else {
        // No blank lines and no labels → classic line-by-line distribution
        customLyricsLines = customLyrics ? customLyrics.split('\n').filter(l => l.trim() !== '') : [];
    }

    let lyricsPrompt = '';

    const transposeOffset = getGlobalTransposeOffset();

    // Prompt Language setting
    const promptLang = document.getElementById('promptLangSelect') ? document.getElementById('promptLangSelect').value : 'en';
    // Section type label maps
    const SECTION_LABELS_EN = { intro: 'Intro', verse: 'Verse', chorus: 'Chorus', bridge: 'Bridge', break: 'Instrumental Break', outro: 'Outro', interlude: 'Interlude', hook: 'Hook', prebr: 'Pre-Bridge', prechorus: 'Pre-Chorus', breakdown: 'Breakdown' };
    const SECTION_LABELS_TR = { intro: 'Giriş', verse: 'Dörtlük', chorus: 'Nakarat', bridge: 'Köprü', break: 'Vokal Arası', outro: 'Kapanış', interlude: 'Ara', hook: 'Kanca', prebr: 'Ön-Köprü', prechorus: 'Ön-Nakarat', breakdown: 'Yavaşlama' };
    function getSectionLabel(type) {
        const t = (type || '').toLowerCase();
        if (promptLang === 'tr') return SECTION_LABELS_TR[t] || (t.charAt(0).toUpperCase() + t.slice(1));
        if (promptLang === 'mixed') return `${SECTION_LABELS_EN[t] || t} / ${SECTION_LABELS_TR[t] || t}`;
        return SECTION_LABELS_EN[t] || (t.charAt(0).toUpperCase() + t.slice(1));
    }

    // Generate Negative Prompt from Active Chips
    const activeChips = Array.from(document.querySelectorAll('.chip.active'));
    const negativeSetupArr = activeChips.map(c => c.getAttribute('data-value'));
    const combinedNegative = negativeSetupArr.join(', ');

    if (document.getElementById('sunoNegativeOutput')) {
        document.getElementById('sunoNegativeOutput').value = combinedNegative;
    }

    // ── Section counter for paragraph matching ──────────────────────
    let secIndex = 0;

    currentArrangement.forEach((sec) => {
        // ── Chord string ────────────────────────────────────────────
        const chordString = sec.chords.map(c => {
            let displayChordName = transposeChordName(c.name, transposeOffset);
            return c.repeats > 1 ? `${displayChordName}(x${c.repeats})` : displayChordName;
        }).join(' - ');

        // ── Vocal gender code ────────────────────────────────────────
        let genderCode = '';
        if (sec.vocalGender) {
            if (sec.vocalGender.includes('Erkek')) genderCode = 'Male Vocal';
            else if (sec.vocalGender.includes('Kadın')) genderCode = 'Female Vocal';
            else if (sec.vocalGender.includes('Koro')) genderCode = 'Choir';
            else if (sec.vocalGender.includes('Düet')) genderCode = 'Duet';
            else if (sec.vocalGender.includes('Yok')) genderCode = 'Instrumental';
        }
        if (activePersona && PERSONA_LIBRARY[activePersona] && (!sec.vocalGender || sec.vocalGender === 'Varsayılan')) {
            genderCode = PERSONA_LIBRARY[activePersona].genderCode;
        }

        // ── Vocal style hint ─────────────────────────────────────────
        let vocalHint = (sec.vocalStyle && sec.vocalStyle !== 'Pop / Melodic') ? sec.vocalStyle : '';

        // ── Build section bracket parts ──────────────────────────────
        let sectionLabel = getSectionLabel(sec.type);
        const barCount = sec.duration || 4;
        const sylCount = sec.syllableCount || 0;

        // Combine extras inside the bracket
        let bracketParts = [sectionLabel];
        if (barCount) bracketParts.push(`${barCount} bars`);
        if (genderCode && genderCode !== 'Instrumental') bracketParts.push(genderCode);
        if (vocalHint) bracketParts.push(vocalHint);

        const bracketLine = `[${bracketParts.join(', ')}]`;

        // ── BREAK / INSTRUMENTAL section ─────────────────────────────
        if (sec.type === 'break' || genderCode === 'Instrumental') {
            lyricsPrompt += `${bracketLine}\n`;
            if (sec.perfHint) lyricsPrompt += `${sec.perfHint}\n`;
            lyricsPrompt += `[Chords: ${chordString}]\n`;
            lyricsPrompt += `[No Vocals, Instrumental Fill]\n\n`;
            secIndex++;
            return;
        }

        // ── Normal vocal section ─────────────────────────────────────
        lyricsPrompt += `${bracketLine}\n`;
        if (sec.perfHint) lyricsPrompt += `${sec.perfHint}\n`;
        lyricsPrompt += `[Chords: ${chordString}]\n`;

        // Syllable rhythm hint (only when we have syl data)
        if (sylCount > 0) {
            const density = sylCount / barCount;
            const rhythmDesc = density > 5 ? 'fast, dense rhythm'
                : density > 3 ? 'flowing, natural rhythm'
                    : 'slow, expressive rhythm';
            lyricsPrompt += `[~${sylCount} syllables, ${rhythmDesc}]\n`;
        }

        // ── Lyrics body ──────────────────────────────────────────────
        if (useParagraphMode) {
            const para = lyricsParagraphs[secIndex];
            if (para) {
                if (para.label) {
                    // Use user's own label — rewrite the bracket line
                    lyricsPrompt = lyricsPrompt.slice(0, lyricsPrompt.lastIndexOf(bracketLine));
                    const userBracket = `[${para.label}, ${barCount} bars${genderCode ? ', ' + genderCode : ''}]`;
                    lyricsPrompt += `${userBracket}\n`;
                    if (sec.perfHint) lyricsPrompt += `${sec.perfHint}\n`;
                    lyricsPrompt += `[Chords: ${chordString}]\n`;
                    if (sylCount > 0) {
                        const density = sylCount / barCount;
                        const rhythmDesc = density > 5 ? 'fast, dense rhythm' : density > 3 ? 'flowing, natural rhythm' : 'slow, expressive rhythm';
                        lyricsPrompt += `[~${sylCount} syllables, ${rhythmDesc}]\n`;
                    }
                }
                lyricsPrompt += (para.body || '') + '\n\n';
            } else {
                lyricsPrompt += `[Melody Continues]\n\n`;
            }
        } else if (customLyricsLines.length > 0) {
            let linesToTake = barCount >= 8 ? 4 : 2;
            let sectionLyrics = [];
            for (let i = 0; i < linesToTake && lyricIndex < customLyricsLines.length; i++) {
                sectionLyrics.push(customLyricsLines[lyricIndex++]);
            }
            lyricsPrompt += sectionLyrics.length > 0
                ? sectionLyrics.join('\n') + '\n\n'
                : `[Rhythm Continues]\n\n`;
        } else {
            // Tasteful filler per section type
            const FILLERS = {
                intro: `[Instrumental Intro, Melodic Build]\n`,
                verse: `Gözlerimde bir boşluk var, seni arayan\nHer sokakta izlerin, kalbimi yaralayan\n`,
                chorus: `Bu gece son bir kez gel, gölgelere soralım\nYarım kalan ne varsa, ateşlerde yakalım\n`,
                bridge: `Kader miydi bizi ayıran, yoksa biz miydik?\nSonbahar gibi solup gittik, hiç mi sevmedik?\n`,
                outro: `[Fade Out, Veda Notaları]\n`,
            };
            lyricsPrompt += (FILLERS[sec.type] || `[Melody Only]\n`) + '\n';
        }

        secIndex++;
    });

    // ── Fallback: no arrangement but lyrics typed ────────────────────
    if (!lyricsPrompt.trim() && customLyrics.trim()) {
        if (useParagraphMode) {
            lyricsParagraphs.forEach(para => {
                if (para.label) lyricsPrompt += `[${para.label}]\n`;
                lyricsPrompt += (para.body || '') + '\n\n';
            });
        } else {
            lyricsPrompt = customLyrics;
        }
    }

    document.getElementById('sunoLyricsOutput').value = lyricsPrompt;
}

// --- MIDI Export (Multi-Track by Instrument Layer, using local MidiBuilder) ---
function exportMIDI() {
    if (typeof MidiBuilder === 'undefined') {
        alert('MIDI modülü yüklenemedi. midi.js dosyasının ArrangerApp klasöründe olduğundan emin olun.');
        return;
    }
    if (currentArrangement.length === 0) {
        alert('Lütfen önce aranje oluşturun.');
        return;
    }

    const bpm = parseInt(document.getElementById('bpm')?.value) || 95;
    const offset = getGlobalTransposeOffset();
    const midi = new MidiBuilder(bpm);
    const TPB = midi.ticksPerBar; // ticks per bar (= tpq * 4)
    const TPQ = midi.tpq;         // ticks per quarter note

    // --- General MIDI program number maps per instrument slot ---
    const BASS_GM = { '': 32, 'Synth Bass': 38, '808 Sub Bass': 38, 'Electric Bass': 33, 'Upright Bass': 32, 'Reese Bass': 38 };
    const HARMONY_GM = { '': 0, 'Grand Piano': 0, 'Electric Piano': 4, 'Acoustic Guitar': 25, 'Clean Electric Guitar': 27, 'Analog Synth Pad': 89 };
    const LEAD_GM = { '': 80, 'Vocal Chops': 52, 'Distorted Electric Guitar': 29, 'Ney Flute': 73, 'Pluck Synth': 45, 'Violin Solo': 40 };
    const ATMO_GM = { '': 48, 'Epic Strings': 48, 'Ethereal Choir': 52, 'Dark Ambient Drone': 55, 'Vinyl Crackle Noise': 55, 'Brass Section': 61 };

    const instHarmVal = document.getElementById('instHarmony')?.value || '';
    const instBassVal = document.getElementById('instBass')?.value || '';
    const instLeadVal = document.getElementById('instLead')?.value || '';
    const instAtmoVal = document.getElementById('instAtmosphere')?.value || '';

    // Resolve chord notes with baseName fallback + transposition
    function resolveNotes(chordObj) {
        let notes = CHORDS[chordObj.name] || CHORDS[chordObj.baseName];
        if (!notes) return null;
        if (offset !== 0) notes = notes.map(n => transposeNote(n, offset));
        return notes;
    }

    function dropOctave(noteStr, amount) {
        const m = noteStr.match(/^([A-G][#b]?)(\d)$/);
        if (!m) return noteStr;
        return m[1] + Math.max(1, parseInt(m[2]) - amount);
    }

    // ===== Build event streams for each track =====
    const harmEvents = [{ type: 'program', channel: 0, program: HARMONY_GM[instHarmVal] ?? 0 }];
    const bassEvents = [{ type: 'program', channel: 1, program: BASS_GM[instBassVal] ?? 32 }];
    const leadEvents = [{ type: 'program', channel: 2, program: LEAD_GM[instLeadVal] ?? 80 }];
    const atmoEvents = [{ type: 'program', channel: 3, program: ATMO_GM[instAtmoVal] ?? 48 }];

    let currentTick = 0;

    currentArrangement.forEach(sec => {
        sec.chords.forEach(chordObj => {
            const notes = resolveNotes(chordObj);
            const barTicks = TPB * (chordObj.repeats || 1);

            if (notes && notes.length > 0) {
                // --- Harmony: all notes together for the full bar duration ---
                notes.forEach(n => harmEvents.push({
                    type: 'note', channel: 0,
                    tick: currentTick, durationTicks: barTicks - 20,
                    pitch: n, velocity: 80
                }));

                // --- Bass: root note, dropped 2 octaves ---
                const bassNote = dropOctave(notes[0], 2);
                bassEvents.push({
                    type: 'note', channel: 1,
                    tick: currentTick, durationTicks: barTicks - 20,
                    pitch: bassNote, velocity: 100
                });

                // --- Lead: arpeggio at quarter-note resolution ---
                const arpPattern = [notes[0], notes[1] || notes[0], notes[2] || notes[0], notes[0]];
                arpPattern.forEach((n, i) => leadEvents.push({
                    type: 'note', channel: 2,
                    tick: currentTick + i * TPQ, durationTicks: TPQ - 20,
                    pitch: n, velocity: 70
                }));
                // Fill remaining beats if repeats > 1
                if ((chordObj.repeats || 1) > 1) {
                    for (let r = 1; r < (chordObj.repeats || 1); r++) {
                        arpPattern.forEach((n, i) => leadEvents.push({
                            type: 'note', channel: 2,
                            tick: currentTick + r * TPB + i * TPQ, durationTicks: TPQ - 20,
                            pitch: n, velocity: 70
                        }));
                    }
                }

                // --- Atmosphere: root + 5th, 1 octave down ---
                if (notes.length >= 2) {
                    [dropOctave(notes[0], 1), dropOctave(notes[notes.length - 1], 1)].forEach(n =>
                        atmoEvents.push({
                            type: 'note', channel: 3,
                            tick: currentTick, durationTicks: barTicks - 20,
                            pitch: n, velocity: 55
                        })
                    );
                }
            }

            currentTick += barTicks;
        });
    });

    // ===== Build and download =====
    try {
        const trackData = [
            midi.buildTrack(harmEvents),
            midi.buildTrack(bassEvents),
            midi.buildTrack(leadEvents),
            midi.buildTrack(atmoEvents)
        ];
        const uri = midi.buildDataUri(trackData);
        const a = document.createElement('a');
        a.href = uri;
        a.download = 'Procedural_Chord_Studio_Arrangement.mid';
        a.click();
    } catch (err) {
        alert('MIDI dışa aktarma hatası: ' + err.message);
        console.error('[MIDI Export Error]', err);
    }
}

// --- Setup Event Listeners ---
document.getElementById('btnGenerateStructure').addEventListener('click', () => {
    stopTimeline();
    const minutes = parseFloat(document.getElementById('songDuration').value) || 3.0;
    const bpm = parseInt(document.getElementById('bpm').value) || 95;

    currentArrangement = generateStructure(minutes, bpm);
    document.getElementById('timelineSection').style.display = 'block';
    renderTimeline();

    // Emerald energy animation on the button
    const btn = document.getElementById('btnGenerateStructure');
    btn.classList.remove('emerald-energy');
    void btn.offsetWidth; // reflow to restart animation
    btn.classList.add('emerald-energy');
    setTimeout(() => btn.classList.remove('emerald-energy'), 800);
});

document.getElementById('btnPlayAll').addEventListener('click', () => {
    if (isPlaying) {
        stopTimeline();
    } else {
        playTimeline(-1);
    }
});

document.getElementById('btnStop').addEventListener('click', stopTimeline);
document.getElementById('btnGeneratePrompt').addEventListener('click', generateSunoPrompt);
document.getElementById('btnExportBaseMIDI').addEventListener('click', exportMIDI);

document.getElementById('btnAnalyzeLyrics').addEventListener('click', () => {
    const customLyrics = document.getElementById('customLyricsInput')?.value.trim();
    if (!customLyrics) {
        alert("Lütfen analiz etmek için sözleri kutuya yapıştırın.");
        return;
    }

    // 1. Parse blocks from lyrics text
    const lines = customLyrics.split('\n');
    let parsedBlocks = [];
    let currentBlock = null;
    const SECTION_KW = /\b(intro|giriş|verse|söz|chorus|nakarat|bridge|köprü|outro|çıkış|bitiş|hook|kanca|interlude|ara|pre|breakdown)\b/i;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const isBracketed = trimmed.startsWith('[') && trimmed.endsWith(']');
        const isTagLine = isBracketed || (trimmed.endsWith(':') && trimmed.length < 30) ||
            (trimmed.length < 35 && SECTION_KW.test(trimmed));

        if (isTagLine) {
            let l = trimmed.toLowerCase().replace(/[\[\]:]/g, '');
            let type = 'verse';
            if (/intro|giri/.test(l)) type = 'intro';
            else if (/chorus|nakarat/.test(l)) type = 'chorus';
            else if (/bridge|k.pr/.test(l)) type = 'bridge';
            else if (/outro|.k.|biti/.test(l)) type = 'outro';

            // Keep the original label text (clean)
            const label = trimmed.replace(/^[\[]/, '').replace(/[\]]$/, '').replace(/:$/, '').trim();
            if (currentBlock) parsedBlocks.push(currentBlock);
            currentBlock = { type, label, lines: [] };
        } else {
            if (!currentBlock) currentBlock = { type: 'verse', label: 'Verse', lines: [] };
            currentBlock.lines.push(trimmed);
        }
    });
    if (currentBlock) parsedBlocks.push(currentBlock);

    if (parsedBlocks.length === 0) {
        alert("Geçerli bir söz yapısı algılanamadı.");
        return;
    }

    const currentScale = document.getElementById('scaleSelect')?.value || 'C# Harmonic Minor';

    // Helper: build a chord array for a given section type and bar count
    function buildChords(sectionType, barCount) {
        const patterns = PROGRESSION_PATTERNS[sectionType] || PROGRESSION_PATTERNS['verse'];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        const chords = [];
        for (let i = 0; i < barCount; i++) {
            const baseName = pattern[i % pattern.length];
            chords.push({
                baseName,
                originalBaseName: baseName,
                name: SCALE_TRANSFORM[baseName] ? (SCALE_TRANSFORM[baseName][currentScale] || baseName) : baseName,
                repeats: 1,
                id: Math.random().toString(36).substr(2, 9)
            });
        }
        return chords;
    }

    // Helper: BPM-aware bar calculation
    // Formula: bars = syllables / (BPM/60 * 4 beats * 0.75 avg-syl/beat)
    // Result snapped to nearest multiple of 4, clamped 4-32
    function calcBars(block) {
        const combined = block.lines.join(' ');
        const vowels = combined.match(/[ae\u0131io\u00f6u\u00fcAEI\u0130O\u00d6U\u00dc\u00e2\u00ee\u00fb\u00c2\u00ce\u00db]/g);
        let syllables = vowels ? vowels.length : 0;
        const hyphens = combined.match(/-/g);
        if (hyphens && hyphens.length > syllables) syllables = hyphens.length + 1;
        if (syllables === 0) return { bars: 4, syllables: 0 };

        const bpmVal = parseInt(document.getElementById('bpm')?.value) || 95;
        const sylPerBar = (bpmVal / 60) * 4 * 0.75;  // syllables in one 4/4 bar
        const rawBars = syllables / sylPerBar;
        // Snap to nearest 4, clamp 4-32
        const snappedBars = Math.min(32, Math.max(4, Math.round(rawBars / 4) * 4));
        return { bars: snappedBars, syllables };
    }

    // 2. If arrangement is EMPTY → build from scratch from parsed blocks
    if (currentArrangement.length === 0) {
        parsedBlocks.forEach(block => {
            const { bars, syllables } = calcBars(block);
            currentArrangement.push({
                id: 'sec_' + Math.random().toString(36).substr(2, 9),
                type: block.type,
                name: block.label,
                duration: bars,
                syllableCount: syllables,
                chords: buildChords(block.type, bars),
                vocalStyle: 'Pop / Melodic',
                vocalGender: 'Erkek (Male)'
            });
        });
        document.getElementById('timelineSection').style.display = 'block';
        renderTimeline();
        generateSunoPrompt();
        const btn = document.getElementById('btnAnalyzeLyrics');
        btn.classList.add('btn-success-glow');
        btn.innerHTML = '✅ Aranje Oluşturuldu!';
        setTimeout(() => {
            btn.innerHTML = '🧠 Hece & Kalıp Analiz';
            btn.classList.remove('btn-success-glow');
        }, 2800);
        return;
    }

    // 3. Match lyrics blocks to sections
    // Strategy A: if ALL blocks have labels → match by type (existing behavior)
    // Strategy B: if NO labels → distribute blocks in order across sections (plain text mode)
    const allHaveLabels = parsedBlocks.every(b => b.label !== 'Verse');
    const anyHasLabel = parsedBlocks.some(b =>
        /\b(intro|verse|chorus|nakarat|bridge|köprü|outro|break|interlude|hook)\b/i.test(b.label || '')
    );

    let blockIndexByType = { intro: 0, verse: 0, chorus: 0, bridge: 0, outro: 0, break: 0 };
    let plainBlockIdx = 0;  // for unlabeled sequential distribution
    let modifiedAny = false;

    currentArrangement.forEach(sec => {
        let block;

        if (anyHasLabel) {
            // Match by type
            const typeBlocks = parsedBlocks.filter(b => b.type === sec.type);
            block = typeBlocks[blockIndexByType[sec.type] || 0];
            if (!block && parsedBlocks.length > 0) {
                const verseBlocks = parsedBlocks.filter(b => b.type === 'verse');
                block = verseBlocks[0] || parsedBlocks[0];
            }
            if (blockIndexByType[sec.type] !== undefined) blockIndexByType[sec.type]++;
        } else {
            // Plain text mode — distribute in sequence
            block = parsedBlocks[plainBlockIdx];
            plainBlockIdx++;
        }

        if (block) {
            const { bars: targetBars, syllables } = calcBars(block);
            sec.duration = targetBars;
            sec.syllableCount = syllables;
            sec.chords = buildChords(sec.type, targetBars);
            modifiedAny = true;
        }
    });

    // 4. Add any parsed blocks that had no matching section in the arrangement
    parsedBlocks.forEach(block => {
        const exists = currentArrangement.some(s => s.type === block.type);
        if (!exists) {
            const bars = calcBars(block);
            currentArrangement.push({
                id: 'sec_' + Math.random().toString(36).substr(2, 9),
                type: block.type,
                name: block.label,
                duration: bars,
                chords: buildChords(block.type, bars),
                vocalStyle: 'Pop / Melodic',
                vocalGender: 'Erkek (Male)'
            });
            modifiedAny = true;
        }
    });

    if (modifiedAny) {
        renderTimeline();
        generateSunoPrompt();
        const btn = document.getElementById('btnAnalyzeLyrics');
        btn.classList.add('btn-success-glow');
        btn.innerHTML = '✅ Analiz Tamamlandı!';
        setTimeout(() => {
            btn.innerHTML = '🧠 Hece & Kalıp Analiz';
            btn.classList.remove('btn-success-glow');
        }, 2800);
    } else {
        const btn = document.getElementById('btnAnalyzeLyrics');
        btn.classList.add('btn-error-glow');
        setTimeout(() => btn.classList.remove('btn-error-glow'), 2500);
        alert("Sözlerde eşleşecek bölüm bulunamadı — lütfen Verse/Nakarat/Bridge gibi başlıklar ekleyin.");
    }
});  // ← btnAnalyzeLyrics handler end

document.getElementById('btnAddSection').addEventListener('click', () => {

    stopTimeline();

    // Default fallback pattern if the timeline is empty
    const defaultPattern = ['C#m', 'A', 'F#m', 'G#'];
    const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
    let chords = [];

    for (let i = 0; i < 4; i++) {
        const baseName = defaultPattern[i];
        chords.push({
            baseName: baseName,
            originalBaseName: baseName,
            name: SCALE_TRANSFORM[baseName] ? (SCALE_TRANSFORM[baseName][currentScale] || baseName) : baseName,
            repeats: 1,
            id: Math.random().toString(36).substr(2, 9)
        });
    }

    currentArrangement.push({
        id: 'sec_' + Math.random().toString(36).substr(2, 9),
        type: 'verse',
        name: 'Söz (Verse)',
        duration: 4,
        chords: chords,
        vocalStyle: 'Pop / Melodic'
    });

    document.getElementById('timelineSection').style.display = 'block';
    renderTimeline();
    // Scroll to bottom
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
});

document.getElementById('btnClearTimeline').addEventListener('click', () => {
    if (confirm("Tüm aranje dizilimini silmek istediğinize emin misiniz?")) {
        stopTimeline();
        currentArrangement = [];
        document.getElementById('timelineContainer').innerHTML = '';
        document.getElementById('timelineSection').style.display = 'none';
        generateSunoPrompt();
    }
});

document.getElementById('btnApplyGlobalVocal').addEventListener('click', () => {
    const globalStyle = document.getElementById('globalVocalStyle').value;
    const globalGender = document.getElementById('globalVocalGender').value;

    if (!globalStyle && !globalGender) {
        alert("Lütfen önce uygulamak istediğiniz vokal tarzını veya cinsiyeti seçin.");
        return;
    }

    currentArrangement.forEach(section => {
        if (globalStyle) {
            section.vocalStyle = globalStyle;

            // Re-apply Rap / Trap base chord mapping if needed
            const currentScale = document.getElementById('scaleSelect') ? document.getElementById('scaleSelect').value : 'C# Harmonic Minor';
            if (section.vocalStyle === 'Rap / Trap') {
                const tonicName = SCALE_TRANSFORM['C#m'][currentScale] || 'C#m';
                section.chords.forEach(c => {
                    if (!c.originalBaseNameForVocal) c.originalBaseNameForVocal = c.baseName;
                    c.baseName = 'C#m';
                    c.name = tonicName;
                });
            } else {
                section.chords.forEach(c => {
                    if (c.originalBaseNameForVocal) {
                        c.baseName = c.originalBaseNameForVocal;
                        delete c.originalBaseNameForVocal;
                    } else {
                        c.baseName = c.originalBaseName || c.baseName;
                    }
                    if (SCALE_TRANSFORM[c.baseName]) {
                        c.name = SCALE_TRANSFORM[c.baseName][currentScale] || c.baseName;
                    } else {
                        c.name = c.baseName;
                    }
                });
            }
        }

        if (globalGender) {
            section.vocalGender = globalGender;
        }
    });

    renderTimeline();
    generateSunoPrompt();
});

document.getElementById('scaleSelect').addEventListener('change', (e) => {
    const newScale = e.target.value;
    // Keep timelineScaleSelect in sync if it exists
    const timelineScaleSelect = document.getElementById('timelineScaleSelect');
    if (timelineScaleSelect) timelineScaleSelect.value = newScale;

    currentArrangement.forEach(sec => {
        sec.chords.forEach(chord => {
            if (chord.baseName && SCALE_TRANSFORM[chord.baseName]) {
                chord.name = SCALE_TRANSFORM[chord.baseName][newScale] || chord.baseName;
            }
        });
    });
    renderTimeline();
    generateSunoPrompt();
});

document.getElementById('btnApplyTimelineScale').addEventListener('click', () => {
    const timelineScaleSelect = document.getElementById('timelineScaleSelect');
    if (!timelineScaleSelect) return;

    const newScale = timelineScaleSelect.value;

    // Sync back up to the main scale dropdown so everything stays consistent
    const mainScaleSelect = document.getElementById('scaleSelect');
    if (mainScaleSelect) mainScaleSelect.value = newScale;

    // Apply the transformation
    currentArrangement.forEach(sec => {
        // Skip Rap/Trap base override sections to maintain their tonic lock
        if (sec.vocalStyle === 'Rap / Trap') {
            const tonicName = SCALE_TRANSFORM['C#m'][newScale] || 'C#m';
            sec.chords.forEach(c => c.name = tonicName);
            return;
        }

        sec.chords.forEach(chord => {
            if (chord.baseName && SCALE_TRANSFORM[chord.baseName]) {
                chord.name = SCALE_TRANSFORM[chord.baseName][newScale] || chord.baseName;
            }
        });
    });

    renderTimeline();
    generateSunoPrompt();
});

// Lyrics Sidebar Toggle Logic
document.getElementById('btnToggleLyrics').addEventListener('click', () => {
    document.getElementById('lyricsSidebar').classList.toggle('open');
});
document.getElementById('btnCloseLyrics').addEventListener('click', () => {
    document.getElementById('lyricsSidebar').classList.remove('open');
});

function updateMakamNames() {
    const keySigEl = document.getElementById('keySelect');
    const keySig = keySigEl ? keySigEl.value : 'C#';

    // Safety check just in case keySig is somehow empty
    const safeKey = keySig || 'C#';

    const selects = [document.getElementById('scaleSelect'), document.getElementById('timelineScaleSelect')];

    selects.forEach(select => {
        if (!select) return;
        Array.from(select.options).forEach(opt => {
            const originalVal = opt.value; // e.g. "C# Harmonic Minor" or "A Minor (Nihavend)"

            // Skip the default unscaled option
            if (originalVal === 'Varsayılan (Standart Akorlar)') {
                opt.innerText = originalVal;
                return;
            }

            // Split by space, skip the first element (the old root note), and join the rest
            const parts = originalVal.split(' ');
            if (parts.length > 1) {
                parts.shift(); // Remove "C#" or "A" or "D"
                const flavor = parts.join(' ');
                opt.innerText = `${safeKey} ${flavor}`;
            } else {
                opt.innerText = safeKey; // Fallback
            }
        });
    });
}

['genreSelect', 'moodSelect', 'scaleSelect', 'keySelect', 'tempoFeel', 'customLyricsInput', 'instRhythm', 'instBass', 'instHarmony', 'instLead', 'instAtmosphere'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => {
        if (id === 'keySelect') {
            updateMakamNames();
        }
        generateSunoPrompt();
        if (id === 'scaleSelect' || id === 'keySelect') {
            renderTimeline();
        }
    });
    if (el && id === 'customLyricsInput') el.addEventListener('keyup', generateSunoPrompt); // Auto update on keystrokes
});

// Call once on load to set initial state correctly
document.addEventListener('DOMContentLoaded', () => {
    updateMakamNames();
});

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        generateSunoPrompt();
    });
});
// Utility
window.copyText = function (elementId, btnElement) {
    const el = document.getElementById(elementId);
    el.select();
    document.execCommand('copy');

    // Inline success notification instead of alert()
    if (btnElement) {
        let toast = btnElement.parentElement.querySelector('.copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.innerText = 'Kopyalandı!';
            btnElement.parentElement.appendChild(toast);
        }

        // Reset animation by removing and putting back the class
        toast.classList.remove('show');
        // trigger reflow
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => toast.classList.remove('show'), 2000);
    }
};

// === Song Chord Analysis ===
async function analyzeSong() {
    const urlInput = document.getElementById('songAnalysisUrl');
    const loadingDiv = document.getElementById('analysisLoading');
    const resultArea = document.getElementById('songAnalysisResult');

    if (!urlInput || !urlInput.value || !urlInput.value.includes('http')) {
        alert('Lütfen geçerli bir YouTube veya ses bağlantısı girin.');
        return;
    }

    loadingDiv.style.display = 'block';
    resultArea.style.display = 'none';
    resultArea.value = '';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput.value })
        });

        const data = await response.json();

        if (data.status === 'success') {
            resultArea.value = '🎵 Tespit Edilen Akorlar:\n\n' + data.chords;
            resultArea.style.display = 'block';
        } else {
            alert('Analiz sırasında hata oluştu: ' + data.message);
        }
    } catch (e) {
        alert("Sunucuya bağlanılamadı. Lütfen terminalde 'python server.py' komutunun çalıştığından emin olun.\nHata: " + e.message);
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// === Project Save / Load ===
const PROJECT_SETTING_IDS = [
    'songDuration', 'bpm', 'genreSelect', 'moodSelect', 'scaleSelect',
    'keySelect', 'tempoFeel', 'synthPatchSelect', 'playbackStyleSelect',
    'customLyricsInput', 'instRhythm', 'instBass', 'instHarmony', 'instLead', 'instAtmosphere'
];

function collectProjectState() {
    const settings = {};
    PROJECT_SETTING_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) settings[id] = el.value;
    });
    // Which negative chip buttons are active
    settings.negativeChips = [];
    document.querySelectorAll('.chip.active').forEach(chip => {
        settings.negativeChips.push(chip.dataset.value);
    });
    return settings;
}

function openSaveModal() {
    document.getElementById('saveModalOverlay').classList.add('visible');
    setTimeout(() => document.getElementById('saveFieldSongName').focus(), 50);
}

function closeSaveModal() {
    document.getElementById('saveModalOverlay').classList.remove('visible');
}

function confirmSaveProject() {
    const songName = document.getElementById('saveFieldSongName')?.value.trim() || 'Untitled';
    const artistName = document.getElementById('saveFieldArtistName')?.value.trim() || 'Unknown_Artist';
    const projectTag = document.getElementById('saveFieldProjectTag')?.value.trim() || 'General';

    const projectData = {
        version: '1.0',
        metadata: {
            songName,
            artistName,
            projectTag,
            savedAt: new Date().toISOString()
        },
        settings: collectProjectState(),
        arrangement: JSON.parse(JSON.stringify(currentArrangement))
    };

    const json = JSON.stringify(projectData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Build a safe cross-platform filename
    const safeFilename = `${artistName}_-_${songName}_[${projectTag}].pcs`
        .replace(/[^a-zA-Z0-9._\-\[\] ]/g, '_');

    const a = document.createElement('a');
    a.href = url;
    a.download = safeFilename;
    a.click();
    URL.revokeObjectURL(url);
    closeSaveModal();
}

function loadProject(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const projectData = JSON.parse(e.target.result);

            if (!projectData.version || !projectData.arrangement) {
                throw new Error('Geçersiz .pcs dosyası. Eksik alan var.');
            }

            // --- Restore settings ---
            const s = projectData.settings || {};
            PROJECT_SETTING_IDS.forEach(id => {
                const el = document.getElementById(id);
                if (el && s[id] !== undefined) el.value = s[id];
            });

            // --- Restore negative chips ---
            document.querySelectorAll('.chip').forEach(chip => {
                chip.classList.toggle('active', (s.negativeChips || []).includes(chip.dataset.value));
            });

            // --- Restore arrangement ---
            currentArrangement = projectData.arrangement;

            // --- Refresh UI ---
            stopTimeline();
            renderTimeline();
            generateSunoPrompt();

            const meta = projectData.metadata || {};
            alert(`✅ Proje yüklendi!\n\n🎵 ${meta.songName || '-'}\n🎤 ${meta.artistName || '-'}\n📁 ${meta.projectTag || '-'}\n📅 ${meta.savedAt ? new Date(meta.savedAt).toLocaleString('tr-TR') : '-'}`);

        } catch (err) {
            alert('Proje yüklenirken hata: ' + err.message);
        }
    };
    reader.readAsText(file);
    // Reset so same file can be loaded again without page reload
    event.target.value = '';
}

// Close save modal when clicking the backdrop
document.getElementById('saveModalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'saveModalOverlay') closeSaveModal();
});

// Press Escape to dismiss the save modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSaveModal();
});

// Initial trigger to sync on load
document.addEventListener('DOMContentLoaded', () => {
    updateMakamNames();
    loadPersonaLibrary();   // Load saved personas from localStorage, then render buttons
    wirePromptLiveRefresh(); // Auto-update prompt when any setting changes
});

/** Refresh prompt when settings change */
function liveRefreshPrompt() {
    generateSunoPrompt();
}

/** Attach change listeners to every setting that affects the prompt */
function wirePromptLiveRefresh() {
    const liveIds = [
        'promptLangSelect', 'vocalGenderSelect', 'songDuration',
        'genreSelect', 'moodSelect', 'scaleSelect', 'keySelect',
        'bpm', 'tempoFeel', 'octaveSelect',
        'instRhythm', 'instBass', 'instHarmony', 'instLead', 'instAtmosphere'
    ];
    liveIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', liveRefreshPrompt);
    });
    // Lyrics textarea: always call generateSunoPrompt directly
    const lyricsEl = document.getElementById('customLyricsInput');
    if (lyricsEl) lyricsEl.addEventListener('input', generateSunoPrompt);
    // All chip clicks trigger a refresh
    document.querySelectorAll('.chip-group').forEach(group => {
        group.addEventListener('click', () => setTimeout(liveRefreshPrompt, 50));
    });
}

// =============================================
// PERSONA CRUD + PERSISTENCE (localStorage)
// =============================================
const PERSONA_STORAGE_KEY = 'chord_studio_personas';

/** Merge default PERSONA_LIBRARY with any user-saved overrides from localStorage */
function loadPersonaLibrary() {
    try {
        const saved = localStorage.getItem(PERSONA_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge: user-saved entries override defaults, new entries are added
            Object.keys(parsed).forEach(id => {
                PERSONA_LIBRARY[id] = { ...PERSONA_LIBRARY[id], ...parsed[id] };
            });
        }
    } catch (e) {
        console.warn('Persona kütüphanesi yüklenemedi:', e);
    }
    renderPersonaButtons();
}

/** Persist the full PERSONA_LIBRARY to localStorage */
function savePersonaLibrary() {
    try {
        localStorage.setItem(PERSONA_STORAGE_KEY, JSON.stringify(PERSONA_LIBRARY));
    } catch (e) {
        console.warn('Persona kütüphanesi kaydedilemedi:', e);
    }
}

/** Dynamically render all persona buttons into #personaBtnGrid */
function renderPersonaButtons() {
    const grid = document.getElementById('personaBtnGrid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.keys(PERSONA_LIBRARY).forEach(id => {
        const p = PERSONA_LIBRARY[id];
        const [c1, c2] = extractAvatarColors(p.avatarGradient);

        const btn = document.createElement('button');
        btn.className = 'persona-btn';
        btn.id = `pbtn-${id}`;
        btn.style.setProperty('--persona-color', c1);
        btn.style.setProperty('--persona-color2', c2);
        btn.onclick = () => previewPersona(id);
        btn.innerHTML = `
            <span class="pbtn-avatar">${p.avatarLetter || id.charAt(0)}</span>
            <span class="pbtn-label">${p.name || id}</span>
            <span class="pbtn-gender">${p.gender || ''}</span>`;
        grid.appendChild(btn);
    });

    // Restore applied state if a persona is still active
    if (activePersona && document.getElementById(`pbtn-${activePersona}`)) {
        document.getElementById(`pbtn-${activePersona}`).classList.add('applied');
    }
}

/** Extract first two hex colours from a CSS gradient string */
function extractAvatarColors(gradient) {
    if (!gradient) return ['#ff9f0a', '#8b0000'];
    const matches = gradient.match(/#[0-9a-fA-F]{3,6}/g);
    return matches && matches.length >= 2 ? [matches[0], matches[1]] : ['#ff9f0a', '#8b0000'];
}

/** Open the inline editor for an existing persona (id) or for a new one (null) */
function openPersonaEditor(personaId) {
    // Hide detail panel, show edit panel
    const detail = document.getElementById('personaDetailPanel');
    const edit = document.getElementById('personaEditPanel');
    if (detail) detail.style.display = 'none';
    if (!edit) return;
    edit.style.display = 'block';

    const isNew = !personaId || !PERSONA_LIBRARY[personaId];
    document.getElementById('personaEditTitle').textContent = isNew ? '＋ Yeni Persona' : '✏ Persona Düzenle — ' + (PERSONA_LIBRARY[personaId]?.name || personaId);
    document.getElementById('peditId').value = isNew ? '' : personaId;
    document.getElementById('peditDeleteBtn').style.display = isNew ? 'none' : 'inline-flex';

    const p = isNew ? {} : PERSONA_LIBRARY[personaId];
    const [c1, c2] = isNew ? ['#d845ff', '#8a2be2'] : extractAvatarColors(p.avatarGradient);

    document.getElementById('peditIdName').value = isNew ? '' : personaId;
    document.getElementById('peditIdName').disabled = !isNew; // ID can't change after creation
    document.getElementById('peditName').value = p.name || '';
    document.getElementById('peditLetter').value = p.avatarLetter || '';
    document.getElementById('peditColor1').value = c1;
    document.getElementById('peditColor2').value = c2;
    document.getElementById('peditGender').value = p.gender || '';
    document.getElementById('peditGenderCode').value = p.genderCode || '';
    document.getElementById('peditStyle').value = p.style || '';
    document.getElementById('peditTags').value = p.tags || '';
    document.getElementById('peditSuno').value = p.sunoStyle || '';
    // Settings presets
    document.getElementById('peditBpm').value = p.bpm || '';
    document.getElementById('peditGenre').value = p.genre || '';
    document.getElementById('peditMood').value = p.mood || '';
    document.getElementById('peditScale').value = p.scale || '';
    document.getElementById('peditKey').value = p.key || '';
    document.getElementById('peditTempoFeel').value = p.tempoFeel || 'Normal';
    document.getElementById('peditInstRhythm').value = p.instRhythm || '';
    document.getElementById('peditInstBass').value = p.instBass || '';
    document.getElementById('peditInstHarmony').value = p.instHarmony || '';
    document.getElementById('peditInstLead').value = p.instLead || '';
    document.getElementById('peditInstAtmosphere').value = p.instAtmosphere || '';
    document.getElementById('peditVocalGender').value = p.vocalGender || '';
}

/** Save (create or update) a persona from the edit form */
function savePersonaEdit() {
    const oldId = document.getElementById('peditId').value;
    const newId = document.getElementById('peditIdName').value.trim().replace(/\s+/g, '_');
    const isNew = !oldId;

    if (!newId) { alert('Persona ID boş olamaz!'); return; }

    const c1 = document.getElementById('peditColor1').value;
    const c2 = document.getElementById('peditColor2').value;

    const updated = {
        name: document.getElementById('peditName').value.trim() || newId,
        avatarLetter: document.getElementById('peditLetter').value.trim().charAt(0) || newId.charAt(0).toUpperCase(),
        avatarGradient: `linear-gradient(135deg, ${c1}, ${c2})`,
        gender: document.getElementById('peditGender').value.trim(),
        genderCode: document.getElementById('peditGenderCode').value.trim(),
        style: document.getElementById('peditStyle').value.trim(),
        tags: document.getElementById('peditTags').value.trim(),
        sunoStyle: document.getElementById('peditSuno').value.trim(),
        bpm: parseInt(document.getElementById('peditBpm').value) || undefined,
        genre: document.getElementById('peditGenre').value.trim(),
        mood: document.getElementById('peditMood').value.trim(),
        scale: document.getElementById('peditScale').value.trim(),
        key: document.getElementById('peditKey').value.trim(),
        tempoFeel: document.getElementById('peditTempoFeel').value,
        instRhythm: document.getElementById('peditInstRhythm').value.trim(),
        instBass: document.getElementById('peditInstBass').value.trim(),
        instHarmony: document.getElementById('peditInstHarmony').value.trim(),
        instLead: document.getElementById('peditInstLead').value.trim(),
        instAtmosphere: document.getElementById('peditInstAtmosphere').value.trim(),
        vocalGender: document.getElementById('peditVocalGender').value.trim()
    };

    // For edits of existing persona — keep the same key
    PERSONA_LIBRARY[newId] = updated;

    savePersonaLibrary();
    renderPersonaButtons();
    closePersonaEditor();

    // Notify
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(255,159,10,0.9);color:#fff;padding:10px 20px;border-radius:10px;font-weight:600;z-index:9999;animation:fadeInUp 0.3s ease';
    notif.textContent = isNew ? `✅ "${updated.name}" kaydedildi!` : `✅ "${updated.name}" güncellendi!`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

/** Delete the currently editing persona */
function deletePersona() {
    const id = document.getElementById('peditId').value;
    if (!id) return;
    const name = PERSONA_LIBRARY[id]?.name || id;
    if (!confirm(`"${name}" personasını silmek istediğinizden emin misiniz?`)) return;

    delete PERSONA_LIBRARY[id];

    // If deleted persona was active, clear it
    if (activePersona === id) {
        activePersona = null;
        const chip = document.getElementById('activePersonaChip');
        if (chip) chip.style.display = 'none';
    }

    savePersonaLibrary();
    renderPersonaButtons();
    closePersonaEditor();
}

/** Close the inline editor panel */
function closePersonaEditor() {
    const edit = document.getElementById('personaEditPanel');
    if (edit) edit.style.display = 'none';
}

// --- Persona Panel Logic ---
function togglePersonaSidebar() {
    const sidebar = document.getElementById('personaSidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

// Step 1: Preview — shows the detail panel without committing
function previewPersona(personaId) {
    const persona = PERSONA_LIBRARY[personaId];
    if (!persona) return;

    previewingPersona = personaId;

    // Highlight the selected button
    document.querySelectorAll('.persona-btn').forEach(btn => btn.classList.remove('previewing'));
    const btn = document.getElementById(`pbtn-${personaId}`);
    if (btn) btn.classList.add('previewing');

    // Populate detail panel fields
    const avatar = document.getElementById('personaDetailAvatar');
    if (avatar) {
        avatar.style.background = persona.avatarGradient;
        avatar.textContent = persona.avatarLetter;
    }
    document.getElementById('personaDetailName').textContent = persona.name;
    document.getElementById('personaDetailGenderTag').textContent = persona.gender;
    document.getElementById('personaDetailStyle').textContent = persona.style;
    document.getElementById('personaDetailTags').textContent = persona.tags;
    document.getElementById('personaDetailSuno').textContent = persona.sunoStyle;

    // Show the detail panel
    const panel = document.getElementById('personaDetailPanel');
    if (panel) panel.style.display = 'block';
}

// Step 2: Apply — commits the previewed persona and updates prompts + General Settings
function applyPersona() {
    if (!previewingPersona) return;
    activePersona = previewingPersona;

    // Mark button as applied
    document.querySelectorAll('.persona-btn').forEach(btn => btn.classList.remove('applied', 'previewing'));
    const btn = document.getElementById(`pbtn-${activePersona}`);
    if (btn) btn.classList.add('applied');

    // Show active chip
    const chip = document.getElementById('activePersonaChip');
    const chipName = document.getElementById('activePersonaName');
    if (chip && chipName) {
        chipName.textContent = PERSONA_LIBRARY[activePersona].name;
        chip.style.display = 'flex';
    }

    // === APPLY GENERAL SETTINGS FROM PERSONA PRESET ===
    applySettingsFromPersona(PERSONA_LIBRARY[activePersona]);

    // Hide detail panel
    clearPersonaPreview();

    // Live-update the prompt if already generated
    if (currentArrangement.length > 0) {
        generateSunoPrompt();
    }
}

// Helper: updates all General Settings UI elements from a persona preset
function applySettingsFromPersona(persona) {
    function setVal(id, val) {
        const el = document.getElementById(id);
        if (!el || val === undefined || val === null) return;
        el.value = val;
        // Flash highlight to indicate change
        el.style.transition = 'box-shadow 0.3s ease';
        el.style.boxShadow = '0 0 12px rgba(255, 159, 10, 0.7)';
        setTimeout(() => { el.style.boxShadow = ''; }, 1200);
    }

    if (persona.bpm) setVal('bpm', persona.bpm);
    if (persona.genre) setVal('genreSelect', persona.genre);
    if (persona.mood) setVal('moodSelect', persona.mood);
    if (persona.scale) setVal('scaleSelect', persona.scale);
    if (persona.key) setVal('keySelect', persona.key);
    if (persona.tempoFeel) setVal('tempoFeel', persona.tempoFeel);
    // Instrument layers (allow empty string to reset to "Automatic")
    if (persona.instRhythm !== undefined) setVal('instRhythm', persona.instRhythm);
    if (persona.instBass !== undefined) setVal('instBass', persona.instBass);
    if (persona.instHarmony !== undefined) setVal('instHarmony', persona.instHarmony);
    if (persona.instLead !== undefined) setVal('instLead', persona.instLead);
    if (persona.instAtmosphere !== undefined) setVal('instAtmosphere', persona.instAtmosphere);
    // Prompt-level overrides
    if (persona.vocalGender !== undefined) setVal('vocalGenderSelect', persona.vocalGender);

    // Trigger makam name update to sync scale display
    if (typeof updateMakamNames === 'function') updateMakamNames();
}

// Cancel preview without committing
function clearPersonaPreview() {
    previewingPersona = null;
    document.querySelectorAll('.persona-btn').forEach(btn => btn.classList.remove('previewing'));
    const panel = document.getElementById('personaDetailPanel');
    if (panel) panel.style.display = 'none';
}

// Deselect active persona entirely
function selectPersona(personaId) {
    if (!personaId) {
        activePersona = null;
        previewingPersona = null;
        document.querySelectorAll('.persona-btn').forEach(btn => btn.classList.remove('active', 'applied', 'previewing'));
        const chip = document.getElementById('activePersonaChip');
        if (chip) chip.style.display = 'none';
        const panel = document.getElementById('personaDetailPanel');
        if (panel) panel.style.display = 'none';
        // Regenerate prompt if open
        if (currentArrangement.length > 0) generateSunoPrompt();
    } else {
        activePersona = personaId;
        previewingPersona = null;
        applyPersonaSettings(personaId);
        document.querySelectorAll('.persona-btn').forEach(btn => {
            btn.classList.remove('active', 'applied', 'previewing');
            if (btn.dataset.id === personaId) btn.classList.add('active', 'applied');
        });
        const chip = document.getElementById('activePersonaChip');
        if (chip) {
            chip.style.display = 'inline-flex';
            const nameEl = chip.querySelector('.chip-name');
            if (nameEl && PERSONA_LIBRARY[personaId]) nameEl.textContent = PERSONA_LIBRARY[personaId].name;
        }
        if (currentArrangement.length > 0) generateSunoPrompt();
    }
}

// ── Style Chip Injector (Suno Prompt Generator) ───────────────────────────
document.querySelectorAll('.style-chip, .style-chipstrap').forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-style');
        if (!tag) return;

        // Toggle active state
        const isActive = btn.classList.toggle('active');

        // Get current style output value
        const styleOut = document.getElementById('sunoStyleOutput');
        if (!styleOut) return;

        let current = styleOut.value;

        if (isActive) {
            // Append to style output if not already there
            if (!current.includes(tag)) {
                styleOut.value = current ? current.trimEnd() + ', ' + tag : tag;
            }
        } else {
            // Remove the tag from the output
            styleOut.value = current
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== tag)
                .join(', ');
        }
    });
});

// === Load Default Arrangement on Startup ===
window.addEventListener('load', () => {
    // Check if empty, generate initial structure automatically
    if (typeof currentArrangement !== 'undefined' && currentArrangement.length === 0) {
        const btnGen = document.getElementById('btnGenerateStructure');
        if (btnGen) btnGen.click();
    }
});
