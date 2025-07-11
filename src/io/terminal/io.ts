

// io.ts
import readline from 'readline';

class IO {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    ask(question: string): Promise<string> {
        return new Promise((resolve) => this.rl.question(question, resolve));
    }

    print(message: string) {
        console.log(message);
    }

    close() {
        this.rl.close();
    }
}

export const io = new IO();
