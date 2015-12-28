"use strict";

import mori = require('mori');

const set = mori.sortedSet;
const vector = mori.vector;

type immVector<V> = mori.Vector<V>;
type immuta<V> = mori.MoriObject<V>;
const imm = mori.toClj;
const mut = mori.toJs;




module nal {


    /** term types */
    const T = new Array(16);


    function opRel(op:number, rel:number):number {
        return op | ((1+rel) << 16);
    }


    class TType {
        id:Symbol;
        ord:number;
        sym:string;
        commutative:boolean;

        constructor(id:number, sym:string, commutative:boolean) {
            this.id = Symbol(id);
            this.ord = (id);
            this.sym = sym;
            this.commutative = commutative;
        }

        static numTypes:number = 0;

        the(subterms: Term[]):
        immuta<any> {
            return this.theR(-1, subterms);
        }

        theR(relation:number, subterms: Term[]):immuta<any> {
            //return vector([
            //    opRel(this.ord, relation),
            //    this.commutative ? set(subterms) : vector(subterms)
            //]);
            return imm([
                opRel(this.ord, relation),
                this.commutative ? set(subterms) : subterms
            ]);
        }
        //toString() { return this.sym; }

    }


    function initType(t:(x:number)=>TType):TType {
        var n = TType.numTypes++;
        return T[n] = t(n);
    }


    const ATOM = initType(n=>
        new TType(n, '.', false)
        //subsMin=0, subsMax=0
    );
    const INHERIT = initType(n=>
        new TType(n, '-->', false)
    );
    const SIMILAR = initType(n=>
        new TType(n, '<->', true)
    );


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

    //type Compound = [number, immVector<any>];
    type Term = string | immVector<any>; //| Compound;


    //class Term {
    //    id: (string | imm.Vector<Term>)
    //
    //    constructor(id:string|imm.Vector<Term>) {
    //        this.id = id;
    //    }
    //}

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

    console.log("Types\n",T);

    console.log( vector('a', 'b', 'c' ));

    console.log( INHERIT.the(['a', 'b']) );
    console.log( SIMILAR.the(['a', 'b']) );
    console.log( SIMILAR.the(['c', INHERIT.the(['a', 'b'])]) );
    //console.dir(i);



}