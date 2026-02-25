/**
 * midi.js — Minimal self-contained MIDI file builder
 * Procedural Chord Create Studio
 * Supports: Format 1 (multi-track), Note On/Off, Program Change, Tempo
 */
class MidiBuilder {
    constructor(bpm = 120, tpq = 480) {
        this.tpq = tpq;
        this.uspb = Math.round(60_000_000 / bpm); // microseconds per beat
    }

    // --- Helpers ---
    _vlq(value) {
        const bytes = [value & 0x7F];
        value >>>= 7;
        while (value > 0) { bytes.unshift((value & 0x7F) | 0x80); value >>>= 7; }
        return bytes;
    }

    _int32(n) {
        return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF];
    }

    _int16(n) {
        return [(n >>> 8) & 0xFF, n & 0xFF];
    }

    /** Convert note string like 'C#4', 'Bb3' -> MIDI note number */
    noteToMidi(noteStr) {
        const NOTE_MAP = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
            'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
        };
        const m = noteStr.match(/^([A-G][#b]?)(\d)$/);
        if (!m) return 60; // Middle C fallback
        const semitone = NOTE_MAP[m[1]];
        if (semitone === undefined) return 60;
        return (parseInt(m[2]) + 1) * 12 + semitone;
    }

    /** Ticks per bar (4/4) */
    get ticksPerBar() { return this.tpq * 4; }

    /**
     * Build a raw track byte array from an array of event descriptors.
     * Supported event types:
     *   {tick, type:'note', channel, pitch(string or number), velocity, durationTicks}
     *   {tick:0, type:'program', channel, program}
     */
    buildTrack(eventList) {
        // Expand note events into note-on / note-off pairs
        const raw = [];

        // Always prepend a tempo meta event at tick 0
        raw.push({
            tick: 0, bytes: [0xFF, 0x51, 0x03,
                (this.uspb >>> 16) & 0xFF,
                (this.uspb >>> 8) & 0xFF,
                this.uspb & 0xFF]
        });

        eventList.forEach(ev => {
            const ch = (ev.channel ?? 0) & 0xF;

            if (ev.type === 'program') {
                raw.push({ tick: 0, bytes: [0xC0 | ch, ev.program & 0x7F] });

            } else if (ev.type === 'note') {
                const pitch = (typeof ev.pitch === 'string')
                    ? this.noteToMidi(ev.pitch)
                    : (ev.pitch & 0x7F);
                const vel = (ev.velocity ?? 80) & 0x7F;
                const startTick = ev.tick ?? 0;
                const endTick = startTick + (ev.durationTicks ?? this.ticksPerBar);

                raw.push({ tick: startTick, bytes: [0x90 | ch, pitch, vel] });
                raw.push({ tick: endTick, bytes: [0x80 | ch, pitch, 0] });
            }
        });

        // Sort by tick, stable
        raw.sort((a, b) => a.tick - b.tick);

        // Encode with delta times
        const data = [];
        let currentTick = 0;
        raw.forEach(ev => {
            const delta = ev.tick - currentTick;
            data.push(...this._vlq(delta));
            data.push(...ev.bytes);
            currentTick = ev.tick;
        });

        // End Of Track meta event
        data.push(0x00, 0xFF, 0x2F, 0x00);
        return data;
    }

    /**
     * Build a complete Format 1 MIDI file from multiple track arrays.
     * Returns a Uint8Array.
     */
    buildFile(trackDataArrays) {
        const numTracks = trackDataArrays.length;

        // Header chunk: MThd
        const header = [
            0x4D, 0x54, 0x68, 0x64, // "MThd"
            ...this._int32(6),        // chunk length = 6
            ...this._int16(1),        // format 1 (multi-track)
            ...this._int16(numTracks),
            ...this._int16(this.tpq)
        ];

        const result = [...header];

        trackDataArrays.forEach(td => {
            result.push(
                0x4D, 0x54, 0x72, 0x6B, // "MTrk"
                ...this._int32(td.length),
                ...td
            );
        });

        return new Uint8Array(result);
    }

    /** Build and return a data: URI for immediate download */
    buildDataUri(trackDataArrays) {
        const bytes = this.buildFile(trackDataArrays);
        let binary = '';
        bytes.forEach(b => binary += String.fromCharCode(b));
        return 'data:audio/midi;base64,' + btoa(binary);
    }
}
