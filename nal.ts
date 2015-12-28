"use strict";

import imm = require('mori');

module nal {

    /** term types */
    const T = new Array(16);



    class TType {
        sym:string;

        constructor(sym:string) {
            this.sym = sym;
        }

        static numTypes:number = 0;

        //toString() { return this.sym; }

    }

    function initType(t:(x:number)=>TType):Symbol {
        var n = TType.numTypes++;
        var s = Symbol(n);
        T[n] = t(n);
        return s;
    }


    const ATOM = initType((n)=> {
        return new TType('.');
    });
    const INHERIT = initType((n)=> {
        return new TType('-->');
    });
    const SIMILAR = initType((n)=> {
        return new TType('<->');
    });

    console.log("Types\n",T);

//
//    ATOM: {
//        sym: '.',
//        subsMin: 0, subsMax: 0
//    },
//
//    INHERIT: {
//
//    },
//
//    SIMILAR: {
//
//    }
//
//
//
//    //..
//}

    /** scalar unit truth measurement: freq,conf */
    class Truth {

        /** frequency [0..1.0] */
        f:number;

        /** confidence [0..1.0] */
        c:number;

        constructor(freq:number, conf:number) {
            this.f = freq;
            this.c = conf;
        }

        /** expectation postive, ie. the expectation of freq=1 */
        expPos():number {
            return this.expectation(this.f);
        }

        /** expectation inverse, ie. the expectation of freq=0 */
        expNeg():number {
            return this.expectation(1.0 - this.f);
        }

        expectation(frequency:number):number {
            return (this.c * (frequency - 0.5) + 0.5);
        }

        static defaultBelief:Truth = new Truth(1.0, 0.9);
        static defaultGoal:Truth = new Truth(1.0, 0.9);
    }

    /**
     * energy (aka budget) vector
     *
     * analogous to voltage or pressure
     *
     * one way to interpret is as a 3D polar coordinate:
     *      radius/magnitude = priority
     *      angles = durability, quality
     */
    class Energy {
        /** priority/activation/charge/temperature */
        p:number;
        /** durability */
        d:number;
        /** quality */
        q:number;
    }

    /**
     energized state vector

     energy vector && delta-energy vector

     analogous to capacitance
     */
    class Energized extends Energy {
        /** timestamp of last update */
        updateLast:number;

        /** change in priority to apply next update */
        dp:number;

        /** change in durability to apply next update */
        dd:number;

        /** change in quality to apply next update */
        dq:number;
    }


    /** task punctuation */
    const enum Punc {

        /**
         b = believe judgment
         g = desire goal
         q = question (what/why/who/when/where/how...)
         w = quest (will i)
         */

        /** belief (aka judgment) */
        B,

        /** goal (aka desire) */
        G,

        /** question */
        Q,

        /** quest */
        W,

        /** command */
        C
    }

    interface Term {
        id: (string | Object)
    }

    interface Concept {
        id: Term
    }

    interface Task {
        term: Term

    }

    class Bag {
        capacity: number

    }

    class Index /* extends Map<Term,Concept> */ {

        get(t:Term):Concept {
            return null;
        }

        computeIfAbsent(t:Term, conceptBuilder:(x:Term)=>Concept):Concept {
            return null;
        }

    }

    /** Non-Axiomatic Reasoner (NAR) */
    class NAR extends Index {


        /** input task */
        in(term:Term, truth:Truth, punc:Punc):Task {
            //return in(new Task(term, truth, punc));
            return null;
        }

    }

}