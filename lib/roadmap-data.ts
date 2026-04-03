import type { Phase, Week, DailyTask, PhaseId } from "@/types"

function makeTask(
  id: string,
  phaseId: PhaseId,
  week: number,
  day: number,
  title: string,
  description: string,
  estimatedHours: number,
  type: DailyTask['type'],
  resource?: DailyTask['resource'],
  enrichment?: Pick<DailyTask, 'keyPoints' | 'codeExample' | 'commonMistakes' | 'practicePrompt'>
): DailyTask {
  return {
    id,
    phaseId,
    week,
    day,
    title,
    description,
    estimatedHours,
    type,
    resource,
    status: 'pending',
    ...enrichment,
  }
}

// ─── Phase 1: Rust Foundations (Weeks 1–4) ────────────────────────────────────
const phase1Weeks: Week[] = [
  {
    weekNumber: 1,
    phaseWeek: 1,
    phaseId: 1,
    title: "Setup & Rust Basics",
    goal: "Install Rust toolchain, understand Cargo, write your first programs with variables, types, and functions.",
    isCompleted: false,
    tasks: [
      makeTask("p1w1d1", 1, 1, 1, "Install Rust & Cargo Setup", "Install rustup, configure VS Code with rust-analyzer, create first 'Hello World' project, explore cargo commands: build, run, check, fmt, clippy.", 4, "coding", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Section 1", platform: "udemy" }, {
        keyPoints: [
          'rustup installs the Rust toolchain — use it, never install Rust manually',
          'cargo is the build system AND package manager (like npm for JS)',
          'cargo build compiles, cargo run compiles + executes, cargo check only type-checks',
          'rust-analyzer VS Code extension gives IntelliSense and inline type hints',
          'Cargo.toml is your project manifest — name, version, dependencies',
        ],
        codeExample: `// Your first Rust program
fn main() {
    println!("Hello, Web3 World!");

    // cargo commands to know:
    // cargo new my_project   -- create new project
    // cargo build            -- compile
    // cargo run              -- compile and run
    // cargo check            -- fast type-check (no binary)
    // cargo fmt              -- auto-format code
    // cargo clippy           -- lint warnings
}`,
        commonMistakes: [
          'Installing Rust via apt/brew instead of rustup — rustup manages multiple versions',
          'Forgetting to add the rust-analyzer extension — coding without it is painful',
        ],
        practicePrompt: 'Create a new project called "hello-rust", edit main.rs to print your name, run it with cargo run, then run cargo clippy and cargo fmt.',
      }),
      makeTask("p1w1d2", 1, 1, 2, "Variables, Mutability & Data Types", "Learn let/let mut, scalar types (i32, f64, bool, char), type inference, constants, shadowing. Practice in Rust Playground.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Section 2", platform: "udemy" }, {
        keyPoints: [
          'let is immutable by default — use let mut for mutability',
          'Type inference: Rust deduces types from context, no need to annotate most variables',
          'Shadowing: re-declare same name with let (creates a NEW variable, different from mut)',
          'Constants (const) must have explicit type and must be a compile-time value',
          'Scalar types: integers (i8..i128, u8..u128), floats (f32, f64), bool, char (4-byte Unicode)',
        ],
        codeExample: `fn main() {
    let x = 5;            // immutable, type i32 inferred
    let mut y = 10;       // mutable
    y += 1;               // ok: y is now 11
    let x = x + 1;        // shadowing — x is now 6 (new variable)
    let x = x as f64 * 2.0; // shadow again with different type

    const MAX_SCORE: u32 = 100;
    let is_passing = true;
    let grade: char = 'A';

    println!("{x} {y} {MAX_SCORE} {is_passing} {grade}");
}`,
        commonMistakes: [
          'Trying to mutate an immutable variable — forgot to write let mut',
          'Confusing shadowing with mutation — shadowing creates a NEW binding, type can change',
        ],
        practicePrompt: 'Write a temperature converter: declare Celsius as a const, shadow it to convert to Fahrenheit (F = C * 9/5 + 32), then shadow again to add "°F" string. Print all three.',
      }),
      makeTask("p1w1d3", 1, 1, 3, "Functions & Control Flow", "Define functions, understand parameters/return types, if/else expressions, loop/while/for, range patterns.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Section 3", platform: "udemy" }, {
        keyPoints: [
          'Functions use fn keyword — parameter types and return type are mandatory annotations',
          'if/else is an expression in Rust — it returns a value (no ternary needed)',
          'loop creates an infinite loop; break can return a value from loop',
          'for item in collection is the idiomatic way to iterate — prefer over while with index',
          'Ranges: 0..5 is exclusive (0-4), 0..=5 is inclusive (0-5)',
        ],
        codeExample: `fn add(a: i32, b: i32) -> i32 {
    a + b  // no semicolon = expression = return value
}

fn classify(n: i32) -> &'static str {
    if n > 0 { "positive" }
    else if n < 0 { "negative" }
    else { "zero" }
}

fn main() {
    let result = add(3, 4);
    println!("{result}");

    for i in 0..5 {
        print!("{i} ");   // prints: 0 1 2 3 4
    }

    let mut count = 0;
    let x = loop {
        count += 1;
        if count == 3 { break count * 10; }
    };
    println!("loop returned: {x}"); // 30
}`,
        commonMistakes: [
          'Adding a semicolon after the last expression in a function — that makes it return () not the value',
          'Using return keyword unnecessarily — Rust returns the last expression implicitly',
        ],
        practicePrompt: 'Write a function fizzbuzz(n: u32) -> String that returns "Fizz", "Buzz", "FizzBuzz" or the number as string. Call it in a loop for 1..=20.',
      }),
      makeTask("p1w1d4", 1, 1, 4, "Compound Types: Tuples & Arrays", "Tuples vs arrays, destructuring, indexing, slices. Build a temperature converter program.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch03-02-data-types.html", label: "The Rust Book — Ch 3.2", platform: "docs" }, {
        keyPoints: [
          'Tuple: fixed-size, mixed types — (i32, f64, bool). Access with .0, .1, .2',
          'Array: fixed-size, same type — [i32; 5]. Stored on the stack',
          'Vec<T>: growable array on heap — use when size is unknown at compile time',
          'Destructuring: let (x, y, z) = my_tuple; let [a, b, ..] = my_array',
          'Arrays panic at runtime on out-of-bounds — Rust checks bounds unlike C',
        ],
        codeExample: `fn main() {
    // Tuple — mixed types
    let coords: (f64, f64) = (48.8566, 2.3522); // Paris
    let (lat, lon) = coords;                       // destructure
    println!("lat={lat}, lon={lon}");

    // Array — fixed size, same type
    let primes: [u32; 5] = [2, 3, 5, 7, 11];
    println!("first prime: {}", primes[0]);
    println!("count: {}", primes.len());

    // Vec — growable
    let mut scores: Vec<i32> = vec![90, 85, 92];
    scores.push(88);
    println!("avg: {}", scores.iter().sum::<i32>() / scores.len() as i32);
}`,
        commonMistakes: [
          'Using arrays when you need dynamic size — use Vec<T> instead',
          'Out-of-bounds array access is a runtime panic in Rust — validate indices',
        ],
        practicePrompt: 'Create a function that takes an array of 5 test scores [u32; 5] and returns a tuple (min, max, average) — all computed in one pass.',
      }),
      makeTask("p1w1d5", 1, 1, 5, "The Stack & Heap — Mental Model", "Understand how Rust manages memory: stack vs heap, why this matters for ownership. Read Rust Book Ch 4.1.", 4, "reading", { url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html", label: "The Rust Book — Ch 4.1", platform: "docs" }, {
        keyPoints: [
          'Stack: LIFO, fast, fixed-size data — integers, booleans, arrays, structs of these',
          'Heap: dynamic size, slower, managed via pointers — String, Vec<T>, Box<T>',
          'When a stack frame ends, its data is automatically freed (dropped)',
          'Heap data is freed when its owner goes out of scope — no GC needed',
          'String is heap-allocated; &str is a reference to string data (stack pointer + length)',
        ],
        codeExample: `fn main() {
    // Stack-allocated: copied when assigned
    let x: i32 = 5;
    let y = x;          // copy: x and y are independent
    println!("{x} {y}"); // both work fine

    // Heap-allocated: moved when assigned
    let s1 = String::from("hello");
    let s2 = s1;        // s1 is MOVED into s2
    // println!("{s1}"); // ERROR: s1 is invalid after move
    println!("{s2}");   // ok

    // Clone explicitly if you need both
    let a = String::from("world");
    let b = a.clone();  // deep copy on heap
    println!("{a} {b}"); // both valid
}`,
        commonMistakes: [
          'Expecting String to behave like i32 (copy) — String moves by default',
          'Not understanding that &str is a borrow (reference) while String is owned heap data',
        ],
        practicePrompt: 'Draw a memory diagram: create a String, assign it to another variable (observe move), then clone it. Add annotations for what lives on stack vs heap.',
      }),
      makeTask("p1w1d6", 1, 1, 6, "Practice: Fibonacci & Prime Sieve", "Implement Fibonacci (iterative + recursive), Sieve of Eratosthenes in Rust. Use cargo test.", 4, "exercise", { url: "https://exercism.org/tracks/rust", label: "Exercism Rust Track", platform: "custom" }, {
        keyPoints: [
          'Recursive functions in Rust work fine but can stack-overflow on deep recursion',
          'Iterative solutions often faster — use mutable variables and loops',
          '#[test] attribute marks a function as a unit test',
          'assert_eq!(expected, actual) is the primary test assertion macro',
          'cargo test runs all #[test] functions automatically',
        ],
        codeExample: `fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let (mut a, mut b) = (0u64, 1u64);
            for _ in 2..=n {
                let c = a + b;
                a = b;
                b = c;
            }
            b
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fibonacci() {
        assert_eq!(fibonacci(0), 0);
        assert_eq!(fibonacci(10), 55);
        assert_eq!(fibonacci(20), 6765);
    }
}`,
        commonMistakes: [
          'Integer overflow with u32 at fib(47) — use u64 for Fibonacci sequences',
          'Forgetting #[cfg(test)] module wrapper — tests run in a separate module',
        ],
        practicePrompt: 'Implement both recursive and iterative Fibonacci. Add cargo benchmark (criterion) to compare their performance at n=40.',
      }),
      makeTask("p1w1d7", 1, 1, 7, "Week 1 Review & Mini Project", "Build a CLI number guessing game using rand crate. Review all week concepts. Write summary notes.", 4, "project", { url: "https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html", label: "Rust Book — Guessing Game", platform: "docs" }, {
        keyPoints: [
          'Add dependencies to Cargo.toml under [dependencies] — cargo handles downloading',
          'use std::io to read user input; io::stdin().read_line() reads into a String',
          'trim() removes newline from input; parse() converts String to number',
          'Ordering enum: Ordering::Less, Greater, Equal for comparison results',
          'loop + break creates a "play until correct" game loop',
        ],
        codeExample: `use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    let secret = rand::thread_rng().gen_range(1..=100);
    println!("Guess the number (1-100)!");

    loop {
        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("Failed to read");
        let guess: u32 = match guess.trim().parse() {
            Ok(n) => n,
            Err(_) => { println!("Please enter a number!"); continue; }
        };

        match guess.cmp(&secret) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => { println!("You win!"); break; }
        }
    }
}`,
        commonMistakes: [
          'Shadowing guess from String to u32 using let guess: u32 = ... is intentional pattern',
          'parse() returns Result — always handle the Err case to avoid panics',
        ],
        practicePrompt: 'Extend the guessing game: track number of attempts, show "You got it in X tries!", add difficulty levels (easy=1-20, hard=1-1000).',
      }),
    ],
  },
  {
    weekNumber: 2,
    phaseWeek: 2,
    phaseId: 1,
    title: "Ownership, Borrowing & References",
    goal: "Master Rust's core memory model: ownership rules, borrowing, references, and slices.",
    isCompleted: false,
    tasks: [
      makeTask("p1w2d1", 1, 2, 1, "Ownership Rules Deep Dive", "The 3 ownership rules. Move semantics, Copy trait. Why String vs &str. Work through Rust Book Ch 4.1–4.2.", 4, "reading", { url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html", label: "Rust Book — Ownership", platform: "docs" }, {
        keyPoints: [
          'Rule 1: Each value has exactly one owner',
          'Rule 2: There can only be one owner at a time',
          'Rule 3: When the owner goes out of scope, the value is dropped (memory freed)',
          'Move: assigning a heap type transfers ownership — old variable becomes invalid',
          'Copy trait: stack-only types (i32, f64, bool, char, &str) are copied, not moved',
        ],
        codeExample: `fn takes_ownership(s: String) {
    println!("{s}");
}   // s is dropped here — memory freed

fn makes_copy(n: i32) {
    println!("{n}");
}   // n is a copy — original still valid

fn gives_ownership() -> String {
    String::from("hello")  // returned = ownership transferred to caller
}

fn main() {
    let s = String::from("world");
    takes_ownership(s);
    // println!("{s}"); // ERROR: s was moved into takes_ownership

    let x = 5;
    makes_copy(x);
    println!("{x}"); // fine: i32 is Copy

    let s2 = gives_ownership(); // s2 owns the String
    println!("{s2}");
}`,
        commonMistakes: [
          'Passing a String to a function and then trying to use it — it was moved into the function',
          'Thinking that assigning a String copies it like an integer — use clone() for explicit copy',
        ],
        practicePrompt: 'Write three functions: one that moves a String (consuming it), one that borrows it (&String), one that returns ownership. Observe what you can and cannot do after each call.',
      }),
      makeTask("p1w2d2", 1, 2, 2, "References & Borrowing", "Immutable vs mutable references, the borrow checker rules, dangling references. Practice fixing borrow errors.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Borrowing", platform: "udemy" }, {
        keyPoints: [
          '& creates an immutable reference — you can read but not modify',
          '&mut creates a mutable reference — you can read and modify',
          'Borrow rule 1: Many immutable references OR one mutable reference — never both at once',
          'Borrow rule 2: References must always be valid (no dangling pointers)',
          'The borrow checker enforces these at compile time — no runtime cost',
        ],
        codeExample: `fn length(s: &String) -> usize {
    s.len()  // borrow s, don't take ownership
}

fn push_hello(s: &mut String) {
    s.push_str(" hello");
}

fn main() {
    let s = String::from("world");
    let len = length(&s);   // lend s, s still valid
    println!("{s} has {len} chars");

    let mut s2 = String::from("world");
    push_hello(&mut s2);    // mutable borrow
    println!("{s2}");       // "world hello"

    // Multiple immutable refs: ok
    let r1 = &s;
    let r2 = &s;
    println!("{r1} {r2}");

    // Can't have mutable + immutable at same time:
    // let r3 = &mut s;  // ERROR if r1/r2 still in scope
}`,
        commonMistakes: [
          'Trying to have a mutable reference while immutable references exist — borrow checker error',
          'Creating a mutable reference to a non-mut variable — you must declare let mut first',
        ],
        practicePrompt: 'Write a function that takes &mut Vec<i32> and removes all even numbers in-place. Test it: create a vec, borrow it mutably, print before and after.',
      }),
      makeTask("p1w2d3", 1, 2, 3, "Slices: &str and &[T]", "String slices, array slices, slice syntax. Understand why slices are safer than indices.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch04-03-slices.html", label: "Rust Book — Slices", platform: "docs" }, {
        keyPoints: [
          '&str is a string slice — reference to a portion of a String or string literal',
          '&[T] is a slice of an array or Vec — reference to contiguous elements',
          'Slices contain a pointer + length — they are "fat pointers"',
          'String literals ("hello") are &\'static str — stored in the binary',
          'Slices prevent use-after-free bugs that would exist with raw indices',
        ],
        codeExample: `fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &byte) in bytes.iter().enumerate() {
        if byte == b' ' {
            return &s[..i];  // slice up to space
        }
    }
    s  // whole string if no space
}

fn sum_slice(nums: &[i32]) -> i32 {
    nums.iter().sum()
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);
    println!("first word: {word}");

    let arr = [1, 2, 3, 4, 5];
    let mid = &arr[1..4];  // [2, 3, 4]
    println!("sum of middle: {}", sum_slice(mid));
}`,
        commonMistakes: [
          'Indexing a String with s[0] — Rust strings are UTF-8, index by bytes not chars',
          'Keeping a slice reference after modifying the source — borrow checker prevents this',
        ],
        practicePrompt: 'Write a function first_sentence(s: &str) -> &str that returns everything before the first period. Test with "Hello world. How are you."',
      }),
      makeTask("p1w2d4", 1, 2, 4, "String Types: String vs &str", "Heap-allocated String, string literals, String methods, format! macro, string concatenation. Build string manipulation exercises.", 4, "coding", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Strings", platform: "udemy" }, {
        keyPoints: [
          'String: heap-allocated, growable, owned — created with String::from() or .to_string()',
          '&str: borrowed string data — string literals are &\'static str',
          'Use &str for function parameters when you don\'t need ownership',
          'format!() creates a new String without consuming inputs — prefer over + operator',
          'Common methods: len(), is_empty(), contains(), starts_with(), split(), trim(), to_uppercase()',
        ],
        codeExample: `fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

fn main() {
    // Creating strings
    let s1 = String::from("Hello");
    let s2 = " World".to_string();

    // Concatenation — + moves s1
    let s3 = s1 + &s2;
    // s1 is moved; use format! to avoid this:
    let s4 = format!("{} {}", "Hello", "World");

    // Common operations
    let email = "  user@example.com  ";
    let clean = email.trim();
    let parts: Vec<&str> = clean.split('@').collect();
    println!("user: {}, domain: {}", parts[0], parts[1]);

    // Check & transform
    let s = "rust programming";
    println!("{}", s.to_uppercase());       // RUST PROGRAMMING
    println!("{}", s.contains("rust"));     // true
    println!("{}", s.replace("rust", "go")); // go programming
}`,
        commonMistakes: [
          'Using + for multiple concatenations — each + moves the first arg; use format! instead',
          'Passing a String where &str expected without &s — Rust can coerce &String to &str',
        ],
        practicePrompt: 'Write a function that takes a full name (&str), splits it into first and last name, capitalizes each, and returns "Last, First" format using format!.',
      }),
      makeTask("p1w2d5", 1, 2, 5, "Clone vs Copy — Understanding the Trait", "Why some types implement Copy (stack-only) vs Clone (heap types). Derive macros: #[derive(Clone, Copy)].", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust", platform: "udemy" }, {
        keyPoints: [
          'Copy: implicit bit-wise copy on assignment — for types entirely on the stack',
          'Clone: explicit deep copy via .clone() — must be called manually',
          'If a type contains a String or Vec, it cannot implement Copy (heap involved)',
          '#[derive(Clone, Copy)] auto-implements for simple structs/enums',
          'All Copy types are also Clone, but not vice versa',
        ],
        codeExample: `#[derive(Clone, Copy, Debug)]
struct Point {
    x: f64,
    y: f64,
}

#[derive(Clone, Debug)]
struct Circle {
    center: Point,    // Point is Copy — can be in Clone-only type
    radius: f64,
    label: String,    // String is not Copy — so Circle cannot be Copy
}

fn main() {
    let p1 = Point { x: 1.0, y: 2.0 };
    let p2 = p1;        // Copy: p1 still valid
    println!("{p1:?} {p2:?}");

    let c1 = Circle { center: p1, radius: 5.0, label: String::from("A") };
    let c2 = c1.clone();  // must explicitly clone
    // c1 still valid because we called clone(), not moved
    println!("{:?}", c1.label);
}`,
        commonMistakes: [
          'Deriving Copy on a struct that contains String/Vec — compiler error',
          'Calling .clone() everywhere to avoid thinking about ownership — learn to use references',
        ],
        practicePrompt: 'Create a Color struct with r, g, b: u8 fields. Derive Clone + Copy + Debug. Verify it copies by assigning and modifying the copy without affecting the original.',
      }),
      makeTask("p1w2d6", 1, 2, 6, "Borrow Checker Practice — Fix the Errors", "15 intentionally broken programs. Fix each borrow error. Understand compiler messages.", 4, "exercise", { url: "https://github.com/rust-lang/rustlings", label: "Rustlings Exercises", platform: "github" }, {
        keyPoints: [
          'Rustlings exercises are small Rust programs with intentional errors to fix',
          'Compiler error E0502: cannot borrow as mutable because it is also borrowed as immutable',
          'Compiler error E0505: cannot move out of a value because it is borrowed',
          'NLL (Non-Lexical Lifetimes): borrows end when last used, not at end of block',
          'Read compiler error messages carefully — they often suggest the exact fix',
        ],
        codeExample: `// Common borrow error patterns and fixes:

fn main() {
    let mut v = vec![1, 2, 3];

    // ERROR: cannot borrow v as mutable while immutable borrow exists
    // let first = &v[0];
    // v.push(4);  // ERROR
    // println!("{first}");

    // FIX: use indices after push, or clone first
    let first = v[0];  // Copy, not borrow
    v.push(4);
    println!("first={first}, v={v:?}");

    // ERROR: moving out of a borrowed context
    let s = String::from("hello");
    let r = &s;
    // let owned = *r;  // ERROR: can't move through reference
    let owned = r.clone();  // FIX: clone
    println!("{s} {owned}");
}`,
        commonMistakes: [
          'Giving up on Rust because of borrow errors — every error is a learning opportunity',
          'Using clone() to silence errors without understanding why they occur',
        ],
        practicePrompt: 'Complete rustlings ownership/ exercises (move_semantics1-6, references1-2). Note each error message and the fix you used.',
      }),
      makeTask("p1w2d7", 1, 2, 7, "Week 2 Project: Word Counter CLI", "Build a word-count tool that reads a file, returns word frequency map. Use String, &str, slices, references.", 4, "project", { url: "https://doc.rust-lang.org/book/", label: "Rust Book Reference", platform: "docs" }, {
        keyPoints: [
          'std::fs::read_to_string() reads a whole file into a String',
          'std::env::args() provides command-line arguments as an iterator',
          'HashMap<K, V> stores key-value pairs — ideal for word frequency counting',
          'entry() API: map.entry(word).or_insert(0) is idiomatic for counting',
          'Sorting a HashMap by value requires collecting into Vec and sorting',
        ],
        codeExample: `use std::collections::HashMap;
use std::fs;
use std::env;

fn count_words(text: &str) -> HashMap<&str, usize> {
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    map
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = args.get(1).expect("Usage: word_count <file>");
    let content = fs::read_to_string(filename).expect("Cannot read file");

    let counts = count_words(&content);
    let mut pairs: Vec<(&&str, &usize)> = counts.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1)); // sort by count desc

    for (word, count) in pairs.iter().take(10) {
        println!("{word}: {count}");
    }
}`,
        commonMistakes: [
          'Using String as HashMap key instead of &str — causes lifetime issues; store owned String',
          'Forgetting to dereference the count: *count += 1 (not count += 1)',
        ],
        practicePrompt: 'Build the word counter. Add a --top N flag to show only top N words. Add a --exclude flag to skip common words like "the", "a", "is".',
      }),
    ],
  },
  {
    weekNumber: 3,
    phaseWeek: 3,
    phaseId: 1,
    title: "Structs, Enums & Pattern Matching",
    goal: "Build custom data types with structs and enums, master pattern matching and Option/Result.",
    isCompleted: false,
    tasks: [
      makeTask("p1w3d1", 1, 3, 1, "Structs: Defining & Using", "Struct syntax, field shorthand, struct update syntax, tuple structs, unit structs. Implement methods with impl block.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Structs", platform: "udemy" }, {
        keyPoints: [
          'struct groups related data into a named type — fields have names and types',
          'Field shorthand: if variable name equals field name, write just the name',
          'Struct update syntax: ..other_struct copies remaining fields from another instance',
          'Tuple structs: struct Point(f64, f64) — access with .0, .1',
          'Unit structs: struct Marker — no fields, useful for trait implementations',
        ],
        codeExample: `#[derive(Debug)]
struct User {
    username: String,
    email: String,
    age: u32,
    active: bool,
}

fn create_user(email: String, username: String) -> User {
    User {
        email,           // field shorthand
        username,        // field shorthand
        age: 0,
        active: true,
    }
}

fn main() {
    let user1 = create_user(
        String::from("alice@example.com"),
        String::from("alice"),
    );

    // Struct update syntax
    let user2 = User {
        email: String::from("bob@example.com"),
        username: String::from("bob"),
        ..user1  // copy age and active from user1
    };
    // Note: user1 is partially moved if String fields are used in ..user1

    println!("{user2:?}");
}`,
        commonMistakes: [
          'Struct update ..user1 moves String fields from user1 — user1.email becomes invalid',
          'Forgetting #[derive(Debug)] and then trying to print with {:?}',
        ],
        practicePrompt: 'Create a BankAccount struct with owner: String, balance: f64, active: bool. Add a new() constructor. Test struct update syntax to create a second account from the first.',
      }),
      makeTask("p1w3d2", 1, 3, 2, "Methods & Associated Functions", "Difference between &self, &mut self, self. Associated functions (like new). Build a Rectangle struct with area/perimeter methods.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch05-03-method-syntax.html", label: "Rust Book — Methods", platform: "docs" }, {
        keyPoints: [
          '&self: read-only method — borrows self, does not modify or consume',
          '&mut self: mutating method — borrows self mutably, can modify fields',
          'self: consuming method — takes ownership, struct unavailable after call',
          'Associated functions (no self): called as Struct::function() — used for constructors',
          'Multiple impl blocks are allowed — useful for organizing large types',
        ],
        codeExample: `#[derive(Debug)]
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // Associated function (constructor)
    pub fn new(width: f64, height: f64) -> Self {
        Self { width, height }
    }

    // Read-only method
    pub fn area(&self) -> f64 {
        self.width * self.height
    }

    pub fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    // Mutating method
    pub fn scale(&mut self, factor: f64) {
        self.width *= factor;
        self.height *= factor;
    }

    pub fn is_square(&self) -> bool {
        (self.width - self.height).abs() < f64::EPSILON
    }
}

fn main() {
    let mut rect = Rectangle::new(10.0, 5.0);
    println!("Area: {:.1}", rect.area());
    rect.scale(2.0);
    println!("After scale: {rect:?}");
}`,
        commonMistakes: [
          'Writing fn area(self) instead of fn area(&self) — consumes the struct unnecessarily',
          'Forgetting pub on methods that need to be called from outside the module',
        ],
        practicePrompt: 'Add a contains(&self, other: &Rectangle) -> bool method that returns true if other fits inside self. Add a largest(rects: &[Rectangle]) -> &Rectangle static method.',
      }),
      makeTask("p1w3d3", 1, 3, 3, "Enums & Match Expressions", "Enum variants with data, match arms, exhaustive matching, _ wildcard, match guards. Rust Book Ch 6.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Enums", platform: "udemy" }, {
        keyPoints: [
          'Enums can hold data — each variant can have different types and amounts',
          'match is exhaustive — all variants must be handled (or use _ wildcard)',
          'match arms return values — the entire match expression is a value',
          'match guards: extra condition with if after the pattern',
          'Enums replace unions/tagged unions from C — much safer and more ergonomic',
        ],
        codeExample: `#[derive(Debug)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

fn process(msg: Message) -> String {
    match msg {
        Message::Quit => String::from("quit"),
        Message::Move { x, y } => format!("move to ({x}, {y})"),
        Message::Write(text) => format!("write: {text}"),
        Message::ChangeColor(r, g, b) => format!("color: #{r:02X}{g:02X}{b:02X}"),
    }
}

// Match guards
fn classify_number(n: i32) -> &'static str {
    match n {
        0 => "zero",
        n if n < 0 => "negative",
        n if n % 2 == 0 => "positive even",
        _ => "positive odd",
    }
}`,
        commonMistakes: [
          'Forgetting to handle all variants — Rust will not compile if match is non-exhaustive',
          'Using if/else when match would be cleaner — match on enums is idiomatic Rust',
        ],
        practicePrompt: 'Create a Shape enum with Circle(f64), Rectangle(f64, f64), Triangle(f64, f64, f64) variants. Write a match expression computing area for each. Add a perimeter method.',
      }),
      makeTask("p1w3d4", 1, 3, 4, "Option<T> — Null Safety in Rust", "Option::Some/None, unwrap/expect/unwrap_or, if let, while let patterns. Replace null-checks with Option.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html", label: "Rust Book — Option", platform: "docs" }, {
        keyPoints: [
          'Option<T> is an enum: Some(T) when value exists, None when absent — no null pointers',
          'unwrap() gets the value but panics on None — only use when you are certain it\'s Some',
          'expect("message") like unwrap but with a custom panic message — good for debugging',
          'unwrap_or(default) returns default on None — safe alternative to unwrap',
          'if let Some(x) = option { ... } is idiomatic for single-variant pattern matching',
        ],
        codeExample: `fn find_user(id: u32) -> Option<String> {
    if id == 1 { Some(String::from("Alice")) }
    else { None }
}

fn main() {
    // Basic usage
    let user = find_user(1);
    match user {
        Some(name) => println!("Found: {name}"),
        None => println!("Not found"),
    }

    // Concise: if let
    if let Some(name) = find_user(2) {
        println!("Found: {name}");
    }

    // Chaining with ? operator (in Result context)
    // let name = find_user(id)?; // returns None early if None

    // Safe alternatives to unwrap
    let name = find_user(1).unwrap_or(String::from("Guest"));
    let name2 = find_user(1).unwrap_or_else(|| String::from("Guest"));
    let upper = find_user(1).map(|s| s.to_uppercase());
    println!("{name} {name2} {upper:?}");
}`,
        commonMistakes: [
          'Using .unwrap() without checking — always prefer .unwrap_or(), .map(), or match',
          'Not using Option — returning -1 or empty string for "no value" is not idiomatic Rust',
        ],
        practicePrompt: 'Write a function lookup_config(key: &str) -> Option<&str> using a HashMap. Call it 5 times with different keys, handle Some and None with if let and unwrap_or.',
      }),
      makeTask("p1w3d5", 1, 3, 5, "Result<T, E> — Error Handling Basics", "Result::Ok/Err, match on Result, ? operator, error propagation. Build a file-parsing function with proper errors.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Result", platform: "udemy" }, {
        keyPoints: [
          'Result<T, E> is an enum: Ok(T) for success, Err(E) for failure — replaces exceptions',
          'The ? operator propagates errors up the call stack — like try/catch but at compile time',
          '? can only be used in functions returning Result or Option',
          'map_err() transforms the error type — useful when ? requires specific error types',
          'unwrap()/expect() on Result panics on Err — only use in scripts or tests',
        ],
        codeExample: `use std::fs;
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    Io(std::io::Error),
    Parse(ParseIntError),
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self { AppError::Io(e) }
}
impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self { AppError::Parse(e) }
}

fn read_number_from_file(path: &str) -> Result<i64, AppError> {
    let content = fs::read_to_string(path)?;  // ? converts io::Error -> AppError
    let n: i64 = content.trim().parse()?;     // ? converts ParseIntError -> AppError
    Ok(n)
}

fn main() {
    match read_number_from_file("number.txt") {
        Ok(n) => println!("Number: {n}"),
        Err(AppError::Io(e)) => println!("IO error: {e}"),
        Err(AppError::Parse(e)) => println!("Parse error: {e}"),
    }
}`,
        commonMistakes: [
          'Using ? in main() without declaring fn main() -> Result<(), Box<dyn Error>>',
          'Returning different error types with ? without implementing From conversions',
        ],
        practicePrompt: 'Write a CSV parser: read a file with "name,age" per line, parse each, return Vec<(String, u32)> or a custom ParseError. Handle malformed lines gracefully.',
      }),
      makeTask("p1w3d6", 1, 3, 6, "Pattern Matching Deep Dive", "Destructuring structs/enums/tuples in match, if let chains, @ bindings, nested patterns.", 4, "exercise", { url: "https://doc.rust-lang.org/book/ch18-00-patterns.html", label: "Rust Book — Patterns", platform: "docs" }, {
        keyPoints: [
          'Patterns work in: match, if let, while let, for loops, let bindings, function parameters',
          'Destructuring structs: let Point { x, y } = p; extracts fields directly',
          '@ binding: let n @ 1..=10 = value — bind AND test the value in one step',
          'Tuple patterns in match: match (x, y) { (0, 0) => ..., (x, 0) => ..., _ => ... }',
          'Multiple patterns with |: match n { 1 | 2 | 3 => "small", _ => "large" }',
        ],
        codeExample: `#[derive(Debug)]
struct Point { x: i32, y: i32 }

enum Cmd { Move(Point), Say(String), Volume(u8) }

fn process(cmd: Cmd) {
    match cmd {
        Cmd::Move(Point { x: 0, y }) => println!("move on y-axis to {y}"),
        Cmd::Move(Point { x, y: 0 }) => println!("move on x-axis to {x}"),
        Cmd::Move(Point { x, y }) => println!("move to ({x}, {y})"),
        Cmd::Say(msg) if msg.is_empty() => println!("silent"),
        Cmd::Say(msg) => println!("say: {msg}"),
        Cmd::Volume(v @ 0..=10) => println!("quiet: {v}"),
        Cmd::Volume(v @ 90..=100) => println!("loud: {v}"),
        Cmd::Volume(v) => println!("volume: {v}"),
    }
}

fn main() {
    // if let chains (Rust 2024)
    let pair = (1, -2);
    if let (x, y) = pair && x > 0 && y < 0 {
        println!("first positive, second negative");
    }
}`,
        commonMistakes: [
          'Using _ in @ bindings: n @ _ — just use n without @ for a catch-all bind',
          'Trying to use non-const values in patterns — patterns require compile-time constants',
        ],
        practicePrompt: 'Write a message router: enum Message with 5+ variants including nested structs. Handle each with match, using struct destructuring, @ bindings, and guards.',
      }),
      makeTask("p1w3d7", 1, 3, 7, "Project: Student Grade Tracker", "Build a struct-based grade tracking app. StudentRecord with name, grades Vec, avg method. Enum for letter grades.", 4, "project", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust", platform: "udemy" }, {
        keyPoints: [
          'Combine structs + enums + methods to build a small but complete application',
          'Vec<f64> for grades — push, iter, sum, len operations',
          'Enum for letter grade: A, B, C, D, F with From<f64> implementation',
          'Display trait: implement fmt::Display for custom println! output',
          'Sort students by average with sort_by on a Vec of StudentRecord',
        ],
        codeExample: `use std::fmt;

#[derive(Debug, PartialEq)]
enum Grade { A, B, C, D, F }

impl From<f64> for Grade {
    fn from(avg: f64) -> Self {
        match avg as u32 {
            90..=100 => Grade::A,
            80..=89  => Grade::B,
            70..=79  => Grade::C,
            60..=69  => Grade::D,
            _        => Grade::F,
        }
    }
}

struct Student {
    name: String,
    scores: Vec<f64>,
}

impl Student {
    fn new(name: &str) -> Self {
        Self { name: name.to_string(), scores: Vec::new() }
    }
    fn add_score(&mut self, s: f64) { self.scores.push(s); }
    fn average(&self) -> f64 {
        if self.scores.is_empty() { return 0.0; }
        self.scores.iter().sum::<f64>() / self.scores.len() as f64
    }
    fn grade(&self) -> Grade { Grade::from(self.average()) }
}

impl fmt::Display for Student {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {:.1} ({:?})", self.name, self.average(), self.grade())
    }
}`,
        commonMistakes: [
          'Implementing Display by printing directly — it must write to f using write! macro',
          'Using f64 in match patterns — floats cannot be used in patterns, convert to int first',
        ],
        practicePrompt: 'Build the full grade tracker with at least 5 students, 4 scores each. Sort by average descending. Print a table with rank, name, average, letter grade.',
      }),
    ],
  },
  {
    weekNumber: 4,
    phaseWeek: 4,
    phaseId: 1,
    title: "Traits, Iterators & Error Handling",
    goal: "Understand trait-based polymorphism, use iterators functionally, and handle errors idiomatically.",
    isCompleted: false,
    tasks: [
      makeTask("p1w4d1", 1, 4, 1, "Traits: Defining & Implementing", "Define custom traits, implement for your types, default implementations, trait bounds. Display/Debug traits.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Traits", platform: "udemy" }, {
        keyPoints: [
          'Traits define shared behavior — like interfaces in other languages but more powerful',
          'Default implementations: provide a body in the trait; types can override or use default',
          'Trait bounds: fn largest<T: PartialOrd>(list: &[T]) constrains T to types with ordering',
          'Coherence rule (orphan rule): you can only impl a trait for a type if you own the trait or the type',
          'Derive macros (#[derive(Debug, Clone)]) auto-implement common traits',
        ],
        codeExample: `trait Animal {
    fn name(&self) -> &str;
    fn sound(&self) -> &str;

    // Default implementation
    fn describe(&self) -> String {
        format!("The {} says '{}'", self.name(), self.sound())
    }
}

struct Dog { name: String }
struct Cat { name: String }

impl Animal for Dog {
    fn name(&self) -> &str { &self.name }
    fn sound(&self) -> &str { "woof" }
}

impl Animal for Cat {
    fn name(&self) -> &str { &self.name }
    fn sound(&self) -> &str { "meow" }
    // Overrides default describe()
    fn describe(&self) -> String {
        format!("{} ignores you and says '{}'", self.name(), self.sound())
    }
}

fn make_sound(animal: &dyn Animal) {
    println!("{}", animal.describe());
}`,
        commonMistakes: [
          'Implementing std::fmt::Display for a type you don\'t own (orphan rule violation)',
          'Calling a default method on a type that overrides it — the override takes precedence',
        ],
        practicePrompt: 'Create a Drawable trait with draw(&self) -> String and bounding_box(&self) -> (f64, f64) methods. Implement for Circle, Rectangle, Triangle. Write a function that draws all shapes in a Vec<Box<dyn Drawable>>.',
      }),
      makeTask("p1w4d2", 1, 4, 2, "Iterators & Closures", "Iterator trait, map/filter/fold/collect, closure syntax, move closures, chaining iterators.", 4, "video", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust — Iterators", platform: "udemy" }, {
        keyPoints: [
          'Iterators are lazy — they don\'t compute until consumed by collect, sum, for_each, etc.',
          'Closures: |x| x + 1 captures variables from surrounding scope',
          'map() transforms each element, filter() keeps matching elements, fold() accumulates',
          'collect::<Vec<_>>() materializes an iterator into a collection',
          'move closures: move |x| ... takes ownership of captured variables — needed for threads',
        ],
        codeExample: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Chained iterator operations (lazy until collect/sum)
    let result: Vec<i32> = numbers.iter()
        .filter(|&&x| x % 2 == 0)   // keep evens: [2,4,6,8,10]
        .map(|&x| x * x)             // square them: [4,16,36,64,100]
        .collect();
    println!("{result:?}");

    // fold (like reduce)
    let sum = numbers.iter().fold(0, |acc, &x| acc + x);
    println!("sum: {sum}");

    // Closure capturing environment
    let threshold = 5;
    let big: Vec<&i32> = numbers.iter()
        .filter(|&&x| x > threshold)  // captures threshold
        .collect();

    // Move closure (for threads)
    let data = vec![1, 2, 3];
    let handle = std::thread::spawn(move || {
        println!("{data:?}"); // data moved into closure
    });
    handle.join().unwrap();
}`,
        commonMistakes: [
          'Calling iter() for owned values vs into_iter() — iter() borrows, into_iter() moves',
          'Forgetting that .filter() closure gets &&T when chaining — double deref or use pattern |&x|',
        ],
        practicePrompt: 'Given a Vec of strings representing sales amounts "USD 150.50", chain .map() to parse the numbers, .filter() to keep > 100, .sum() to total them. Use ? with map for error handling.',
      }),
      makeTask("p1w4d3", 1, 4, 3, "Collections: Vec, HashMap, HashSet", "Vec methods, HashMap insert/get/entry API, HashSet operations. When to use each.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch08-00-common-collections.html", label: "Rust Book — Collections", platform: "docs" }, {
        keyPoints: [
          'Vec<T>: sequential access, push/pop at end O(1), insert/remove at index O(n)',
          'HashMap<K, V>: key-value pairs, O(1) average lookup, keys must implement Hash + Eq',
          'HashSet<T>: unique values, O(1) contains check, union/intersection/difference operations',
          'BTreeMap<K, V>: sorted keys, O(log n) operations — use when ordering matters',
          'entry() API avoids double lookups: map.entry(key).or_insert_with(|| default)',
        ],
        codeExample: `use std::collections::{HashMap, HashSet};

fn main() {
    // Vec operations
    let mut v: Vec<i32> = Vec::new();
    v.push(1); v.push(2); v.push(3);
    v.retain(|&x| x > 1);     // remove if condition false
    println!("{v:?}");          // [2, 3]

    // HashMap — frequency counter
    let text = "the quick brown fox jumps the fox";
    let mut freq: HashMap<&str, u32> = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word).or_insert(0) += 1;
    }
    println!("{freq:?}");

    // HashSet — unique values
    let a: HashSet<i32> = [1, 2, 3, 4].iter().cloned().collect();
    let b: HashSet<i32> = [3, 4, 5, 6].iter().cloned().collect();
    let intersection: HashSet<&i32> = a.intersection(&b).collect();
    println!("common: {intersection:?}");  // {3, 4}
}`,
        commonMistakes: [
          'Using HashMap::get() which returns Option<&V> — don\'t forget to unwrap or match',
          'Iterating over HashMap and expecting a sorted order — use BTreeMap for sorted iteration',
        ],
        practicePrompt: 'Build a simple in-memory phone book: HashMap<String, Vec<String>> (name -> list of numbers). Implement add, lookup, remove, list_all operations. Use HashSet to deduplicate numbers.',
      }),
      makeTask("p1w4d4", 1, 4, 4, "Error Handling: Box<dyn Error> & thiserror", "Custom error types, Box<dyn Error>, the thiserror crate, anyhow crate. Write robust error handling.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch09-00-error-handling.html", label: "Rust Book — Error Handling", platform: "docs" }, {
        keyPoints: [
          'Box<dyn Error>: simplest way to return any error type from a function',
          'thiserror crate: #[derive(Error)] for ergonomic custom error types in libraries',
          'anyhow crate: anyhow::Result<T> for application-level error handling (no custom types needed)',
          'impl Display for YourError is required for error types',
          'Error context: anyhow\'s .context("message")? adds human-readable context to errors',
        ],
        codeExample: `// thiserror for library code
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("config file not found: {path}")]
    NotFound { path: String },
    #[error("invalid format on line {line}: {msg}")]
    ParseError { line: usize, msg: String },
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

