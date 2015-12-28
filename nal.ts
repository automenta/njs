/**
 * Created by me on 12/28/15.
 */
const $ = {

};



class Truth {

    /** frequency [0..1.0] */
    f: number;

    /** confidence [0..1.0] */
    c: number;

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
        return this.expectation(1.0-this.f);
    }

    expectation(frequency:number):number  {
        return (this.c * (frequency - 0.5) + 0.5);
    }

    static defaultBelief:Truth = new Truth(1.0, 0.9);
    static defaultGoal:Truth = new Truth(1.0, 0.9);
}

class Budget {

}

/** task punctuation */
enum Punc {
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

}
interface Concept {

}
interface Task {


}
class NAR extends Map<Term,Concept> {


    /** input task */
    in(term: Term, truth: Truth, punc:Punc):Task {
        //return in(new Task(term, truth, punc));
        return null;
    }

}

/**
 b = believe judgment
 g = desire goal
 q = question (what/why/who/when/where/how...)
 w = quest (will i)
 */


//believe(inh('a', 'b'));