fn load_config(path: &str) -> Result<String, ConfigError> {
    let content = std::fs::read_to_string(path)
        .map_err(|e| ConfigError::Io(e))?;
    if content.is_empty() {
        return Err(ConfigError::ParseError { line: 1, msg: "empty file".into() });
    }
    Ok(content)
}

// anyhow for application code
use anyhow::{Context, Result};

fn run() -> Result<()> {
    let config = load_config("app.toml")
        .context("Failed to load app configuration")?;
    println!("{config}");
    Ok(())
}`,
        commonMistakes: [
          'Using Box<dyn Error> in library code — prefer thiserror for stable, typed errors',
          'Not implementing From<OtherError> for your error type — then ? won\'t auto-convert',
        ],
        practicePrompt: 'Refactor your CSV parser from Week 3 to use thiserror with a CsvError enum (IoError, ParseError, InvalidHeader). Add .context() with anyhow for descriptive error messages.',
      }),
      makeTask("p1w4d5", 1, 4, 5, "Generics & Type Parameters", "Generic functions, generic structs, multiple type parameters, where clauses. Rust Book Ch 10.", 4, "reading", { url: "https://doc.rust-lang.org/book/ch10-01-syntax.html", label: "Rust Book — Generics", platform: "docs" }, {
        keyPoints: [
          'Generics allow writing code that works for multiple types without duplication',
          'fn largest<T: PartialOrd>(list: &[T]) — T must implement PartialOrd for comparison',
          'where clauses: cleaner syntax for complex bounds: where T: Clone + Debug',
          'Monomorphization: Rust generates separate code for each concrete type — zero runtime cost',
          'Associated types vs type parameters: Iterator::Item is an associated type (single impl per type)',
        ],
        codeExample: `// Generic function with trait bound
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// Generic struct
#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T: Clone + std::fmt::Display> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }

    fn display_max(&self) where T: PartialOrd {
        if self.first >= self.second {
            println!("max is {}", self.first);
        } else {
            println!("max is {}", self.second);
        }
    }
}

fn main() {
    let nums = vec![34, 50, 25, 100, 65];
    println!("largest: {}", largest(&nums));

    let p = Pair::new("hello", "world");
    p.display_max();
}`,
        commonMistakes: [
          'Not adding required trait bounds — compiler error "binary operation > cannot be applied to type T"',
          'Using generics when a concrete type is fine — over-engineering reduces readability',
        ],
        practicePrompt: 'Write a generic Stack<T> with push, pop, peek, is_empty, len methods. Add a drain() method that returns all items as Vec<T>. Test with String, i32, and a custom struct.',
      }),
      makeTask("p1w4d6", 1, 4, 6, "Testing in Rust", "#[test], #[cfg(test)], assert!/assert_eq!, integration tests, doctests. Test your grade tracker.", 4, "exercise", { url: "https://doc.rust-lang.org/book/ch11-00-testing.html", label: "Rust Book — Testing", platform: "docs" }),
      makeTask("p1w4d7", 1, 4, 7, "Phase 1 Capstone: CLI Todo App", "Build a full CLI todo app with: add/remove/complete/list tasks, persist to JSON file, proper error handling, unit tests.", 4, "project", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust", platform: "udemy" }),
    ],
  },
]

// ─── Phase 2: Rust Advanced (Weeks 5–8) ──────────────────────────────────────
const phase2Weeks: Week[] = [
  {
    weekNumber: 5,
    phaseWeek: 1,
    phaseId: 2,
    title: "Generics, Trait Objects & Lifetimes",
    goal: "Master advanced type-system features: generics, dynamic dispatch with trait objects, and lifetime annotations.",
    isCompleted: false,
    tasks: [
      makeTask("p2w1d1", 2, 5, 1, "Advanced Generics & Monomorphization", "Generic functions/structs/enums, monomorphization cost, associated types vs type parameters. PhantomData.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Generics", platform: "udemy" }),
      makeTask("p2w1d2", 2, 5, 2, "Advanced Trait Patterns", "Trait bounds, where clauses, supertraits, blanket implementations, From/Into/AsRef/AsMut.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Advanced Traits", platform: "udemy" }),
      makeTask("p2w1d3", 2, 5, 3, "Trait Objects: dyn Trait", "Static vs dynamic dispatch, vtable, Box<dyn Trait>, dyn Trait in function signatures, object safety.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch17-02-trait-objects.html", label: "Rust Book — Trait Objects", platform: "docs" }),
      makeTask("p2w1d4", 2, 5, 4, "Lifetime Annotations", "What lifetimes mean, 'a syntax, lifetime in function signatures, structs with references, lifetime elision rules.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Lifetimes", platform: "udemy" }),
      makeTask("p2w1d5", 2, 5, 5, "Advanced Lifetime Scenarios", "Multiple lifetimes, lifetime bounds, 'static lifetime, lifetime with trait objects, NLL (Non-Lexical Lifetimes).", 4, "reading", { url: "https://doc.rust-lang.org/nomicon/lifetimes.html", label: "Rustonomicon — Lifetimes", platform: "docs" }),
      makeTask("p2w1d6", 2, 5, 6, "Practice: Generic Data Structures", "Implement a generic Stack<T>, Queue<T>, and BinaryTree<T> from scratch.", 4, "exercise", { url: "https://exercism.org/tracks/rust", label: "Exercism — Data Structures", platform: "custom" }),
      makeTask("p2w1d7", 2, 5, 7, "Project: Generic Event System", "Build a type-safe event emitter using generics + trait objects. Support multiple event types.", 4, "project", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }),
    ],
  },
  {
    weekNumber: 6,
    phaseWeek: 2,
    phaseId: 2,
    title: "Smart Pointers & Interior Mutability",
    goal: "Understand Rust's smart pointer types and interior mutability patterns for shared ownership.",
    isCompleted: false,
    tasks: [
      makeTask("p2w2d1", 2, 6, 1, "Box<T> — Heap Allocation & Indirection", "When to use Box, recursive types, deref coercion, Box for trait objects.", 4, "video", { url: "https://doc.rust-lang.org/book/ch15-01-box.html", label: "Rust Book — Box", platform: "docs" }),
      makeTask("p2w2d2", 2, 6, 2, "Rc<T> & Arc<T> — Reference Counting", "Shared ownership with Rc, atomic reference counting with Arc, when to use which.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Rc/Arc", platform: "udemy" }),
      makeTask("p2w2d3", 2, 6, 3, "RefCell<T> & Interior Mutability", "The interior mutability pattern, RefCell borrow checking at runtime, Cell<T>, panic on double-borrow.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch15-05-interior-mutability.html", label: "Rust Book — Interior Mutability", platform: "docs" }),
      makeTask("p2w2d4", 2, 6, 4, "Mutex<T> & RwLock<T>", "Thread-safe shared state, Arc<Mutex<T>> pattern, deadlock prevention, RwLock for read-heavy workloads.", 4, "coding", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Mutex", platform: "udemy" }),
      makeTask("p2w2d5", 2, 6, 5, "Deref Trait & Coercions", "Implement Deref, deref coercion rules, * operator, auto-deref in method calls.", 4, "reading", { url: "https://doc.rust-lang.org/book/ch15-02-deref.html", label: "Rust Book — Deref", platform: "docs" }),
      makeTask("p2w2d6", 2, 6, 6, "Drop Trait & RAII", "Custom cleanup with Drop, RAII pattern, std::mem::drop, why you can't call drop manually.", 4, "exercise", { url: "https://doc.rust-lang.org/book/ch15-03-drop.html", label: "Rust Book — Drop", platform: "docs" }),
      makeTask("p2w2d7", 2, 6, 7, "Project: Thread-Safe Cache", "Build an LRU cache with Arc<Mutex<HashMap>> accessible from multiple threads.", 4, "project", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }),
    ],
  },
  {
    weekNumber: 7,
    phaseWeek: 3,
    phaseId: 2,
    title: "Async/Await, Tokio & Concurrency",
    goal: "Write asynchronous Rust programs using Tokio, understand futures and concurrency primitives.",
    isCompleted: false,
    tasks: [
      makeTask("p2w3d1", 2, 7, 1, "Async/Await Fundamentals", "async fn, .await, Future trait, executor model. Why async in Rust is different from other languages.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Async", platform: "udemy" }),
      makeTask("p2w3d2", 2, 7, 2, "Tokio Runtime & Tasks", "tokio::main, tokio::spawn, task handles, JoinHandle, tokio::select!, task cancellation.", 4, "video", { url: "https://tokio.rs/tokio/tutorial", label: "Tokio Tutorial", platform: "docs" }),
      makeTask("p2w3d3", 2, 7, 3, "Channels: mpsc, oneshot, broadcast", "std::sync::mpsc, tokio channels, choosing the right channel type, backpressure.", 4, "coding", { url: "https://tokio.rs/tokio/tutorial/channels", label: "Tokio — Channels", platform: "docs" }),
      makeTask("p2w3d4", 2, 7, 4, "Streams & AsyncRead/Write", "tokio::io traits, BufReader, StreamExt, processing async data streams.", 4, "coding", { url: "https://tokio.rs/tokio/tutorial/io", label: "Tokio — I/O", platform: "docs" }),
      makeTask("p2w3d5", 2, 7, 5, "Error Handling in Async Code", "? operator in async, anyhow in async context, JoinError, handling panics in tasks.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }),
      makeTask("p2w3d6", 2, 7, 6, "Rayon: Data Parallelism", "rayon::par_iter, parallel map/filter/reduce, when to use Rayon vs Tokio.", 4, "exercise", { url: "https://docs.rs/rayon/latest/rayon/", label: "Rayon Docs", platform: "docs" }),
      makeTask("p2w3d7", 2, 7, 7, "Project: Async Web Scraper", "Build async web scraper with reqwest + Tokio. Fetch 20 URLs concurrently, parse HTML, save results.", 4, "project", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }),
    ],
  },
  {
    weekNumber: 8,
    phaseWeek: 4,
    phaseId: 2,
    title: "Macros, Unsafe & FFI",
    goal: "Write declarative macros, understand unsafe Rust boundaries, and call C code from Rust.",
    isCompleted: false,
    tasks: [
      makeTask("p2w4d1", 2, 8, 1, "Declarative Macros (macro_rules!)", "macro_rules! syntax, patterns, $expr/$ident/$ty, building your own vec!-like macro.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Macros", platform: "udemy" }),
      makeTask("p2w4d2", 2, 8, 2, "Procedural Macros", "Custom derive, attribute macros, function-like proc macros. Use syn + quote crates.", 4, "reading", { url: "https://doc.rust-lang.org/reference/procedural-macros.html", label: "Rust Reference — Proc Macros", platform: "docs" }),
      makeTask("p2w4d3", 2, 8, 3, "Unsafe Rust — The Contract", "unsafe blocks, raw pointers, unsafe functions/traits, when unsafe is appropriate. Rustonomicon overview.", 4, "reading", { url: "https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html", label: "Rust Book — Unsafe", platform: "docs" }),
      makeTask("p2w4d4", 2, 8, 4, "FFI — Calling C from Rust", "extern 'C' blocks, #[repr(C)], bindgen tool, libc crate, calling printf from Rust.", 4, "coding", { url: "https://doc.rust-lang.org/nomicon/ffi.html", label: "Rustonomicon — FFI", platform: "docs" }),
      makeTask("p2w4d5", 2, 8, 5, "Performance: Profiling & Benchmarking", "criterion crate for benchmarks, perf/flamegraph basics, SIMD basics, avoid unnecessary allocations.", 4, "coding", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Performance", platform: "udemy" }),
      makeTask("p2w4d6", 2, 8, 6, "Optimization Patterns", "Zero-cost abstractions, inlining, newtype pattern, avoid Box where possible, string interning.", 4, "exercise", { url: "https://nnethercote.github.io/perf-book/", label: "Rust Performance Book", platform: "docs" }),
      makeTask("p2w4d7", 2, 8, 7, "Phase 2 Capstone: HTTP Server", "Build a minimal HTTP/1.1 server from scratch using Tokio with async handlers, routing, middleware concept.", 4, "project", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }),
    ],
  },
]

// ─── Phase 3: Ardan Labs Certification (Weeks 9–12) ──────────────────────────
const phase3Weeks: Week[] = [
  {
    weekNumber: 9,
    phaseWeek: 1,
    phaseId: 3,
    title: "Systems Programming & Memory Model",
    goal: "Deep dive into systems programming concepts: memory layout, alignment, low-level operations.",
    isCompleted: false,
    tasks: [
      makeTask("p3w1d1", 3, 9, 1, "Memory Layout & Alignment", "struct layout, repr(C) vs repr(Rust), padding, size_of, align_of, memory layout tools.", 4, "video", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Systems Programming", platform: "ardan" }),
      makeTask("p3w1d2", 3, 9, 2, "The Rust Type System at Depth", "PhantomData, variance, covariance/contravariance, sized/unsized types, fat pointers.", 4, "video", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Type System", platform: "ardan" }),
      makeTask("p3w1d3", 3, 9, 3, "Global State & Lazy Initialization", "std::sync::OnceLock, once_cell, lazy_static. Safe global configuration patterns.", 4, "coding", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs Training", platform: "ardan" }),
      makeTask("p3w1d4", 3, 9, 4, "Service Patterns in Rust", "Builder pattern, service struct with handlers, dependency injection without DI framework.", 4, "coding", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Service Patterns", platform: "ardan" }),
      makeTask("p3w1d5", 3, 9, 5, "Concurrency Deep Dive", "Send + Sync traits, thread safety proofs, work-stealing, Tokio internals overview.", 4, "reading", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Concurrency", platform: "ardan" }),
      makeTask("p3w1d6", 3, 9, 6, "gRPC in Rust with Tonic", "Protocol Buffers, tonic crate, define service, implement server/client, streaming RPCs.", 4, "coding", { url: "https://github.com/hyperium/tonic", label: "Tonic gRPC", platform: "github" }),
      makeTask("p3w1d7", 3, 9, 7, "Mock Exam: Systems Topics (25q)", "Take 25-question mock focused on memory layout, concurrency, unsafe. Score yourself. Review wrong answers.", 4, "exam", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs Mock Exam", platform: "ardan" }),
    ],
  },
  {
    weekNumber: 10,
    phaseWeek: 2,
    phaseId: 3,
    title: "Concurrency Patterns & Advanced APIs",
    goal: "Master concurrency patterns used in production Rust systems and the full Ardan curriculum.",
    isCompleted: false,
    tasks: [
      makeTask("p3w2d1", 3, 10, 1, "Thread Pools & Work Queues", "Build a thread pool from scratch. Arc<Mutex<VecDeque>>, worker threads, graceful shutdown.", 4, "coding", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Thread Pools", platform: "ardan" }),
      makeTask("p3w2d2", 3, 10, 2, "Actor Pattern in Rust", "Tokio-based actor model, message passing, supervision, state isolation without shared memory.", 4, "video", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Actor Pattern", platform: "ardan" }),
      makeTask("p3w2d3", 3, 10, 3, "Advanced Error Handling at Scale", "Error hierarchies with thiserror, converting between error types, context propagation with tracing.", 4, "coding", { url: "https://docs.rs/thiserror/latest/thiserror/", label: "thiserror crate", platform: "docs" }),
      makeTask("p3w2d4", 3, 10, 4, "Observability: Tracing & Metrics", "tracing crate, structured logging, spans, tokio-console, metrics with prometheus client.", 4, "video", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Observability", platform: "ardan" }),
      makeTask("p3w2d5", 3, 10, 5, "Testing at Scale: Integration & E2E", "Test organization, test fixtures, mock HTTP servers with wiremock, database test patterns.", 4, "exercise", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs — Testing", platform: "ardan" }),
      makeTask("p3w2d6", 3, 10, 6, "CI/CD for Rust Projects", "GitHub Actions for Rust: clippy, fmt, test, audit, deny. Cross-compilation targets.", 4, "coding", { url: "https://github.com/actions/starter-workflows", label: "GitHub Actions", platform: "github" }),
      makeTask("p3w2d7", 3, 10, 7, "Mock Exam: Full Ardan Format (50q)", "50-question mock exam covering all Ardan topics. Time: 45 minutes. Review all wrong answers.", 4, "exam", { url: "https://www.ardanlabs.com/training/", label: "Ardan Labs Mock Exam", platform: "ardan" }),
    ],
  },
  {
    weekNumber: 11,
    phaseWeek: 3,
    phaseId: 3,
    title: "Mock Exams & Weak Area Focus",
    goal: "Take full 100-question mock exams, identify weak areas, drill targeted practice.",
    isCompleted: false,
    tasks: [
      makeTask("p3w3d1", 3, 11, 1, "Full Mock Exam #1 (100q/90min)", "Simulated Ardan Rust Certification exam. 100 questions, 90 minutes. No peeking.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w3d2", 3, 11, 2, "Exam #1 Review & Analysis", "Go through every wrong answer. Categorize by topic. Create flashcards for weak areas.", 4, "exercise", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w3d3", 3, 11, 3, "Drill: Ownership & Borrowing (50 questions)", "Focused drilling on ownership, borrowing, lifetimes. These are highest-weight topics on the exam.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w3d4", 3, 11, 4, "Drill: Concurrency & Async (30 questions)", "Focused drilling on async/await, channels, Arc<Mutex<T>>, Send + Sync.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w3d5", 3, 11, 5, "Full Mock Exam #2 (100q/90min)", "Second full mock. Compare score to Exam #1. Look for improvement.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w3d6", 3, 11, 6, "Exam #2 Review & Remediation", "Deep review of persistent weak areas. Reread relevant Rust Book chapters.", 4, "reading", { url: "https://doc.rust-lang.org/book/", label: "The Rust Book", platform: "docs" }),
      makeTask("p3w3d7", 3, 11, 7, "Full Mock Exam #3 (100q/90min)", "Third mock — targeting 85%+ score. You need 80% to pass the real exam.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
    ],
  },
  {
    weekNumber: 12,
    phaseWeek: 4,
    phaseId: 3,
    title: "Exam Day Preparation",
    goal: "Final preparation, exam logistics, and take the official Ardan Labs Rust Certification.",
    isCompleted: false,
    tasks: [
      makeTask("p3w4d1", 3, 12, 1, "Final Topic Review: Trait System", "All trait-related topics: object safety, blanket impls, orphan rule, coherence. High-yield review.", 4, "reading", { url: "https://doc.rust-lang.org/reference/items/traits.html", label: "Rust Reference — Traits", platform: "docs" }),
      makeTask("p3w4d2", 3, 12, 2, "Final Topic Review: Memory & Lifetimes", "Lifetime elision, 'static, lifetime variance. Write 20 programs from memory with complex lifetimes.", 4, "coding", { url: "https://doc.rust-lang.org/nomicon/", label: "Rustonomicon", platform: "docs" }),
      makeTask("p3w4d3", 3, 12, 3, "Final Mock Exam #4 (100q/75min)", "Tighter time limit. Simulate real exam pressure. Target: 90%.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification", platform: "ardan" }),
      makeTask("p3w4d4", 3, 12, 4, "Exam Day Checklist & Logistics", "Review exam format, proctoring setup, ID requirements, equipment check. Rest and prepare.", 4, "exercise", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification Page", platform: "ardan" }),
      makeTask("p3w4d5", 3, 12, 5, "TAKE THE ARDAN RUST CERTIFICATION EXAM", "Official exam day. 100 questions, 90 minutes, 80% to pass. Certificate + badge on completion.", 4, "exam", { url: "https://www.ardanlabs.com/certification/", label: "Ardan Labs Certification — Take Exam", platform: "ardan" }),
      makeTask("p3w4d6", 3, 12, 6, "Celebrate & Share Your Badge", "Share LinkedIn badge, GitHub profile README update. Post on X/Twitter. Take a rest day.", 2, "exercise", { url: "https://www.linkedin.com/", label: "LinkedIn — Update Profile", platform: "custom" }),
      makeTask("p3w4d7", 3, 12, 7, "Phase 3 Retrospective & Phase 4 Planning", "Write down what worked, what didn't. Set up LeetCode account with Rust as primary language. Create tracking spreadsheet.", 2, "exercise", { url: "https://leetcode.com/", label: "LeetCode — Rust Setup", platform: "leetcode" }),
    ],
  },
]

// ─── Phase 4: LeetCode Grind (Weeks 13–16) ────────────────────────────────────
const phase4Weeks: Week[] = [
  {
    weekNumber: 13,
    phaseWeek: 1,
    phaseId: 4,
    title: "Arrays, Strings & Hash Maps",
    goal: "Solve 231 LeetCode problems in Arrays, Strings, and Hash Maps categories using Rust.",
    isCompleted: false,
    tasks: [
      makeTask("p4w1d1", 4, 13, 1, "Arrays: Two Sum, Best Time to Buy (33 problems)", "Focus: Two pointers, sliding window, prefix sum. Easy: 20 problems. Medium: 13 problems.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=array&difficulty=EASY", label: "LeetCode — Array Easy", platform: "leetcode" }),
      makeTask("p4w1d2", 4, 13, 2, "Array: Sliding Window & Prefix Sum (33 problems)", "Subarray sum, max/min subarray, fixed-size window problems in Rust.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=array&difficulty=MEDIUM", label: "LeetCode — Array Medium", platform: "leetcode" }),
      makeTask("p4w1d3", 4, 13, 3, "Strings: Palindromes & Anagrams (33 problems)", "String manipulation, character frequency, anagram detection, longest palindrome.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=string", label: "LeetCode — String", platform: "leetcode" }),
      makeTask("p4w1d4", 4, 13, 4, "Hash Maps & Sets (33 problems)", "Frequency maps, two-sum with HashMap, group anagrams, LRU cache concept.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=hash-table", label: "LeetCode — Hash Table", platform: "leetcode" }),
      makeTask("p4w1d5", 4, 13, 5, "Two Pointers Pattern (33 problems)", "Valid palindrome, 3Sum, container with most water, remove duplicates.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=two-pointers", label: "LeetCode — Two Pointers", platform: "leetcode" }),
      makeTask("p4w1d6", 4, 13, 6, "Review & Re-solve Hard Array Problems (33 problems)", "Median of two sorted arrays, trapping rain water, jump game II. Understand optimal solutions.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=array&difficulty=HARD", label: "LeetCode — Array Hard", platform: "leetcode" }),
      makeTask("p4w1d7", 4, 13, 7, "Catch-up Day + Rust Idioms for Competitive Coding", "Complete any missed problems. Learn Rust-specific patterns: BTreeMap, BinaryHeap, VecDeque.", 4, "leetcode", { url: "https://leetcode.com/", label: "LeetCode", platform: "leetcode" }),
    ],
  },
  {
    weekNumber: 14,
    phaseWeek: 2,
    phaseId: 4,
    title: "Linked Lists, Stacks, Trees & BST",
    goal: "Solve 231 LeetCode problems on linked list, stack/queue, tree traversal topics.",
    isCompleted: false,
    tasks: [
      makeTask("p4w2d1", 4, 14, 1, "Linked Lists in Rust (33 problems)", "Reverse linked list, merge sorted lists, detect cycle. Rust linked lists are tricky — use Box.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=linked-list", label: "LeetCode — Linked List", platform: "leetcode" }),
      makeTask("p4w2d2", 4, 14, 2, "Stacks & Queues (33 problems)", "Valid parentheses, min stack, implement queue with stacks, daily temperatures.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=stack", label: "LeetCode — Stack", platform: "leetcode" }),
      makeTask("p4w2d3", 4, 14, 3, "Binary Tree Traversal (33 problems)", "Inorder/preorder/postorder, level order BFS, max depth, symmetric tree.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=binary-tree", label: "LeetCode — Binary Tree", platform: "leetcode" }),
      makeTask("p4w2d4", 4, 14, 4, "Binary Search Tree (33 problems)", "Insert/delete/search in BST, validate BST, kth smallest element, BST iterator.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=binary-search-tree", label: "LeetCode — BST", platform: "leetcode" }),
      makeTask("p4w2d5", 4, 14, 5, "Tree: Advanced Patterns (33 problems)", "Path sum, lowest common ancestor, serialize/deserialize, count complete tree nodes.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=tree", label: "LeetCode — Tree", platform: "leetcode" }),
      makeTask("p4w2d6", 4, 14, 6, "Monotonic Stack & Deque (33 problems)", "Largest rectangle in histogram, sliding window maximum, next greater element.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=monotonic-stack", label: "LeetCode — Monotonic Stack", platform: "leetcode" }),
      makeTask("p4w2d7", 4, 14, 7, "Catch-up + Review Rust Tree Patterns", "Complete missed problems. Implement a proper BST in Rust with Box<Option<Node>>.", 4, "leetcode", { url: "https://leetcode.com/", label: "LeetCode", platform: "leetcode" }),
    ],
  },
  {
    weekNumber: 15,
    phaseWeek: 3,
    phaseId: 4,
    title: "Graphs, BFS/DFS & Dynamic Programming",
    goal: "Solve 231 problems on graph traversal and DP foundations.",
    isCompleted: false,
    tasks: [
      makeTask("p4w3d1", 4, 15, 1, "Graph: BFS Patterns (33 problems)", "Word ladder, shortest path, bipartite graph, 01 matrix distance.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=breadth-first-search", label: "LeetCode — BFS", platform: "leetcode" }),
      makeTask("p4w3d2", 4, 15, 2, "Graph: DFS & Backtracking (33 problems)", "Number of islands, clone graph, course schedule, all paths from source.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=depth-first-search", label: "LeetCode — DFS", platform: "leetcode" }),
      makeTask("p4w3d3", 4, 15, 3, "Union Find (Disjoint Set) (33 problems)", "Friend circles, redundant connection, number of connected components, accounts merge.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=union-find", label: "LeetCode — Union Find", platform: "leetcode" }),
      makeTask("p4w3d4", 4, 15, 4, "DP Foundations: 1D DP (33 problems)", "Climbing stairs, house robber, longest increasing subsequence, coin change.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=dynamic-programming", label: "LeetCode — DP", platform: "leetcode" }),
      makeTask("p4w3d5", 4, 15, 5, "DP: 2D DP & Grids (33 problems)", "Unique paths, minimum path sum, edit distance, longest common subsequence.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=dynamic-programming", label: "LeetCode — DP 2D", platform: "leetcode" }),
      makeTask("p4w3d6", 4, 15, 6, "DP: Interval & Sequence DP (33 problems)", "Burst balloons, palindrome partitioning, matrix chain multiplication, word break.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=dynamic-programming", label: "LeetCode — Interval DP", platform: "leetcode" }),
      makeTask("p4w3d7", 4, 15, 7, "Catch-up + Complexity Analysis Practice", "Review Big-O for all solved problems. Implement graph algorithms from scratch in Rust.", 4, "leetcode", { url: "https://leetcode.com/", label: "LeetCode", platform: "leetcode" }),
    ],
  },
  {
    weekNumber: 16,
    phaseWeek: 4,
    phaseId: 4,
    title: "Binary Search, Heaps & Final Sprint",
    goal: "Solve 307 problems on binary search, backtracking, heaps and complete 1000-problem goal.",
    isCompleted: false,
    tasks: [
      makeTask("p4w4d1", 4, 16, 1, "Binary Search Patterns (44 problems)", "Classic binary search, search in rotated array, find first/last position, search 2D matrix.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=binary-search", label: "LeetCode — Binary Search", platform: "leetcode" }),
      makeTask("p4w4d2", 4, 16, 2, "Backtracking (44 problems)", "Permutations, combinations, subsets, N-queens, Sudoku solver, word search.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=backtracking", label: "LeetCode — Backtracking", platform: "leetcode" }),
      makeTask("p4w4d3", 4, 16, 3, "Heaps & Priority Queues (44 problems)", "Kth largest element, top K frequent, merge k sorted lists, find median from stream.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=heap-priority-queue", label: "LeetCode — Heap", platform: "leetcode" }),
      makeTask("p4w4d4", 4, 16, 4, "Bit Manipulation (44 problems)", "Single number, count bits, reverse bits, missing number, power of two.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=bit-manipulation", label: "LeetCode — Bit Manipulation", platform: "leetcode" }),
      makeTask("p4w4d5", 4, 16, 5, "Trie & Advanced Data Structures (44 problems)", "Implement Trie, word search II, design add and search words.", 4, "leetcode", { url: "https://leetcode.com/problemset/?topicSlugs=trie", label: "LeetCode — Trie", platform: "leetcode" }),
      makeTask("p4w4d6", 4, 16, 6, "Hard Problems Sprint (44 problems)", "Attack 44 Hard problems from mixed categories. Quality over speed here.", 4, "leetcode", { url: "https://leetcode.com/problemset/?difficulty=HARD", label: "LeetCode — Hard", platform: "leetcode" }),
      makeTask("p4w4d7", 4, 16, 7, "1000 Problems Complete! Review & Celebrate", "Verify 1000 problems done. Review the 50 most educational solutions. Prepare for Solana phase.", 3, "exercise", { url: "https://neetcode.io/", label: "NeetCode — Review", platform: "custom" }),
    ],
  },
]

// ─── Phase 5: Solana + Anchor (Weeks 17–20) ───────────────────────────────────
const phase5Weeks: Week[] = [
  {
    weekNumber: 17,
    phaseWeek: 1,
    phaseId: 5,
    title: "Solana Architecture & Accounts Model",
    goal: "Understand Solana's unique architecture: accounts, programs, runtime, and transaction model.",
    isCompleted: false,
    tasks: [
      makeTask("p5w1d1", 5, 17, 1, "Solana Overview & Architecture", "Proof of History, Tower BFT, Turbine, Gulf Stream. How Solana achieves 65k TPS. Architecture overview.", 4, "reading", { url: "https://docs.solanalabs.com/consensus/synchronization", label: "Solana Docs — Architecture", platform: "docs" }),
      makeTask("p5w1d2", 5, 17, 2, "Accounts Model Deep Dive", "Everything is an account. Account structure (data, lamports, owner, executable). System program, rent, account creation.", 4, "video", { url: "https://docs.solanalabs.com/terminology#account", label: "Solana Docs — Accounts", platform: "docs" }),
      makeTask("p5w1d3", 5, 17, 3, "Programs & Instructions", "Program structure, instruction format, program IDs, sysvar accounts. Difference from EVM smart contracts.", 4, "reading", { url: "https://solana.com/docs/core/programs", label: "Solana Docs — Programs", platform: "docs" }),
      makeTask("p5w1d4", 5, 17, 4, "Transactions & Signers", "Transaction anatomy, multiple instructions, compute units, transaction fees, priority fees.", 4, "coding", { url: "https://solana.com/docs/core/transactions", label: "Solana Docs — Transactions", platform: "docs" }),
      makeTask("p5w1d5", 5, 17, 5, "Setup: Solana CLI & Local Validator", "Install Solana CLI, set up localnet, airdrop SOL, explore CLI commands, deploy a native program.", 4, "coding", { url: "https://docs.solanalabs.com/cli/install", label: "Solana CLI Setup", platform: "docs" }),
      makeTask("p5w1d6", 5, 17, 6, "web3.js Basics — Client Side", "Connect to cluster, create keypair, query account info, send SOL transfer, parse transaction logs.", 4, "coding", { url: "https://solana-labs.github.io/solana-web3.js/", label: "Solana web3.js", platform: "docs" }),
      makeTask("p5w1d7", 5, 17, 7, "Project: SOL Transfer CLI", "Build a CLI tool in Rust that: creates wallets, checks balances, transfers SOL, shows transaction details.", 4, "project", { url: "https://docs.solanalabs.com/cli/", label: "Solana CLI Docs", platform: "docs" }),
    ],
  },
  {
    weekNumber: 18,
    phaseWeek: 2,
    phaseId: 5,
    title: "Anchor Framework Fundamentals",
    goal: "Build Solana programs using the Anchor framework — accounts, instructions, and PDAs.",
    isCompleted: false,
    tasks: [
      makeTask("p5w2d1", 5, 18, 1, "Anchor Setup & First Program", "Install Anchor CLI, anchor init, program structure, #[program] macro, deploy to localnet.", 4, "coding", { url: "https://www.anchor-lang.com/docs/installation", label: "Anchor Book — Installation", platform: "docs" }),
      makeTask("p5w2d2", 5, 18, 2, "Anchor Accounts: #[account] & #[derive(Accounts)]", "Account validation macros, Account<'info, T>, Signer, Program, SystemAccount, init constraint.", 4, "video", { url: "https://www.anchor-lang.com/docs/account-types", label: "Anchor — Account Types", platform: "docs" }),
      makeTask("p5w2d3", 5, 18, 3, "PDAs — Program Derived Addresses", "How PDAs are derived, seeds, bump, find_program_address vs create_program_address. Seeds in Anchor.", 4, "coding", { url: "https://solana.com/docs/core/pda", label: "Solana Docs — PDAs", platform: "docs" }),
      makeTask("p5w2d4", 5, 18, 4, "Anchor Instructions & Context", "Context<T>, remaining_accounts, instruction data, multiple instructions in one program.", 4, "coding", { url: "https://www.anchor-lang.com/docs/instructions", label: "Anchor — Instructions", platform: "docs" }),
      makeTask("p5w2d5", 5, 18, 5, "Anchor Constraints & Validation", "has_one, constraint, address, mut, close, seeds, bump constraints. Security via constraints.", 4, "reading", { url: "https://www.anchor-lang.com/docs/account-constraints", label: "Anchor — Constraints", platform: "docs" }),
      makeTask("p5w2d6", 5, 18, 6, "Anchor Events & Errors", "emit! macro, event listening on client, custom error codes with #[error_code], error messages.", 4, "coding", { url: "https://www.anchor-lang.com/docs/errors", label: "Anchor — Errors", platform: "docs" }),
      makeTask("p5w2d7", 5, 18, 7, "Project: Anchor Counter Program", "Build a counter program: initialize, increment, decrement, reset. Add access control. Full test suite.", 4, "project", { url: "https://www.anchor-lang.com/docs/quickstart/local", label: "Anchor Quickstart", platform: "docs" }),
    ],
  },
  {
    weekNumber: 19,
    phaseWeek: 3,
    phaseId: 5,
    title: "CPIs, Token Program & SPL Tokens",
    goal: "Master cross-program invocations and build programs that interact with the SPL Token program.",
    isCompleted: false,
    tasks: [
      makeTask("p5w3d1", 5, 19, 1, "Cross-Program Invocations (CPIs)", "invoke vs invoke_signed, passing accounts in CPI, signed CPIs with PDAs, CPI in Anchor with CpiContext.", 4, "coding", { url: "https://solana.com/docs/core/cpi", label: "Solana Docs — CPI", platform: "docs" }),
      makeTask("p5w3d2", 5, 19, 2, "SPL Token Program — Mint & Accounts", "Token mint account, token account (ATA), mint authority, freeze authority, token decimals.", 4, "video", { url: "https://spl.solana.com/token", label: "SPL Token Docs", platform: "docs" }),
      makeTask("p5w3d3", 5, 19, 3, "Minting & Transferring SPL Tokens", "Create mint, create ATA, mint tokens, transfer tokens, approve delegate, revoke, burn.", 4, "coding", { url: "https://www.anchor-lang.com/docs/spl-tokens", label: "Anchor — SPL Tokens", platform: "docs" }),
      makeTask("p5w3d4", 5, 19, 4, "Token-2022: New Token Standard", "Extensions: transfer fees, confidential transfers, interest-bearing, permanent delegate, non-transferable.", 4, "reading", { url: "https://spl.solana.com/token-2022", label: "Token-2022 Docs", platform: "docs" }),
      makeTask("p5w3d5", 5, 19, 5, "NFTs on Solana: Metaplex Overview", "Metaplex protocol, metadata program, master edition, NFT standard, collection standard.", 4, "reading", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "docs" }),
      makeTask("p5w3d6", 5, 19, 6, "Build: Token Vault Program", "Program that accepts SPL tokens, holds them in PDA vault, allows owner to withdraw.", 4, "coding", { url: "https://www.anchor-lang.com/docs/", label: "Anchor Docs", platform: "docs" }),
      makeTask("p5w3d7", 5, 19, 7, "Project: SPL Token Launch Program", "Full token launch: create mint, distribute initial supply, set up liquidity, vesting schedule via PDA.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }),
    ],
  },
  {
    weekNumber: 20,
    phaseWeek: 4,
    phaseId: 5,
    title: "Testing, Security & Production Patterns",
    goal: "Write comprehensive tests for Anchor programs and apply security best practices.",
    isCompleted: false,
    tasks: [
      makeTask("p5w4d1", 5, 20, 1, "Anchor Testing with Mocha/Chai", "anchor test setup, TypeScript client, BN.js for u64, account fetching, asserting state.", 4, "coding", { url: "https://www.anchor-lang.com/docs/testing/basics", label: "Anchor — Testing", platform: "docs" }),
      makeTask("p5w4d2", 5, 20, 2, "Bankrun: Fast Local Testing", "solana-bankrun for lightweight testing, process_transaction, advance_clock, simulate scenarios.", 4, "video", { url: "https://kevinheavey.github.io/solana-bankrun/", label: "Solana Bankrun", platform: "docs" }),
      makeTask("p5w4d3", 5, 20, 3, "Common Solana Security Vulnerabilities", "Account owner check, signer check, PDA seed collision, integer overflow, unauthorized CPI.", 4, "reading", { url: "https://www.sec3.dev/blog/how-to-audit-solana-smart-contracts-part-1", label: "sec3 — Solana Security", platform: "custom" }),
      makeTask("p5w4d4", 5, 20, 4, "Anchor Security: Checks & Guards", "Correct use of constraints, account type checks, has_one vs manual checks, reentrancy in Solana.", 4, "reading", { url: "https://docs.coral-xyz.com/", label: "Anchor Security Guide", platform: "docs" }),
      makeTask("p5w4d5", 5, 20, 5, "Performance: Compute Units Optimization", "Compute budget, measure CU usage, optimize account loading order, avoid unnecessary CPIs.", 4, "coding", { url: "https://solana.com/docs/programs/limitations", label: "Solana Program Limitations", platform: "docs" }),
      makeTask("p5w4d6", 5, 20, 6, "Deployment: Devnet & Mainnet", "anchor deploy to devnet, upgrade authority, program buffer, close program, versioning strategy.", 4, "coding", { url: "https://www.anchor-lang.com/docs/deployment", label: "Anchor Deployment", platform: "docs" }),
      makeTask("p5w4d7", 5, 20, 7, "Phase 5 Capstone: Mini DEX", "Build a simple constant product AMM with Anchor: initialize pool, add liquidity, swap. Full tests.", 4, "project", { url: "https://www.anchor-lang.com/docs/", label: "Anchor Docs", platform: "docs" }),
    ],
  },
]

// Helper to generate remaining phase weeks with consistent pattern
function makeSimpleWeek(
  weekNumber: number,
  phaseWeek: number,
  phaseId: PhaseId,
  title: string,
  goal: string,
  dayTitles: string[],
  platform: DailyTask['resource'] extends { platform: infer P } | undefined ? P : never,
  resourceUrl: string,
  resourceLabel: string,
  type: DailyTask['type'] = 'coding'
): Week {
  const platformTyped = platform as 'udemy' | 'ardan' | 'leetcode' | 'github' | 'docs' | 'youtube' | 'custom'
  return {
    weekNumber,
    phaseWeek,
    phaseId,
    title,
    goal,
    isCompleted: false,
    tasks: dayTitles.map((dayTitle, i) =>
      makeTask(
        `p${phaseId}w${phaseWeek}d${i + 1}`,
        phaseId,
        phaseWeek,
        i + 1,
        dayTitle,
        `${goal} — Day ${i + 1}: ${dayTitle}`,
        4,
        type,
        { url: resourceUrl, label: resourceLabel, platform: platformTyped }
      )
    ),
  }
}

// ─── Phase 6: Solana Smart Contracts (Weeks 21–28) ───────────────────────────
const phase6Weeks: Week[] = [
  makeSimpleWeek(21, 1, 6, "DeFi Primitives: AMM & Liquidity Pools", "Build an automated market maker with constant product formula (x*y=k).",
    ["AMM Math: x*y=k formula", "Pool state account design", "Add liquidity instruction", "Remove liquidity instruction", "Swap instruction with price impact", "Fee collection & LP tokens", "Full AMM integration tests"],
    "docs", "https://solana.com/developers", "Solana Developers", "coding"),
  makeSimpleWeek(22, 2, 6, "AMM Advanced: Price Oracle & Flash Loans", "Add oracle price feeds and flash loan capability to the AMM.",
    ["TWAP oracle implementation", "Price manipulation resistance", "Flash loan: borrow & repay in one tx", "Flash loan fee mechanism", "Arbitrage simulation", "Front-running protection", "AMM security audit checklist"],
    "docs", "https://docs.switchboard.xyz/", "Switchboard Oracle Docs", "coding"),
  makeSimpleWeek(23, 3, 6, "Lending Protocol: Core Logic", "Build a lending/borrowing protocol with interest rate model.",
    ["Lending pool state design", "Deposit collateral instruction", "Borrow against collateral", "Interest rate model (linear/kinked)", "Liquidation condition logic", "Repay loan instruction", "Withdraw collateral instruction"],
    "docs", "https://solana.com/developers", "Solana — DeFi Examples", "coding"),
  makeSimpleWeek(24, 4, 6, "Lending Protocol: Safety & Liquidations", "Add liquidation engine, price-based safety checks, and protocol fees.",
    ["Health factor calculation", "Liquidation bonus mechanics", "Oracle price integration", "Bad debt handling", "Protocol fee treasury", "Emergency pause mechanism", "Full lending protocol tests"],
    "docs", "https://solana.com/developers", "Solana Developers", "coding"),
  makeSimpleWeek(25, 5, 6, "NFT Programs: Mint & Metadata", "Build a custom NFT program with metadata, collection, and royalties.",
    ["NFT mint program structure", "Metadata account with Metaplex", "On-chain royalty enforcement", "Collection verification", "Update authority controls", "Burn NFT instruction", "NFT marketplace listing"],
    "custom", "https://developers.metaplex.com/", "Metaplex Developers", "coding"),
  makeSimpleWeek(26, 6, 6, "NFT Marketplace: Listing & Trading", "Build NFT marketplace with listing, bidding, and royalty distribution.",
    ["List NFT for sale (PDA escrow)", "Cancel listing", "Execute purchase (CPI to token)", "Auction: English auction logic", "Bid/cancel-bid instructions", "Royalty split on sale", "Marketplace fee collection"],
    "custom", "https://developers.metaplex.com/", "Metaplex Docs", "coding"),
  makeSimpleWeek(27, 7, 6, "Security Auditing: Vulnerability Patterns", "Learn common Solana smart contract vulnerabilities and how to prevent them.",
    ["Owner checks & account validation", "Signer authorization patterns", "PDA seed manipulation attacks", "Integer overflow/underflow prevention", "Reentrancy in multi-instruction txs", "Anchor constraint audit checklist", "Full program audit walkthrough"],
    "custom", "https://github.com/coral-xyz/anchor/blob/master/SECURITY.md", "Anchor Security", "reading"),
  makeSimpleWeek(28, 8, 6, "Production Hardening & Phase 6 Capstone", "Harden your programs for production and build a full DeFi protocol.",
    ["Upgrade authority best practices", "Multi-sig for admin actions", "Compute unit budget optimization", "Error handling & logging", "Devnet deployment & testing", "Mainnet readiness checklist", "Phase 6 Capstone: Full DeFi suite deploy"],
    "docs", "https://solana.com/developers", "Solana Developers", "project"),
]

// ─── Phase 7: 10 Solana Projects (Weeks 29–32) ────────────────────────────────
const phase7Weeks: Week[] = [
  makeSimpleWeek(29, 1, 7, "Projects 1–2: Token Launch & NFT Mint", "Build and deploy your first two portfolio projects.",
    ["Token Launch: SPL token with vesting PDA", "Token Launch: Distribution logic", "Token Launch: Deploy & test devnet", "NFT Mint: Collection initialization", "NFT Mint: Mint instruction with Metaplex", "NFT Mint: Royalties & update auth", "Both projects: README & GitHub"],
    "docs", "https://solana.com/developers", "Solana Developers", "project"),
  makeSimpleWeek(30, 2, 7, "Projects 3–5: DEX, Staking, DAO", "Build three mid-complexity DeFi projects.",
    ["DEX: AMM with constant product", "DEX: Frontend with @solana/wallet-adapter", "Staking: Lock tokens, earn rewards by time", "Staking: Early withdrawal penalty", "DAO: Governance token + proposal creation", "DAO: Vote instruction, quorum check", "DAO: Execution after vote passes"],
    "docs", "https://solana.com/developers", "Solana Developers", "project"),
  makeSimpleWeek(31, 3, 7, "Projects 6–8: Escrow, Lending, Lottery", "Build three advanced DeFi projects.",
    ["Escrow: Safe P2P token swap", "Escrow: Time-locked release", "Lending: Deposit/borrow/repay cycle", "Lending: Interest accrual model", "Lottery: VRF randomness with Switchboard", "Lottery: Ticket purchase & winner selection", "Deploy all three to devnet"],
    "docs", "https://solana.com/developers", "Solana Developers", "project"),
  makeSimpleWeek(32, 4, 7, "Projects 9–10: Bridge & ZK+Solana", "Build your most ambitious Solana projects.",
    ["Bridge: Wormhole SDK integration", "Bridge: Lock-and-mint pattern", "Bridge: Cross-chain message passing", "ZK+Solana: Groth16 verifier on Solana", "ZK+Solana: Private transaction circuit", "ZK+Solana: Full proof pipeline", "Portfolio polish: README, deploy, demo video"],
    "docs", "https://docs.wormhole.com/", "Wormhole Docs", "project"),
]

// ─── Phase 8: Price Oracle Blockchain (Weeks 33–36) ──────────────────────────
const phase8Weeks: Week[] = [
  makeSimpleWeek(33, 1, 8, "P2P Networking with libp2p", "Build the networking layer of your custom blockchain.",
    ["libp2p: Node identity & keypairs", "Swarm & transport setup", "Peer discovery with Kademlia DHT", "Gossipsub for message broadcasting", "Request/response protocol", "Peer store & connection management", "P2P integration test: 3-node network"],
    "docs", "https://libp2p.io/", "libp2p Documentation", "coding"),
  makeSimpleWeek(34, 2, 8, "Block Structure & Transaction Model", "Design and implement the blockchain data structures.",
    ["Block header: hash, prev_hash, timestamp", "Merkle tree implementation in Rust", "Transaction model: from/to/amount/sig", "ECDSA signing with k256 crate", "Block validation logic", "Chain state: HashMap<Hash, Block>", "Mempool: pending transaction queue"],
    "github", "https://github.com/topics/blockchain-rust", "Blockchain Rust Examples", "coding"),
  makeSimpleWeek(35, 3, 8, "Consensus: Proof of Authority", "Implement a simplified PoA consensus mechanism.",
    ["Validator set: authorized block producers", "Round-robin block proposal", "Block signature threshold (2/3+1)", "Fork choice rule: heaviest chain", "Sync protocol: request missing blocks", "Slash conditions for misbehavior", "Consensus integration test"],
    "docs", "https://tokio.rs/", "Tokio Async Runtime", "coding"),
  makeSimpleWeek(36, 4, 8, "Price Oracle & REST API", "Add the price oracle functionality and external interface.",
    ["Price feed aggregation logic", "Median price calculation", "Oracle submit_price instruction", "Aggregator smart contract logic", "REST API: GET /blocks, /txs, /price", "Block explorer HTML page", "End-to-end: 3 nodes + price oracle running"],
    "docs", "https://docs.rs/axum/latest/axum/", "Axum Web Framework", "project"),
]

// ─── Phase 9: ZK Learning & Building (Weeks 37–44) ────────────────────────────
const phase9Weeks: Week[] = [
  makeSimpleWeek(37, 1, 9, "ZK Fundamentals: Proofs & Properties", "Understand the theoretical foundations of zero-knowledge proof systems.",
    ["What is a ZKP: completeness, soundness, ZK", "Interactive vs non-interactive proofs", "Fiat-Shamir transform", "Sigma protocols (Schnorr)", "zk-SNARKs vs zk-STARKs comparison", "Applications: privacy, scaling, identity", "ZK math foundations: modular arithmetic"],
    "custom", "https://zk-learning.org/", "ZK Learning (Berkeley MOOC)", "reading"),
  makeSimpleWeek(38, 2, 9, "Math: Finite Fields & Elliptic Curves", "Master the mathematical primitives underlying ZK systems.",
    ["Finite fields: Fp arithmetic", "Field extensions: Fp2, Fp12", "Elliptic curve: point addition/doubling", "Scalar multiplication: double-and-add", "Pairings: Weil & Tate", "BN254 curve (used by Groth16)", "Polynomial commitment basics"],
    "custom", "https://rareskills.io/zk-book", "RareSkills ZK Book", "reading"),
  makeSimpleWeek(39, 3, 9, "zk-SNARKs: R1CS, QAP & Groth16", "Understand the complete Groth16 proving system from circuit to proof.",
    ["R1CS: rank-1 constraint system", "Arithmetic circuits to R1CS", "QAP: quadratic arithmetic programs", "Groth16 setup: proving + verification key", "Toxic waste in trusted setup", "Proof: (A, B, C) elliptic curve points", "Verify: pairing equation check"],
    "custom", "https://zk-learning.org/", "ZK Learning MOOC", "reading"),
  makeSimpleWeek(40, 4, 9, "Circom: Circuit Programming", "Write arithmetic circuits in Circom language.",
    ["Circom syntax: signals, constraints, components", "First circuit: hash preimage proof", "Comparators & logic gates", "MiMC hash circuit", "Merkle tree membership circuit", "Range proof circuit", "circom compile + witness generation"],
    "custom", "https://docs.circom.io/", "Circom Documentation", "coding"),
  makeSimpleWeek(41, 5, 9, "SnarkJS: Proofs & Solidity Verifier", "Generate Groth16 proofs and deploy verifier contracts.",
    ["snarkjs setup ceremony (Powers of Tau)", "Groth16 key generation", "Generate witness & proof", "Verify proof with snarkjs verify", "Export Solidity verifier contract", "Deploy verifier to local Hardhat network", "Test full proof pipeline"],
    "github", "https://github.com/iden3/snarkjs", "SnarkJS GitHub", "coding"),
  makeSimpleWeek(42, 6, 9, "Build: zkRollup Prototype", "Build a ZK rollup that batches transactions with ZK validity proofs.",
    ["zkRollup architecture: sequencer, prover, verifier", "State tree: Merkle tree of balances", "Transaction circuit: signature + balance check", "Batch multiple txs in one proof", "On-chain verifier contract", "State root update on-chain", "Full zkRollup demo: deposit, transfer, withdraw"],
    "custom", "https://0xparc.org/", "0xPARC Learning", "project"),
  makeSimpleWeek(43, 7, 9, "Build: zkDEX — Private Swaps", "Build a privacy-preserving DEX using ZK proofs.",
    ["zkDEX architecture: confidential amounts", "Nullifier tree for double-spend prevention", "Circuit: prove valid swap without revealing amounts", "Commitment scheme: Pedersen hash", "On-chain matching engine", "ZK proof submission + verification", "End-to-end zkDEX demo"],
    "custom", "https://aztec.network/", "Aztec Network Docs", "project"),
  makeSimpleWeek(44, 8, 9, "Noir Language & Halo2 Intro", "Explore alternative ZK frameworks and build a ZK identity system.",
    ["Noir language syntax (Aztec)", "First Noir circuit: membership proof", "Nargo CLI: compile, prove, verify", "Halo2 overview: PLONKish circuits", "ZK identity: prove attributes without revealing", "ZK age verification circuit", "Phase 9 retrospective & ZK portfolio"],
    "custom", "https://noir-lang.org/", "Noir Language", "coding"),
]

// ─── Phase 10: Certifications & Job Hunt (Weeks 45–48) ───────────────────────
const phase10Weeks: Week[] = [
  makeSimpleWeek(45, 1, 10, "Rust Foundation Certification Prep", "Prepare for and take the Rust Foundation certification exam.",
    ["Review Rust Foundation exam format", "Topic audit: ownership, traits, async", "Full mock exam (Rust Foundation format)", "Weak areas intensive review", "Code exercises: timed challenges", "Final mock exam — target 90%+", "TAKE Rust Foundation Certification"],
    "custom", "https://foundation.rust-lang.org/", "Rust Foundation", "exam"),
  makeSimpleWeek(46, 2, 10, "ZK Certification & Portfolio Polish", "Complete ZK learning path certifications and polish your GitHub portfolio.",
    ["RareSkills ZK completion certificate", "Berkeley ZK MOOC NFT certificate (if available)", "GitHub: all 10 Solana projects with READMEs", "Deploy 3 projects to devnet with live links", "Write blog post: 'I built a zkRollup in 2 months'", "Record 2-min demo videos per project", "Portfolio website or GitHub profile README"],
    "custom", "https://rareskills.io/", "RareSkills ZK", "project"),
  makeSimpleWeek(47, 3, 10, "CV, LinkedIn & Job Applications",
    "Write your technical CV, update LinkedIn, and start applying systematically.",
    ["CV writing: Rust + Solana + ZK focus", "LinkedIn headline + about section overhaul", "Cold outreach template: Web3 companies", "Apply Day 1: 3 jobs (web3.career)", "Apply Day 2: 3 jobs (wellfound.com)", "Apply Day 3: 3 jobs (remote3.io)", "Apply Day 4-7: 3 jobs/day + follow-ups"],
    "custom", "https://web3.career/", "web3.career Jobs", "exercise"),
  makeSimpleWeek(48, 4, 10, "Technical Interviews & Negotiation",
    "Ace Rust technical interviews, system design, and negotiate your salary.",
    ["Rust interview: common questions & answers", "Live coding: solve 5 Rust problems in 45 min", "System design: design a Solana DEX backend", "System design: design a ZK proof service", "Behavioral interviews: STAR format", "Salary negotiation: research + tactics", "You did it — accept an offer and celebrate!"],
    "custom", "https://web3.career/", "web3.career", "exercise"),
]

// ─── Assemble All Phases ──────────────────────────────────────────────────────
export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Rust Foundations",
    shortName: "Rust Basics",
    duration: "1 month",
    totalWeeks: 4,
    description: "Build a solid foundation in Rust: ownership, borrowing, structs, enums, iterators, and error handling. Using Udemy's 'Learn to Code with Rust'.",
    goal: "Write idiomatic Rust code confidently and understand the ownership model completely.",
    color: "#F97316",
    icon: "🦀",
    skills: ["Ownership", "Borrowing", "Structs", "Enums", "Traits", "Iterators", "Error Handling"],
    weeks: phase1Weeks,
    status: "active",
  },
  {
    id: 2,
    name: "Rust Advanced",
    shortName: "Rust Advanced",
    duration: "1 month",
    totalWeeks: 4,
    description: "Deep dive into advanced Rust: generics, lifetimes, smart pointers, async/await, macros, and unsafe Rust. Using 'Rust Programming Master Class'.",
    goal: "Write production-quality async Rust with generics, smart pointers, and macro patterns.",
    color: "#F59E0B",
    icon: "⚙️",
    skills: ["Generics", "Lifetimes", "Smart Pointers", "Async/Await", "Tokio", "Macros", "Unsafe"],
    weeks: phase2Weeks,
    status: "locked",
  },
  {
    id: 3,
    name: "Ardan Labs Rust Cert",
    shortName: "Ardan Cert",
    duration: "1 month",
    totalWeeks: 4,
    description: "Systems programming deep dive with Ardan Labs curriculum. Take and pass the Ardan Labs Rust Certification (100q, 90min, 80%+ to pass, $99).",
    goal: "Pass the Ardan Labs Rust Certification exam on the first attempt.",
    color: "#EF4444",
    icon: "🏆",
    skills: ["Systems Programming", "Memory Layout", "Concurrency", "gRPC", "Service Patterns"],
    weeks: phase3Weeks,
    status: "locked",
  },
  {
    id: 4,
    name: "LeetCode Grind",
    shortName: "LeetCode",
    duration: "1 month",
    totalWeeks: 4,
    description: "Solve 1000 LeetCode problems in Rust at 33/day. Build algorithmic thinking for technical interviews at top blockchain companies.",
    goal: "Complete 1000 LeetCode problems using Rust, achieving fluency in data structures and algorithms.",
    color: "#EAB308",
    icon: "🧮",
    skills: ["Algorithms", "Data Structures", "BFS/DFS", "Dynamic Programming", "Binary Search"],
    weeks: phase4Weeks,
    status: "locked",
  },
  {
    id: 5,
    name: "Solana + Anchor",
    shortName: "Solana Basics",
    duration: "1 month",
    totalWeeks: 4,
    description: "Learn Solana's account model, Anchor framework, PDAs, CPIs, and SPL tokens. Deploy your first on-chain programs.",
    goal: "Deploy functional Solana programs using Anchor with proper testing and security.",
    color: "#8B5CF6",
    icon: "◎",
    skills: ["Solana Accounts", "Anchor", "PDAs", "CPIs", "SPL Tokens", "Testing"],
    weeks: phase5Weeks,
    status: "locked",
  },
  {
    id: 6,
    name: "Solana Smart Contracts",
    shortName: "Solana DeFi",
    duration: "2 months",
    totalWeeks: 8,
    description: "Deep Solana development: AMMs, lending protocols, NFT programs, and security auditing. Build production-quality DeFi contracts.",
    goal: "Build and audit production-quality DeFi protocols on Solana.",
    color: "#7C3AED",
    icon: "🔐",
    skills: ["AMM", "Lending", "NFTs", "Security Auditing", "Metaplex", "Oracle Integration"],
    weeks: phase6Weeks,
    status: "locked",
  },
  {
    id: 7,
    name: "10 Solana Projects",
    shortName: "Projects",
    duration: "1 month",
    totalWeeks: 4,
    description: "Build 10 real Solana projects: DEX, staking, DAO, escrow, lending, lottery, bridge, and ZK+Solana. Each deployed to devnet.",
    goal: "Complete 10 shipped Solana projects that demonstrate full-stack Web3 development ability.",
    color: "#3B82F6",
    icon: "🚀",
    skills: ["DEX", "Staking", "DAO", "NFT Marketplace", "Bridge", "ZK on Solana"],
    weeks: phase7Weeks,
    status: "locked",
  },
  {
    id: 8,
    name: "Rust Price Oracle Chain",
    shortName: "Oracle Chain",
    duration: "1 month",
    totalWeeks: 4,
    description: "Build a price oracle blockchain in pure Rust: P2P networking with libp2p, consensus (PoA), Merkle trees, and REST API.",
    goal: "Complete a working custom blockchain implementation demonstrating systems-level Rust mastery.",
    color: "#06B6D4",
    icon: "⛓️",
    skills: ["libp2p", "Consensus", "Merkle Trees", "P2P Networking", "Blockchain Architecture"],
    weeks: phase8Weeks,
    status: "locked",
  },
  {
    id: 9,
    name: "ZK Learning & Building",
    shortName: "Zero Knowledge",
    duration: "2 months",
    totalWeeks: 8,
    description: "ZK proof fundamentals through implementation: Circom circuits, Groth16, SnarkJS, zkRollup, zkDEX, Noir language, and Halo2.",
    goal: "Build and deploy a working zkRollup and zkDEX demonstrating ZK engineering competency.",
    color: "#10B981",
    icon: "🔮",
    skills: ["ZK-SNARKs", "Circom", "Groth16", "SnarkJS", "zkRollup", "Noir", "Halo2"],
    weeks: phase9Weeks,
    status: "locked",
  },
  {
    id: 10,
    name: "Certifications & Job Hunt",
    shortName: "Get Hired",
    duration: "1 month",
    totalWeeks: 4,
    description: "Complete Rust Foundation and ZK certifications, polish your portfolio, and land a remote Web3/blockchain job.",
    goal: "Land a remote Rust/Solana/ZK engineer role with $150k+ salary.",
    color: "#EC4899",
    icon: "💼",
    skills: ["Rust Foundation Cert", "ZK Cert", "Portfolio", "Technical Interviews", "Negotiation"],
    weeks: phase10Weeks,
    status: "locked",
  },
]

export function getPhaseById(id: number): Phase | undefined {
  return PHASES.find((p) => p.id === id)
}

export function getWeekByNumber(weekNumber: number): Week | undefined {
  for (const phase of PHASES) {
    const week = phase.weeks.find((w) => w.weekNumber === weekNumber)
    if (week) return week
  }
  return undefined
}

export function getAllTasks(): DailyTask[] {
  return PHASES.flatMap((p) => p.weeks.flatMap((w) => w.tasks))
}

export const PHASE_WEEK_COUNTS = [4, 4, 4, 4, 4, 8, 4, 4, 8, 4]
export const TOTAL_WEEKS = PHASE_WEEK_COUNTS.reduce((a, b) => a + b, 0) // 52
