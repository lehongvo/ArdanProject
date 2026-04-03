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
      makeTask("p1w4d6", 1, 4, 6, "Testing in Rust", "#[test], #[cfg(test)], assert!/assert_eq!, integration tests, doctests. Test your grade tracker.", 4, "exercise", { url: "https://doc.rust-lang.org/book/ch11-00-testing.html", label: "Rust Book — Testing", platform: "docs" }, {
        keyPoints: [
          '#[test] marks a function as a unit test — cargo test runs them all',
          '#[cfg(test)] module: test code only compiled during testing, not in production binary',
          'assert_eq!(expected, actual) — panics with both values printed if they differ',
          '#[should_panic] — marks a test that is expected to panic',
          'Integration tests in tests/ directory — test the public API from an outside perspective',
        ],
        codeExample: `// src/lib.rs
pub fn add(a: i32, b: i32) -> i32 { a + b }
pub fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { Err("division by zero".into()) }
    else { Ok(a / b) }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
    }

    #[test]
    fn test_divide_ok() {
        let result = divide(10.0, 2.0).unwrap();
        assert!((result - 5.0).abs() < f64::EPSILON);
    }

    #[test]
    fn test_divide_by_zero() {
        assert!(divide(5.0, 0.0).is_err());
    }

    #[test]
    #[should_panic(expected = "index out of bounds")]
    fn test_panic() {
        let v = vec![1, 2, 3];
        let _ = v[10]; // panics
    }
}`,
        commonMistakes: [
          'Using assert!(a == b) instead of assert_eq!(a, b) — the latter shows both values on failure',
          'Testing private functions — prefer testing the public API through integration tests',
        ],
        practicePrompt: 'Write a full test suite for your word counter from Week 2: test count_words with empty string, single word, multiple words, punctuation, unicode. Aim for 100% branch coverage.',
      }),
      makeTask("p1w4d7", 1, 4, 7, "Phase 1 Capstone: CLI Todo App", "Build a full CLI todo app with: add/remove/complete/list tasks, persist to JSON file, proper error handling, unit tests.", 4, "project", { url: "https://www.udemy.com/course/learn-to-code-with-rust/", label: "Learn to Code with Rust", platform: "udemy" }, {
        keyPoints: [
          'serde + serde_json: serialize/deserialize Rust structs to/from JSON with #[derive(Serialize, Deserialize)]',
          'clap crate: parse CLI arguments declaratively — subcommands, flags, required args',
          'std::path::PathBuf: cross-platform file path handling',
          'Bring together: structs, enums, Vec, HashMap, Result, iterators, traits from Phase 1',
          'Project structure: main.rs orchestrates, lib.rs contains business logic, tests in mod tests',
        ],
        codeExample: `// Cargo.toml dependencies:
// serde = { version = "1", features = ["derive"] }
// serde_json = "1"
// clap = { version = "4", features = ["derive"] }

use serde::{Serialize, Deserialize};
use clap::{Parser, Subcommand};

#[derive(Serialize, Deserialize, Debug)]
struct Todo {
    id: u32,
    title: String,
    done: bool,
}

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Add { title: String },
    Complete { id: u32 },
    Remove { id: u32 },
    List,
}

fn load_todos(path: &str) -> Vec<Todo> {
    std::fs::read_to_string(path)
        .ok()
        .and_then(|s| serde_json::from_str(&s).ok())
        .unwrap_or_default()
}`,
        commonMistakes: [
          'Reading/writing JSON without serde_json::from_str handling errors — always use Result',
          'Generating IDs with random — use max existing ID + 1 for simplicity in CLI apps',
        ],
        practicePrompt: 'Build the complete CLI todo app. Commands: add, complete, remove, list, clear. Persist to ~/.todos.json. Add a --filter done|pending flag to list command. Write 5+ unit tests.',
      }),
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
      makeTask("p2w1d1", 2, 5, 1, "Advanced Generics & Monomorphization", "Generic functions/structs/enums, monomorphization cost, associated types vs type parameters. PhantomData.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Generics", platform: "udemy" }, {
        keyPoints: [
          'Monomorphization: compiler generates a concrete copy of generic code for each type used — no runtime overhead but larger binary',
          'Associated types (type Item = T) give each implementing type a single associated type — cleaner than extra type params',
          'PhantomData<T>: zero-sized marker to tell the compiler a type logically owns or uses T',
          'Multiple bounds: fn f<T: Clone + Debug + Send>() or with where clause',
          'const generics: struct Array<T, const N: usize>([T; N]) — generic over values not just types',
        ],
        codeExample: `use std::marker::PhantomData;

// Associated type example
trait Container {
    type Item;
    fn get(&self, idx: usize) -> Option<&Self::Item>;
    fn len(&self) -> usize;
}

struct Stack<T> {
    data: Vec<T>,
}

impl<T> Container for Stack<T> {
    type Item = T;
    fn get(&self, idx: usize) -> Option<&T> { self.data.get(idx) }
    fn len(&self) -> usize { self.data.len() }
}

// PhantomData for type-safe IDs
struct UserId(u64, PhantomData<()>);
struct PostId(u64, PhantomData<()>);

// const generics (Rust 1.51+)
struct FixedArray<T, const N: usize> {
    data: [T; N],
}

impl<T: Default + Copy, const N: usize> FixedArray<T, N> {
    fn new() -> Self {
        Self { data: [T::default(); N] }
    }
}`,
        commonMistakes: [
          'Using type parameters when associated types are the right choice — Iterator uses associated type, not generic',
          'Ignoring monomorphization cost — extremely generic code with many type instantiations bloats binary size',
        ],
        practicePrompt: 'Implement a type-safe typed_id crate: Id<T> struct where T is PhantomData marker. UserId, PostId cannot be compared with each other even though both wrap u64.',
      }),
      makeTask("p2w1d2", 2, 5, 2, "Advanced Trait Patterns", "Trait bounds, where clauses, supertraits, blanket implementations, From/Into/AsRef/AsMut.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Advanced Traits", platform: "udemy" }, {
        keyPoints: [
          'Supertraits: trait Animal: Display requires types to also implement Display',
          'Blanket implementations: impl<T: Display> MyTrait for T — implement for all Display types',
          'From/Into: impl From<u32> for MyType automatically gives Into<MyType> for u32',
          'AsRef<T>: accept both &String and &str by taking s: impl AsRef<str>',
          'Newtype pattern with Deref: wrap a type to add behavior while delegating other methods',
        ],
        codeExample: `use std::fmt;

// Supertrait
trait Printable: fmt::Display + fmt::Debug {
    fn print(&self) {
        println!("Display: {self}  Debug: {self:?}");
    }
}

// Blanket implementation — all Display+Debug types get Printable
impl<T: fmt::Display + fmt::Debug> Printable for T {}

// From/Into
struct Celsius(f64);
struct Fahrenheit(f64);

impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Self {
        Fahrenheit(c.0 * 9.0/5.0 + 32.0)
    }
}

fn main() {
    let c = Celsius(100.0);
    let f: Fahrenheit = c.into();  // Into is auto-derived from From
    println!("{:.1}°F", f.0);     // 212.0°F

    // AsRef for flexible input
    fn print_len(s: impl AsRef<str>) {
        println!("{}", s.as_ref().len());
    }
    print_len("hello");              // &str works
    print_len(String::from("hi"));   // String works
}`,
        commonMistakes: [
          'Implementing both From<A> for B and From<B> for A — can create ambiguity; prefer one direction',
          'Supertrait bounds not being satisfied — if Animal: Display, every impl Animal must also impl Display',
        ],
        practicePrompt: 'Create a metric unit system: Meters, Kilometers, Miles structs. Implement From conversions between all three. Write a generic fn distance<T: Into<Meters>>(d: T) -> String.',
      }),
      makeTask("p2w1d3", 2, 5, 3, "Trait Objects: dyn Trait", "Static vs dynamic dispatch, vtable, Box<dyn Trait>, dyn Trait in function signatures, object safety.", 4, "coding", { url: "https://doc.rust-lang.org/book/ch17-02-trait-objects.html", label: "Rust Book — Trait Objects", platform: "docs" }, {
        keyPoints: [
          'Static dispatch (impl Trait / generics): type resolved at compile time — zero cost, monomorphizes',
          'Dynamic dispatch (dyn Trait): vtable at runtime — flexible but slight overhead (pointer indirection)',
          'Object safety: a trait is object-safe if it can be used as dyn Trait — methods must not return Self or have generic parameters',
          'Box<dyn Trait> stores a heap-allocated trait object — needed when size unknown at compile time',
          '&dyn Trait is a fat pointer: data pointer + vtable pointer (16 bytes on 64-bit)',
        ],
        codeExample: `trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> &str;
}

struct Circle(f64);
struct Square(f64);

impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.0 * self.0 }
    fn name(&self) -> &str { "circle" }
}
impl Shape for Square {
    fn area(&self) -> f64 { self.0 * self.0 }
    fn name(&self) -> &str { "square" }
}

// Static dispatch — monomorphizes at compile time
fn print_area_static(shape: &impl Shape) {
    println!("{}: {:.2}", shape.name(), shape.area());
}

// Dynamic dispatch — vtable at runtime
fn total_area(shapes: &[Box<dyn Shape>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}

fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle(5.0)),
        Box::new(Square(3.0)),
    ];
    println!("Total area: {:.2}", total_area(&shapes));
}`,
        commonMistakes: [
          'Making a non-object-safe trait into dyn Trait — Sized methods, Clone, or generic methods break object safety',
          'Using dyn Trait everywhere for convenience — prefer impl Trait (static) when the concrete type is known',
        ],
        practicePrompt: 'Build a plugin system: trait Plugin with execute(&self, input: &str) -> String. Create three plugins (uppercase, reverse, word_count). Store them in Vec<Box<dyn Plugin>> and apply each to user input.',
      }),
      makeTask("p2w1d4", 2, 5, 4, "Lifetime Annotations", "What lifetimes mean, 'a syntax, lifetime in function signatures, structs with references, lifetime elision rules.", 4, "video", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class — Lifetimes", platform: "udemy" }, {
        keyPoints: [
          'Lifetimes don\'t change how long data lives — they describe relationships between reference durations',
          '\'a is a lifetime parameter: fn f<\'a>(x: &\'a str, y: &\'a str) -> &\'a str means output lives as long as shorter of x or y',
          'Lifetime elision: three rules that let you omit obvious annotations in common patterns',
          'Struct with reference field needs lifetime annotation: struct Important<\'a> { excerpt: &\'a str }',
          '\'static lifetime: data lives for entire program — string literals are &\'static str',
        ],
        codeExample: `// Without annotation — who does return live as long as?
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
    // return lives as long as the shorter of x and y
}

// Struct holding a reference
struct Excerpt<'a> {
    text: &'a str,
}

impl<'a> Excerpt<'a> {
    fn level(&self) -> i32 { 3 }  // elision: output doesn't borrow input

    fn announce(&self, announcement: &str) -> &str {
        println!("Announcement: {announcement}");
        self.text  // elision: return borrows self, not announcement
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence;
    {
        let i = novel.find('.').unwrap_or(novel.len());
        first_sentence = &novel[..i];
        let excerpt = Excerpt { text: first_sentence };
        println!("{}", excerpt.announce("Important!"));
    }
    println!("sentence: {first_sentence}"); // still valid: novel alive
}`,
        commonMistakes: [
          'Thinking lifetime annotations extend how long data lives — they only describe existing relationships',
          'Adding \'a everywhere out of confusion — start with no annotations, add only where compiler requires',
        ],
        practicePrompt: 'Write a text highlighter: struct Highlighter<\'a> holding &\'a str source text. Add method find_word<\'b>(&self, word: &\'b str) -> Option<&\'a str> returning the matched portion.',
      }),
      makeTask("p2w1d5", 2, 5, 5, "Advanced Lifetime Scenarios", "Multiple lifetimes, lifetime bounds, 'static lifetime, lifetime with trait objects, NLL (Non-Lexical Lifetimes).", 4, "reading", { url: "https://doc.rust-lang.org/nomicon/lifetimes.html", label: "Rustonomicon — Lifetimes", platform: "docs" }, {
        keyPoints: [
          'NLL (Non-Lexical Lifetimes): borrows end when last used, not at end of block — fewer false errors',
          '\'static in trait bounds: T: \'static means T contains no references shorter than \'static',
          'Higher-Rank Trait Bounds (HRTB): for<\'a> Fn(&\'a str) — accepts any lifetime',
          'Variance: covariant (&\'a T), contravariant (fn(T)), invariant (&\'a mut T)',
          'Lifetime subtyping: \'a: \'b means \'a outlives \'b — \'a can be used where \'b is expected',
        ],
        codeExample: `// Multiple lifetime parameters
fn get_shorter<'a, 'b: 'a>(x: &'a str, y: &'b str) -> &'a str {
    // 'b: 'a means 'b outlives 'a
    if x.len() <= y.len() { x } else { &y[..x.len()] }
}

// 'static bound — T must not borrow short-lived data
fn spawn_task<T: Send + 'static>(task: T) {
    std::thread::spawn(move || {
        // T lives long enough for the thread
    });
}

// HRTB — function that works with any lifetime
fn apply<F>(f: F, x: &str) -> usize
where
    F: for<'a> Fn(&'a str) -> usize,
{
    f(x)
}

fn main() {
    let len = apply(|s| s.len(), "hello world");
    println!("{len}");
}`,
        commonMistakes: [
          'Confusing T: \'static (T owns its data) with &\'static T (forever-live reference)',
          'Trying to store short-lived references in thread::spawn closures — needs \'static',
        ],
        practicePrompt: 'Write a cache struct Cache<\'a, K, V> that stores &\'a K -> V pairs. Test that the cache cannot outlive the keys. Then refactor to Cache<K: Clone, V> using owned keys to remove the lifetime.',
      }),
      makeTask("p2w1d6", 2, 5, 6, "Practice: Generic Data Structures", "Implement a generic Stack<T>, Queue<T>, and BinaryTree<T> from scratch.", 4, "exercise", { url: "https://exercism.org/tracks/rust", label: "Exercism — Data Structures", platform: "custom" }, {
        keyPoints: [
          'A binary tree in Rust requires Box<Option<Node<T>>> or Box<Node<T>> for recursive types',
          'Queue can be implemented with two Vecs (amortized O(1) dequeue)',
          'Iterating over a tree requires either a stack-based traversal or a cursor approach',
          'Generic constraints: impl<T: Ord> BinaryTree<T> — only allow comparable types',
          'Test edge cases: empty structure, single element, duplicates, very deep trees',
        ],
        codeExample: `// Binary search tree — recursive with Box
#[derive(Debug)]
enum BST<T: Ord> {
    Leaf,
    Node {
        value: T,
        left: Box<BST<T>>,
        right: Box<BST<T>>,
    }
}

impl<T: Ord> BST<T> {
    pub fn new() -> Self { BST::Leaf }

    pub fn insert(self, val: T) -> Self {
        match self {
            BST::Leaf => BST::Node {
                value: val,
                left: Box::new(BST::Leaf),
                right: Box::new(BST::Leaf),
            },
            BST::Node { value, left, right } => {
                if val < value {
                    BST::Node { value, left: Box::new(left.insert(val)), right }
                } else if val > value {
                    BST::Node { value, left, right: Box::new(right.insert(val)) }
                } else {
                    BST::Node { value, left, right } // duplicate: ignore
                }
            }
        }
    }

    pub fn contains(&self, val: &T) -> bool {
        match self {
            BST::Leaf => false,
            BST::Node { value, left, right } => {
                if val == value { true }
                else if val < value { left.contains(val) }
                else { right.contains(val) }
            }
        }
    }
}`,
        commonMistakes: [
          'Recursive BST without Box — Rust cannot know the size of a recursive enum without indirection',
          'Implementing insert(&mut self) instead of fn insert(self) -> Self — recursive ownership issues',
        ],
        practicePrompt: 'Implement in-order traversal that returns a Vec<&T> in sorted order. Then add a height() method. Test with 20 random insertions.',
      }),
      makeTask("p2w1d7", 2, 5, 7, "Project: Generic Event System", "Build a type-safe event emitter using generics + trait objects. Support multiple event types.", 4, "project", { url: "https://www.udemy.com/course/rust-programming-master-class-from-beginner-to-expert/", label: "Rust Master Class", platform: "udemy" }, {
        keyPoints: [
          'Event handlers stored as Box<dyn Fn(&Event)> — closure trait objects',
          'Multiple event types with an enum or separate generic EventBus<T>',
          'HashMap<EventType, Vec<Box<dyn Fn>>> for multi-type event registry',
          'Fn vs FnMut vs FnOnce: choose based on whether handlers need mutable state',
          'TypeId (std::any::TypeId) for dynamic type-based dispatch',
        ],
        codeExample: `use std::collections::HashMap;

type Handler<T> = Box<dyn Fn(&T)>;

struct EventBus<T> {
    handlers: Vec<Handler<T>>,
}

impl<T> EventBus<T> {
    pub fn new() -> Self {
        Self { handlers: Vec::new() }
    }

    pub fn on(&mut self, handler: impl Fn(&T) + 'static) {
        self.handlers.push(Box::new(handler));
    }

    pub fn emit(&self, event: &T) {
        for handler in &self.handlers {
            handler(event);
        }
    }
}

#[derive(Debug)]
struct ClickEvent { x: f64, y: f64 }

fn main() {
    let mut bus: EventBus<ClickEvent> = EventBus::new();
    bus.on(|e| println!("Handler 1: clicked at ({}, {})", e.x, e.y));
    bus.on(|e| println!("Handler 2: distance from origin = {:.2}", (e.x*e.x + e.y*e.y).sqrt()));

    bus.emit(&ClickEvent { x: 3.0, y: 4.0 });
}`,
        commonMistakes: [
          'Handlers needing mutable state — use Fn + Mutex or FnMut in a RefCell for shared mutable state',
          'Storing handlers without \'static bound — needed because handlers may be called later',
        ],
        practicePrompt: 'Extend the event bus to support once() — register a handler that fires exactly once then removes itself. Add emit_async() using Tokio.',
      }),
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
  // Week 21 — AMM & Liquidity Pools
  {
    weekNumber: 21,
    phaseWeek: 1,
    phaseId: 6,
    title: "DeFi Primitives: AMM & Liquidity Pools",
    goal: "Build an automated market maker with constant product formula (x*y=k).",
    isCompleted: false,
    tasks: [
      makeTask("p6w1d1", 6, 21, 1, "AMM Math: x*y=k Formula", "Derive the constant product invariant, understand price impact, slippage tolerance, and how reserves change after each swap.", 4, "reading", { url: "https://uniswap.org/whitepaper.pdf", label: "Uniswap v2 Whitepaper", platform: "custom" }, {
        keyPoints: [
          'The invariant k = x * y must hold after every swap (ignoring fees)',
          'Price of token A in terms of B = reserve_B / reserve_A at any instant',
          'Price impact grows non-linearly — a 10% pool swap moves price much more than 1%',
          'Slippage = difference between expected price and actual execution price',
          'LP tokens represent proportional ownership of reserves, not a fixed amount',
        ],
        codeExample: `// Constant product formula: x * y = k
// Given: reserve_a, reserve_b, amount_in
// Find: amount_out

fn amount_out(reserve_in: u64, reserve_out: u64, amount_in: u64) -> u64 {
    // numerator = reserve_out * amount_in
    let numerator = (reserve_out as u128)
        .checked_mul(amount_in as u128)
        .expect("overflow");
    // denominator = reserve_in + amount_in
    let denominator = (reserve_in as u128)
        .checked_add(amount_in as u128)
        .expect("overflow");
    (numerator / denominator) as u64
}

#[test]
fn test_amm_math() {
    // Pool: 1000 SOL, 50000 USDC  => price = 50 USDC/SOL
    let out = amount_out(1000, 50000, 10); // swap 10 SOL
    assert_eq!(out, 454); // slightly less than 500 due to price impact
}`,
        commonMistakes: [
          'Using regular division (/) instead of integer arithmetic — always use checked_mul/checked_div to avoid silent overflow',
          'Forgetting that k changes when fees are collected — fees increase k slightly over time',
        ],
        practicePrompt: 'Implement amount_out with a 0.3% fee (multiply amount_in by 997, denominator by 1000) and write a test asserting k after fee is >= k before.',
      }),
      makeTask("p6w1d2", 6, 21, 2, "Pool State Account Design", "Design the Anchor account struct for a liquidity pool: reserves, LP mint, bump, fees.", 4, "coding", { url: "https://www.anchor-lang.com/docs/account-types", label: "Anchor — Account Types", platform: "docs" }, {
        keyPoints: [
          'Pool PDA is derived from token_a_mint + token_b_mint — makes it deterministic and discoverable',
          'LP mint is also a PDA so the program is the mint authority (no external key needed)',
          'Store fee_numerator/fee_denominator instead of float for deterministic on-chain math',
          'bump field saves recomputing the PDA bump on every instruction',
          'token_a_vault and token_b_vault are token accounts owned by the pool PDA',
        ],
        codeExample: `use anchor_lang::prelude::*;

#[account]
pub struct Pool {
    pub token_a_mint: Pubkey,
    pub token_b_mint: Pubkey,
    pub token_a_vault: Pubkey,    // token account holding reserve A
    pub token_b_vault: Pubkey,    // token account holding reserve B
    pub lp_mint: Pubkey,          // mint for LP tokens
    pub token_a_reserve: u64,
    pub token_b_reserve: u64,
    pub lp_supply: u64,
    pub fee_numerator: u64,       // e.g. 3
    pub fee_denominator: u64,     // e.g. 1000  => 0.3%
    pub bump: u8,
    pub lp_mint_bump: u8,
}

impl Pool {
    pub const LEN: usize = 8 + 32*5 + 8*5 + 1*2;
}`,
        commonMistakes: [
          'Not storing the bump — forces recomputing find_program_address every call which wastes compute units',
          'Using f64 for fee storage — floating point is non-deterministic across architectures; always use integer fractions',
        ],
        practicePrompt: 'Write an initialize_pool instruction that creates the Pool account and two vault accounts, assigning the PDA as vault authority.',
      }),
      makeTask("p6w1d3", 6, 21, 3, "Add Liquidity Instruction", "Implement add_liquidity: deposit proportional tokens, mint LP tokens using geometric mean for first deposit.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'First deposit sets the initial price — LP tokens = sqrt(a * b) using integer sqrt',
          'Subsequent deposits must maintain current ratio: lp_out = lp_supply * min(a/ra, b/rb)',
          'Use CPI to token program for transferring tokens and minting LP tokens',
          'Return excess tokens if user provides more of one token than the ratio allows',
          'Anchor constraint: token_a_vault.owner == pool.key() prevents spoofed vaults',
        ],
        codeExample: `pub fn add_liquidity(
    ctx: Context<AddLiquidity>,
    amount_a: u64,
    amount_b: u64,
    min_lp: u64,
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;

    let lp_to_mint = if pool.lp_supply == 0 {
        // first deposit: geometric mean
        integer_sqrt(
            (amount_a as u128).checked_mul(amount_b as u128).unwrap()
        ) as u64
    } else {
        // proportional mint: lp = supply * min(a/ra, b/rb)
        let lp_a = (pool.lp_supply as u128)
            .checked_mul(amount_a as u128).unwrap()
            / pool.token_a_reserve as u128;
        let lp_b = (pool.lp_supply as u128)
            .checked_mul(amount_b as u128).unwrap()
            / pool.token_b_reserve as u128;
        lp_a.min(lp_b) as u64
    };
    require!(lp_to_mint >= min_lp, ErrorCode::SlippageTooHigh);
    pool.token_a_reserve = pool.token_a_reserve.checked_add(amount_a).unwrap();
    pool.token_b_reserve = pool.token_b_reserve.checked_add(amount_b).unwrap();
    pool.lp_supply = pool.lp_supply.checked_add(lp_to_mint).unwrap();
    Ok(())
}`,
        commonMistakes: [
          'Not using geometric mean for the first LP mint — allows price manipulation attacks on the first deposit',
          'Forgetting min_lp slippage protection — frontrunners can sandwich the add_liquidity transaction',
        ],
        practicePrompt: 'Implement integer_sqrt(n: u128) -> u128 using Babylonian method, then write a test: add 1000 SOL / 50000 USDC and assert lp_minted == sqrt(1000*50000).',
      }),
      makeTask("p6w1d4", 6, 21, 4, "Remove Liquidity Instruction", "Implement remove_liquidity: burn LP tokens proportionally, withdraw both tokens.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'withdraw_a = reserve_a * lp_burned / lp_supply (before burning)',
          'withdraw_b = reserve_b * lp_burned / lp_supply (before burning)',
          'Always compute amounts BEFORE updating lp_supply to avoid division by zero',
          'Use min_a/min_b slippage guards just like add_liquidity',
          'CPI: burn LP tokens via token program, then transfer vaulted tokens to user',
        ],
        codeExample: `pub fn remove_liquidity(
    ctx: Context<RemoveLiquidity>,
    lp_amount: u64,
    min_a: u64,
    min_b: u64,
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    require!(lp_amount <= pool.lp_supply, ErrorCode::InsufficientLiquidity);

    // compute proportional withdrawals BEFORE modifying supply
    let withdraw_a = (pool.token_a_reserve as u128)
        .checked_mul(lp_amount as u128).unwrap()
        / pool.lp_supply as u128;
    let withdraw_b = (pool.token_b_reserve as u128)
        .checked_mul(lp_amount as u128).unwrap()
        / pool.lp_supply as u128;

    let withdraw_a = withdraw_a as u64;
    let withdraw_b = withdraw_b as u64;
    require!(withdraw_a >= min_a, ErrorCode::SlippageTooHigh);
    require!(withdraw_b >= min_b, ErrorCode::SlippageTooHigh);

    pool.token_a_reserve -= withdraw_a;
    pool.token_b_reserve -= withdraw_b;
    pool.lp_supply -= lp_amount;
    // ... CPI: burn lp_amount, transfer withdraw_a and withdraw_b to user
    Ok(())
}`,
        commonMistakes: [
          'Computing amounts after decrementing lp_supply — causes wrong proportions if lp_supply is updated first',
          'Not verifying lp_amount <= pool.lp_supply — underflow panic in non-checked builds',
        ],
        practicePrompt: 'Write a test: add liquidity with 1000/50000, then remove 50% of LP tokens and assert each withdrawn amount is exactly 500/25000.',
      }),
      makeTask("p6w1d5", 6, 21, 5, "Swap Instruction with Price Impact", "Implement the core swap instruction with fee deduction and minimum output guard.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Apply fee before computing amount_out: effective_in = amount_in * (denom - fee_num) / denom',
          'Verify k after swap: new_a * new_b >= old_k (fees make k grow)',
          'require!(amount_out >= min_amount_out) protects against frontrunning',
          'Update both reserves atomically — partial updates leave the pool in invalid state',
          'Emit a SwapEvent with amounts for indexers and frontends',
        ],
        codeExample: `pub fn swap(ctx: Context<Swap>, amount_in: u64, min_amount_out: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let k = (pool.token_a_reserve as u128)
        .checked_mul(pool.token_b_reserve as u128)
        .ok_or(ErrorCode::Overflow)?;

    // deduct fee from input
    let fee_num = pool.fee_numerator as u128;
    let fee_den = pool.fee_denominator as u128;
    let amount_in_with_fee = (amount_in as u128)
        .checked_mul(fee_den - fee_num).unwrap()
        / fee_den;

    let new_reserve_in = (pool.token_a_reserve as u128)
        .checked_add(amount_in_with_fee).unwrap();
    let new_reserve_out = k / new_reserve_in;
    let amount_out = (pool.token_b_reserve as u128)
        .checked_sub(new_reserve_out)
        .ok_or(ErrorCode::Underflow)? as u64;

    require!(amount_out >= min_amount_out, ErrorCode::SlippageTooHigh);
    pool.token_a_reserve = new_reserve_in as u64;
    pool.token_b_reserve = new_reserve_out as u64;
    emit!(SwapEvent { amount_in, amount_out });
    Ok(())
}`,
        commonMistakes: [
          'Applying the fee to amount_out instead of amount_in — gives wrong reserves and violates the invariant',
          'Not checking min_amount_out — exposes users to unlimited slippage from sandwich attacks',
        ],
        practicePrompt: 'Fuzz the swap function: loop 10000 random swaps and assert pool.token_a_reserve * pool.token_b_reserve >= initial_k after every swap.',
      }),
      makeTask("p6w1d6", 6, 21, 6, "Fee Collection & LP Token Economics", "Understand how trading fees accrue to LP token holders and implement fee harvesting.", 4, "reading", { url: "https://uniswap.org/whitepaper.pdf", label: "Uniswap v2 Whitepaper", platform: "custom" }, {
        keyPoints: [
          'Fees stay in reserves — they increase k, making LP tokens worth more over time',
          'No separate fee claim: fees are realized when LPs remove liquidity',
          'Protocol fee can be an additional cut of the LP fee (Uniswap uses 1/6 of the 0.3%)',
          'LP token price = (reserve_a + reserve_b in common units) / lp_supply',
          'Impermanent loss occurs when token price ratio diverges from deposit ratio',
        ],
        codeExample: `// Fee accrual: fees stay in reserves, grow k
// After 1000 swaps with 0.3% fee each:
// k grows: new_k = k * (1 + fee * volume/reserve)^n

// LP token value calculation (in terms of token_a):
fn lp_token_price_in_a(pool: &Pool, price_b_in_a: f64) -> f64 {
    let total_value_in_a = pool.token_a_reserve as f64
        + pool.token_b_reserve as f64 * price_b_in_a;
    total_value_in_a / pool.lp_supply as f64
}

// Impermanent loss formula:
// IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
fn impermanent_loss(price_ratio: f64) -> f64 {
    2.0 * price_ratio.sqrt() / (1.0 + price_ratio) - 1.0
}
// price_ratio = current_price / entry_price
// IL at 2x price change = 2*sqrt(2)/3 - 1 ≈ -5.72%`,
        commonMistakes: [
          'Thinking LP tokens always go up — impermanent loss can outweigh fee income in volatile markets',
          'Trying to claim fees as a separate instruction — in constant product AMMs fees are implicit in reserve growth',
        ],
        practicePrompt: 'Write a simulation: 100 random swaps on a 1000/1000 pool with 0.3% fee. Print k before and after — verify it only grows, never shrinks.',
      }),
      makeTask("p6w1d7", 6, 21, 7, "Full AMM Integration Tests", "Write end-to-end Anchor tests covering initialize, add_liquidity, swap, remove_liquidity.", 4, "coding", { url: "https://www.anchor-lang.com/docs/testing/basics", label: "Anchor Testing Guide", platform: "docs" }, {
        keyPoints: [
          'anchor test spins up a local validator — use it for full integration tests',
          'BN.js is required for u64 values in TypeScript test clients',
          'Fetch account state after each instruction with program.account.pool.fetch(poolPda)',
          'Test slippage failure: set min_amount_out too high and assert the tx is rejected',
          'Use beforeEach to reset state — each test should start from a known pool state',
        ],
        codeExample: `import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("AMM", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Amm;

  it("initializes a pool and adds liquidity", async () => {
    const [poolPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), mintA.toBuffer(), mintB.toBuffer()],
      program.programId
    );
    await program.methods
      .addLiquidity(new BN(1000_000), new BN(50000_000), new BN(0))
      .accounts({ pool: poolPda, /* ... */ })
      .rpc();

    const pool = await program.account.pool.fetch(poolPda);
    assert.ok(pool.tokenAReserve.eq(new BN(1000_000)));
    assert.ok(pool.tokenBReserve.eq(new BN(50000_000)));
    assert.ok(pool.lpSupply.gtn(0));
  });

  it("rejects swap with insufficient output", async () => {
    try {
      await program.methods
        .swap(new BN(100), new BN(999999)) // unrealistic min_out
        .rpc();
      assert.fail("should have thrown");
    } catch (e) {
      assert.include(e.message, "SlippageTooHigh");
    }
  });
});`,
        commonMistakes: [
          'Using raw numbers instead of BN for u64 — JavaScript numbers lose precision above 2^53',
          'Not awaiting confirmations — tests that check state immediately after rpc() can see stale data',
        ],
        practicePrompt: 'Write a test: add liquidity, perform 10 swaps back and forth, remove all liquidity, and assert both users have at least as many tokens as they started (fees made them richer).',
      }),
    ],
  },

  // Week 22 — AMM Advanced
  {
    weekNumber: 22,
    phaseWeek: 2,
    phaseId: 6,
    title: "AMM Advanced: Price Oracle & Flash Loans",
    goal: "Add oracle price feeds and flash loan capability to the AMM.",
    isCompleted: false,
    tasks: [
      makeTask("p6w2d1", 6, 22, 1, "TWAP Oracle Implementation", "Implement a time-weighted average price oracle using cumulative price accumulators.", 4, "coding", { url: "https://docs.switchboard.xyz/", label: "Switchboard Oracle Docs", platform: "docs" }, {
        keyPoints: [
          'TWAP = (cumulative_price_end - cumulative_price_start) / elapsed_seconds',
          'Accumulate price * elapsed_time on every swap — store last_cumulative_price and last_timestamp',
          'TWAP is manipulation-resistant because averaging over time is expensive to manipulate',
          'Use Clock::get()?.unix_timestamp for the on-chain timestamp',
          'Store both price0_cumulative and price1_cumulative for both directions',
        ],
        codeExample: `use anchor_lang::prelude::*;

#[account]
pub struct Pool {
    // ... existing fields
    pub price_a_cumulative: u128,  // sum of (price_a * seconds)
    pub price_b_cumulative: u128,
    pub last_update_timestamp: i64,
}

pub fn update_twap(pool: &mut Pool) -> Result<()> {
    let clock = Clock::get()?;
    let now = clock.unix_timestamp;
    let elapsed = (now - pool.last_update_timestamp) as u128;

    if elapsed > 0 && pool.token_b_reserve > 0 && pool.token_a_reserve > 0 {
        // price_a = reserve_b / reserve_a (scaled by 2^64 for precision)
        let price_a = ((pool.token_b_reserve as u128) << 64)
            / pool.token_a_reserve as u128;
        pool.price_a_cumulative = pool.price_a_cumulative
            .saturating_add(price_a.saturating_mul(elapsed));
        pool.last_update_timestamp = now;
    }
    Ok(())
}`,
        commonMistakes: [
          'Updating TWAP after changing reserves — must snapshot price BEFORE updating reserves in swap',
          'Using u64 for cumulative price — will overflow within hours on active pools; use u128',
        ],
        practicePrompt: 'Extend your swap instruction to call update_twap before modifying reserves. Write a test that waits 2 seconds between swaps and asserts the TWAP moves toward the spot price.',
      }),
      makeTask("p6w2d2", 6, 22, 2, "Price Manipulation Resistance", "Understand and defend against oracle manipulation attacks using TWAP and circuit breakers.", 4, "reading", { url: "https://docs.switchboard.xyz/", label: "Switchboard Docs", platform: "docs" }, {
        keyPoints: [
          'Spot price oracles are trivially manipulable — one large swap, read price, undo',
          'TWAP over >= 30 minutes is economically infeasible to manipulate on liquid pools',
          'Circuit breakers: reject price updates if new_price > last_price * 1.05 (5% per slot)',
          'Cross-validate: compare AMM TWAP against Switchboard/Pyth and reject large divergence',
          'Chainlink, Pyth, and Switchboard are preferred for critical DeFi price feeds',
        ],
        codeExample: `// Circuit breaker: reject prices deviating > 5% per update
pub fn validate_price_update(old_price: u64, new_price: u64) -> Result<()> {
    let max_change = old_price / 20; // 5%
    let diff = if new_price > old_price {
        new_price - old_price
    } else {
        old_price - new_price
    };
    require!(diff <= max_change, ErrorCode::PriceManipulationDetected);
    Ok(())
}

// Cross-validate AMM price with Pyth oracle
pub fn cross_validate_price(
    amm_price: u64,
    pyth_price: u64,
    tolerance_bps: u64, // e.g. 200 = 2%
) -> Result<()> {
    let diff = if amm_price > pyth_price {
        amm_price - pyth_price
    } else {
        pyth_price - amm_price
    };
    let tolerance = pyth_price * tolerance_bps / 10000;
    require!(diff <= tolerance, ErrorCode::PriceDivergenceTooHigh);
    Ok(())
}`,
        commonMistakes: [
          'Using spot price from AMM as oracle for lending decisions — enables flash loan attacks in the same transaction',
          'Setting TWAP window too short (< 15 minutes) — profitable to manipulate during low-liquidity periods',
        ],
        practicePrompt: 'Write a test simulating a flash loan price manipulation: borrow, do a huge swap, read spot price (should be wrong), then verify TWAP is relatively unchanged.',
      }),
      makeTask("p6w2d3", 6, 22, 3, "Flash Loan: Borrow & Repay in One Tx", "Implement flash loans — uncollateralized loans that must be repaid within the same transaction.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Flash loans rely on Solana\'s atomic transactions — all instructions succeed or all fail',
          'Implementation: record balance before, transfer to borrower, invoke callback, verify balance after',
          'No collateral needed because Solana reverts the entire transaction if repayment fails',
          'Flash loan fee adds to reserves — it is a revenue source for LPs',
          'Instruction introspection (load_instruction_at_checked) can verify the repay instruction exists',
        ],
        codeExample: `pub fn flash_borrow(ctx: Context<FlashBorrow>, amount: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    // Record pre-borrow reserve
    pool.flash_loan_amount = amount;
    pool.pre_flash_reserve = pool.token_a_reserve;

    // Transfer tokens to borrower (no collateral check)
    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_a.to_account_info(),
        to: ctx.accounts.borrower_token.to_account_info(),
        authority: ctx.accounts.pool_authority.to_account_info(),
    };
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            &[&[b"pool", pool.bump.to_le_bytes().as_ref()]],
        ),
        amount,
    )?;
    Ok(())
}

pub fn flash_repay(ctx: Context<FlashRepay>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let fee = pool.flash_loan_amount / 1000; // 0.1% fee
    let required = pool.flash_loan_amount + fee;
    require!(
        ctx.accounts.vault_a.amount >= pool.pre_flash_reserve + fee,
        ErrorCode::FlashLoanNotRepaid
    );
    pool.token_a_reserve = ctx.accounts.vault_a.amount;
    Ok(())
}`,
        commonMistakes: [
          'Not using instruction introspection — a borrower could call flash_borrow without flash_repay in the same tx',
          'Forgetting to add the flash fee to reserves — the pool should profit from flash loans',
        ],
        practicePrompt: 'Write a test demonstrating a legitimate flash loan: borrow 1000 tokens, "arbitrage" (simulate with a mock), repay 1001 tokens, verify pool balance increased by 1.',
      }),
      makeTask("p6w2d4", 6, 22, 4, "Flash Loan Fee Mechanism", "Design and implement the flash loan fee structure and LP fee distribution.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Aave charges 0.09%, dYdX charges 0% (revenue from spread) — 0.1% is a safe middle ground',
          'Flash fees accrue to reserves just like swap fees — LP tokens become more valuable',
          'Protocol can take a cut of flash fees by transferring to a treasury PDA',
          'Store flash_fee_numerator separately from swap fee for independent tuning',
          'Emit FlashLoanEvent with borrower, amount, fee for analytics',
        ],
        codeExample: `#[account]
pub struct Pool {
    // ... existing fields
    pub flash_fee_numerator: u64,    // e.g. 1
    pub flash_fee_denominator: u64,  // e.g. 1000 => 0.1%
    pub protocol_fee_bps: u64,       // basis points of flash fee going to treasury
    pub treasury: Pubkey,
}

fn compute_flash_fee(pool: &Pool, amount: u64) -> (u64, u64) {
    let total_fee = amount
        .checked_mul(pool.flash_fee_numerator).unwrap()
        / pool.flash_fee_denominator;
    let protocol_cut = total_fee
        .checked_mul(pool.protocol_fee_bps).unwrap()
        / 10000;
    let lp_fee = total_fee - protocol_cut;
    (lp_fee, protocol_cut)
}

#[event]
pub struct FlashLoanEvent {
    pub borrower: Pubkey,
    pub amount: u64,
    pub fee: u64,
}`,
        commonMistakes: [
          'Integer rounding: total_fee = 1 for amounts < 1000 with 0.1% fee — add a minimum fee of 1 lamport',
          'Not separating protocol fee from LP fee — LPs should not subsidize protocol treasury without consent',
        ],
        practicePrompt: 'Implement a governance-controlled fee update instruction that can change flash_fee_numerator, guarded by a multisig authority account.',
      }),
      makeTask("p6w2d5", 6, 22, 5, "Arbitrage Simulation", "Simulate cross-pool arbitrage using flash loans to understand MEV and pool equilibrium.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Arbitrage maintains price parity across pools — if pool A has SOL@$50 and pool B has SOL@$52, arb is profitable',
          'Flash loan arbitrage: borrow token A, swap on cheap pool, swap back on expensive pool, repay + profit',
          'Profit = price_difference * volume - fees - gas',
          'On Solana, arb bots compete in the same block — transaction ordering matters (MEV)',
          'Jito bundles allow atomic multi-instruction arb with tip to block producer',
        ],
        codeExample: `// Arbitrage math: find optimal trade size between two pools
// Pool1: ra1 * rb1 = k1, Pool2: ra2 * rb2 = k2
// Optimal arb amount maximizes profit

fn optimal_arb_amount(
    reserve_a1: u64, reserve_b1: u64, // pool 1 reserves
    reserve_a2: u64, reserve_b2: u64, // pool 2 reserves
) -> u64 {
    // price in pool1 = rb1/ra1, price in pool2 = rb2/ra2
    // arb profitable when rb1/ra1 != rb2/ra2
    let price1 = (reserve_b1 as f64) / (reserve_a1 as f64);
    let price2 = (reserve_b2 as f64) / (reserve_a2 as f64);

    if (price1 - price2).abs() < 0.001 { return 0; } // not worth it

    // simplified: trade ~1% of smaller pool
    let smaller_reserve = reserve_a1.min(reserve_a2);
    smaller_reserve / 100
}

// After arb: both pools converge to geometric mean price
// equilibrium_price = sqrt(price1 * price2)`,
        commonMistakes: [
          'Forgetting fees reduce arb profit significantly — a 0.3% fee each way means 0.6% price gap needed minimum',
          'Using simulate instead of real flash loan in tests — simulate does not enforce atomic repayment',
        ],
        practicePrompt: 'Create two pool accounts with different prices (pool1: 1000/50000, pool2: 1000/52000). Write a function that computes the arb profit and optimal trade size.',
      }),
      makeTask("p6w2d6", 6, 22, 6, "Front-Running Protection", "Implement commit-reveal and deadline mechanisms to protect users from MEV bots.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Front-running: bot sees pending swap, submits higher-fee tx, executes before victim',
          'Slippage tolerance (min_amount_out) is the primary defense — bots cannot make you get less than your minimum',
          'Deadline parameter: require!(Clock::get()?.unix_timestamp <= deadline) prevents stale replays',
          'Private mempools (Jito) reduce frontrunning by bundling user + arb into same block',
          'Commit-reveal: hash(amount + nonce) first, then reveal — prevents sniping',
        ],
        codeExample: `// Deadline guard on swap
pub fn swap_with_deadline(
    ctx: Context<Swap>,
    amount_in: u64,
    min_amount_out: u64,
    deadline: i64,
) -> Result<()> {
    let clock = Clock::get()?;
    require!(
        clock.unix_timestamp <= deadline,
        ErrorCode::TransactionExpired
    );
    // proceed with swap...
    swap_internal(&mut ctx.accounts.pool, amount_in, min_amount_out)
}

// Commit-reveal swap (2 transactions)
pub fn commit_swap(ctx: Context<CommitSwap>, commitment: [u8; 32]) -> Result<()> {
    let slot = Clock::get()?.slot;
    ctx.accounts.commitment_record.hash = commitment;
    ctx.accounts.commitment_record.slot = slot;
    ctx.accounts.commitment_record.user = ctx.accounts.user.key();
    Ok(())
}

pub fn reveal_swap(
    ctx: Context<RevealSwap>,
    amount_in: u64,
    nonce: u64,
    min_out: u64,
) -> Result<()> {
    let rec = &ctx.accounts.commitment_record;
    let expected = anchor_lang::solana_program::hash::hashv(&[
        &amount_in.to_le_bytes(), &nonce.to_le_bytes(),
    ]);
    require!(rec.hash == expected.to_bytes(), ErrorCode::InvalidCommitment);
    Ok(())
}`,
        commonMistakes: [
          'Setting deadline too far in the future (> 30 seconds) — still allows frontrunning in the window',
          'Not combining deadline with min_amount_out — deadline alone does not protect against price manipulation',
        ],
        practicePrompt: 'Add a deadline: i64 parameter to your swap instruction and write a test that simulates time advancing past the deadline and asserts TransactionExpired error.',
      }),
      makeTask("p6w2d7", 6, 22, 7, "AMM Security Audit Checklist", "Run through a structured security audit of your complete AMM program.", 4, "exercise", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks Reference", platform: "github" }, {
        keyPoints: [
          'Audit tool: cargo audit checks dependencies for known vulnerabilities',
          'Check every account: is owner == expected_program? is signer when required?',
          'Overflow: every arithmetic op must use checked_, saturating_, or wrapping_',
          'PDA bumps must be stored and verified — never accept arbitrary bump from user',
          'CPI: validate the target program address before invoking (no arbitrary CPI)',
        ],
        codeExample: `// Security audit checklist as Anchor constraints

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(
        mut,
        seeds = [b"pool", pool.token_a_mint.as_ref(), pool.token_b_mint.as_ref()],
        bump = pool.bump,                    // ✓ verified PDA bump
        constraint = !pool.paused @ ErrorCode::PoolPaused  // ✓ circuit breaker
    )]
    pub pool: Account<'info, Pool>,

    #[account(
        mut,
        constraint = vault_a.owner == pool.key() @ ErrorCode::InvalidVaultOwner,  // ✓ owner check
        constraint = vault_a.mint == pool.token_a_mint @ ErrorCode::WrongMint,    // ✓ mint check
    )]
    pub vault_a: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = user_token_a.owner == user.key() @ ErrorCode::InvalidUserAccount
    )]
    pub user_token_a: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,   // ✓ signer check

    pub token_program: Program<'info, Token>,  // ✓ program ID checked by Anchor
}`,
        commonMistakes: [
          'Relying only on Anchor attribute macros — write explicit require!() checks for business logic invariants',
          'Not auditing CPI targets — passing an attacker-controlled program ID to invoke() is critical',
        ],
        practicePrompt: 'Go through your AMM program with the Sealevel Attacks checklist. Add missing constraints. Run anchor build and fix all clippy warnings before marking done.',
      }),
    ],
  },

  // Week 23 — Lending Protocol Core
  {
    weekNumber: 23,
    phaseWeek: 3,
    phaseId: 6,
    title: "Lending Protocol: Core Logic",
    goal: "Build a lending/borrowing protocol with interest rate model.",
    isCompleted: false,
    tasks: [
      makeTask("p6w3d1", 6, 23, 1, "Lending Pool State Design", "Design the on-chain state for a lending pool: deposits, borrows, interest index.", 4, "coding", { url: "https://solana.com/developers", label: "Solana — DeFi Examples", platform: "docs" }, {
        keyPoints: [
          'borrow_index tracks compound interest — stored as a scaled integer (e.g. 1e18 = 1.0)',
          'total_deposits and total_borrows grow independently — utilization = borrows/deposits',
          'Each user has a UserPosition PDA storing: deposited_shares, borrowed_amount, borrow_index_snapshot',
          'Interest accrues on every state-touching instruction by updating borrow_index',
          'Reserve factor: portion of interest going to protocol treasury (e.g. 10%)',
        ],
        codeExample: `#[account]
pub struct LendingPool {
    pub mint: Pubkey,              // token being lent
    pub vault: Pubkey,             // token account holding deposits
    pub total_deposits: u64,       // total tokens deposited
    pub total_borrows: u64,        // total tokens borrowed
    pub borrow_index: u128,        // compound interest index (starts at 1e18)
    pub last_update_slot: u64,
    pub base_rate: u64,            // annual rate at 0% utilization (bps)
    pub slope: u64,                // rate increase per 1% utilization (bps)
    pub reserve_factor: u64,       // protocol cut of interest (bps)
    pub bump: u8,
}

#[account]
pub struct UserPosition {
    pub pool: Pubkey,
    pub owner: Pubkey,
    pub deposited_shares: u64,     // proportional claim on vault
    pub borrowed_amount: u64,      // principal borrowed
    pub borrow_index_snapshot: u128, // index at time of last borrow
    pub bump: u8,
}`,
        commonMistakes: [
          'Storing deposited_amount instead of deposited_shares — shares correctly handle interest accrual for all depositors',
          'Not updating the interest index before any state change — leads to incorrect interest calculation',
        ],
        practicePrompt: 'Implement initialize_pool: create LendingPool PDA with base_rate=200 (2%), slope=800 (8%), reserve_factor=1000 (10%). Write a test verifying all fields.',
      }),
      makeTask("p6w3d2", 6, 23, 2, "Deposit Collateral Instruction", "Implement deposit: transfer tokens to vault, mint proportional deposit shares to user.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Exchange rate = total_deposits / total_shares — new shares = deposit_amount / exchange_rate',
          'First deposit: shares = deposit_amount (1:1 initial ratio)',
          'Always accrue_interest() before computing exchange rate',
          'CPI to token program: transfer deposit_amount from user to vault',
          'Emit DepositEvent for off-chain indexers',
        ],
        codeExample: `pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    accrue_interest(pool)?;

    // compute shares to mint
    let shares = if pool.total_deposits == 0 {
        amount
    } else {
        (amount as u128)
            .checked_mul(pool.total_shares as u128).unwrap()
            / pool.total_deposits as u128
    } as u64;

    // transfer tokens: user -> vault
    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), Transfer {
            from: ctx.accounts.user_token.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        }),
        amount,
    )?;

    pool.total_deposits = pool.total_deposits.checked_add(amount).unwrap();
    pool.total_shares = pool.total_shares.checked_add(shares).unwrap();
    ctx.accounts.user_position.deposited_shares += shares;

    emit!(DepositEvent { user: ctx.accounts.user.key(), amount, shares });
    Ok(())
}`,
        commonMistakes: [
          'Not calling accrue_interest before computing shares — deposits during high utilization get too many shares',
          'Forgetting to update total_shares alongside total_deposits — the ratio drifts and breaks withdrawals',
        ],
        practicePrompt: 'Write a test: user A deposits 1000, user B deposits 1000. After accruing interest (advance clock 1 year), both withdraw. Verify each gets > 1000 (interest earned).',
      }),
      makeTask("p6w3d3", 6, 23, 3, "Borrow Against Collateral", "Implement borrow: check collateral ratio, transfer borrowed tokens, record position.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Collateral factor (LTV): max borrowable = collateral_value * collateral_factor',
          'Borrow health = collateral_value * cf / total_borrow_value — must be > 1.0',
          'Oracle price (Pyth/Switchboard) required to convert collateral to borrow token value',
          'Record borrow_index_snapshot at time of borrow to compute interest later',
          'Max borrow is limited by available liquidity: require!(amount <= pool.total_deposits - pool.total_borrows)',
        ],
        codeExample: `pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    accrue_interest(pool)?;

    let liquidity = pool.total_deposits
        .checked_sub(pool.total_borrows)
        .ok_or(ErrorCode::InsufficientLiquidity)?;
    require!(amount <= liquidity, ErrorCode::InsufficientLiquidity);

    // health check: collateral_value * factor >= current_borrows + new_borrow
    let collateral_value = get_oracle_value(&ctx.accounts.collateral_oracle)?;
    let borrow_value = get_oracle_value(&ctx.accounts.borrow_oracle)?;
    let max_borrow = (collateral_value as u128)
        .checked_mul(ctx.accounts.collateral_pool.collateral_factor as u128).unwrap()
        / 10000;
    let current_borrow_value = (ctx.accounts.user_position.borrowed_amount as u128)
        .checked_mul(borrow_value as u128).unwrap() / 1_000_000;
    require!(
        current_borrow_value + amount as u128 <= max_borrow,
        ErrorCode::InsufficientCollateral
    );

    ctx.accounts.user_position.borrowed_amount += amount;
    ctx.accounts.user_position.borrow_index_snapshot = pool.borrow_index;
    pool.total_borrows += amount;
    Ok(())
}`,
        commonMistakes: [
          'Using AMM spot price as oracle — flash loan attacks can manipulate spot price in the same transaction',
          'Not storing borrow_index_snapshot — can\'t correctly calculate interest owed at repay time',
        ],
        practicePrompt: 'Implement get_current_debt(position, pool) that returns principal * (current_index / snapshot_index). Write a unit test with known index values.',
      }),
      makeTask("p6w3d4", 6, 23, 4, "Interest Rate Model", "Implement a kinked interest rate model: low base rate below kink, steep rate above.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Utilization rate = total_borrows / total_deposits (0 to 100%)',
          'Below kink (e.g. 80%): rate = base_rate + utilization * slope1',
          'Above kink: rate = base_rate + kink * slope1 + (utilization - kink) * slope2',
          'Compound interest: new_index = old_index * (1 + rate * elapsed_slots / slots_per_year)',
          'Slots per year on Solana ≈ 63,072,000 (2 slots/second * 60 * 60 * 24 * 365)',
        ],
        codeExample: `const SLOTS_PER_YEAR: u64 = 63_072_000;
const INDEX_SCALE: u128 = 1_000_000_000_000_000_000; // 1e18

pub fn compute_borrow_rate(pool: &LendingPool) -> u64 {
    if pool.total_deposits == 0 { return pool.base_rate; }
    let utilization = (pool.total_borrows as u128 * 10000)
        / pool.total_deposits as u128;

    if utilization <= pool.kink_utilization as u128 {
        pool.base_rate + (utilization as u64 * pool.slope1 / 10000)
    } else {
        let excess = utilization as u64 - pool.kink_utilization;
        pool.base_rate
            + pool.kink_utilization * pool.slope1 / 10000
            + excess * pool.slope2 / 10000
    }
}

pub fn accrue_interest(pool: &mut LendingPool) -> Result<()> {
    let slot = Clock::get()?.slot;
    let elapsed = slot.saturating_sub(pool.last_update_slot);
    if elapsed == 0 { return Ok(()); }

    let rate_bps = compute_borrow_rate(pool) as u128;
    // index *= (1 + rate * elapsed / slots_per_year)
    let interest_factor = INDEX_SCALE
        + rate_bps * elapsed as u128 * INDEX_SCALE
        / (10000 * SLOTS_PER_YEAR as u128);
    pool.borrow_index = pool.borrow_index
        .checked_mul(interest_factor).unwrap()
        / INDEX_SCALE;
    pool.last_update_slot = slot;
    Ok(())
}`,
        commonMistakes: [
          'Forgetting to scale the interest factor — multiplying borrow_index directly by the rate (not 1 + rate) wipes out deposits',
          'Using timestamps instead of slots for interest — timestamps can be manipulated by validators within bounds',
        ],
        practicePrompt: 'Write a test: set up pool with base_rate=200, slope=800, kink=8000. At 50% utilization assert rate=600bps. At 90% utilization assert rate > 1400bps.',
      }),
      makeTask("p6w3d5", 6, 23, 5, "Liquidation Condition Logic", "Implement health factor calculation that determines when a position is liquidatable.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Health factor = (collateral_value * liquidation_threshold) / total_debt_value',
          'Position is liquidatable when health_factor < 1.0 (scaled: < 10000 in bps)',
          'Liquidation threshold is higher than borrow LTV (e.g. LTV=75%, threshold=80%)',
          'Price staleness check: reject oracle prices older than N slots',
          'Partial liquidation: allow liquidating up to close_factor (e.g. 50%) per call',
        ],
        codeExample: `pub fn compute_health_factor(
    collateral_value: u64,
    liquidation_threshold: u64, // bps e.g. 8000 = 80%
    debt_value: u64,
) -> u64 {
    if debt_value == 0 { return u64::MAX; } // infinite health
    (collateral_value as u128)
        .checked_mul(liquidation_threshold as u128).unwrap()
        .checked_div(debt_value as u128 * 10000 / 10000).unwrap()
        .min(u64::MAX as u128) as u64
    // returns bps: 10000 = healthy, < 10000 = liquidatable
}

pub fn is_liquidatable(
    collateral_value: u64,
    liquidation_threshold: u64,
    debt_value: u64,
) -> bool {
    if debt_value == 0 { return false; }
    // collateral * threshold < debt * 10000
    (collateral_value as u128) * liquidation_threshold as u128
        < (debt_value as u128) * 10000
}`,
        commonMistakes: [
          'Using LTV threshold (75%) for liquidation check instead of the higher liquidation threshold (80%) — creates immediate liquidation loops',
          'Not checking oracle price freshness — stale prices can trigger false liquidations',
        ],
        practicePrompt: 'Create a test: deposit $1000 collateral (threshold 80%), borrow $750. Assert not liquidatable. Move oracle price down 10% (collateral = $900). Assert now liquidatable.',
      }),
      makeTask("p6w3d6", 6, 23, 6, "Repay Loan Instruction", "Implement repay: accept tokens, reduce borrow position with accrued interest.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Current debt = principal * (current_borrow_index / snapshot_index)',
          'Allow partial repay: clamp amount to min(requested, current_debt)',
          'Reduce borrowed_amount by principal equivalent: repaid_principal = amount / index_ratio',
          'Update borrow_index_snapshot after partial repay to avoid double-counting interest',
          'Emit RepayEvent with amount, remaining_debt',
        ],
        codeExample: `pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    accrue_interest(pool)?;

    let pos = &mut ctx.accounts.user_position;
    // compute current debt including interest
    let current_debt = (pos.borrowed_amount as u128)
        .checked_mul(pool.borrow_index).unwrap()
        / pos.borrow_index_snapshot;
    let current_debt = current_debt as u64;

    // clamp repay amount to actual debt
    let repay_amount = amount.min(current_debt);

    // principal reduction = repay_amount / (index / snapshot)
    let principal_reduction = (repay_amount as u128)
        .checked_mul(pos.borrow_index_snapshot).unwrap()
        / pool.borrow_index;
    let principal_reduction = principal_reduction as u64;

    pos.borrowed_amount = pos.borrowed_amount
        .saturating_sub(principal_reduction);
    // update snapshot to current index to reset interest accrual
    pos.borrow_index_snapshot = pool.borrow_index;
    pool.total_borrows = pool.total_borrows.saturating_sub(principal_reduction);

    // CPI: transfer repay_amount from user to vault
    Ok(())
}`,
        commonMistakes: [
          'Reducing borrowed_amount by repay_amount directly — ignores accrued interest, allows underpayment',
          'Not updating borrow_index_snapshot after partial repay — causes interest to be counted twice on the remaining balance',
        ],
        practicePrompt: 'Write a test: borrow 1000, advance time 1 year at 10% APR, call repay(1000) and assert it fails (debt is now ~1100). Then repay(1100) and assert position is closed.',
      }),
      makeTask("p6w3d7", 6, 23, 7, "Withdraw Collateral Instruction", "Implement withdraw: allow users to reclaim deposit, guarded by borrow health check.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Withdraw converts shares back to tokens: amount = shares * total_deposits / total_shares',
          'Must verify health factor remains >= 1.0 after the withdrawal',
          'Cannot withdraw if withdraw would make health factor < liquidation threshold',
          'Partial withdraw is allowed as long as health factor stays healthy',
          'CPI: transfer tokens from vault to user, burn shares from user_position',
        ],
        codeExample: `pub fn withdraw(ctx: Context<Withdraw>, shares: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    accrue_interest(pool)?;

    let pos = &mut ctx.accounts.user_position;
    require!(shares <= pos.deposited_shares, ErrorCode::InsufficientShares);

    // compute token amount for these shares
    let withdraw_amount = (shares as u128)
        .checked_mul(pool.total_deposits as u128).unwrap()
        / pool.total_shares as u128;
    let withdraw_amount = withdraw_amount as u64;

    // health check after withdrawal
    if pos.borrowed_amount > 0 {
        let new_collateral_value = get_collateral_value_after_withdraw(
            &ctx.accounts.collateral_oracle,
            pos.deposited_shares - shares,
            pool,
        )?;
        let debt_value = get_debt_value(&ctx.accounts.borrow_oracle, pos, pool)?;
        require!(
            !is_liquidatable(new_collateral_value, pool.liquidation_threshold, debt_value),
            ErrorCode::WouldBecomeUndercollateralized
        );
    }

    pool.total_deposits -= withdraw_amount;
    pool.total_shares -= shares;
    pos.deposited_shares -= shares;
    // CPI transfer vault -> user
    Ok(())
}`,
        commonMistakes: [
          'Not running health check on withdraw — user can withdraw collateral while still having borrows, causing bad debt',
          'Dividing total_deposits / total_shares with integer truncation — accumulate dust error over time; use u128 for intermediate calc',
        ],
        practicePrompt: 'Write a test: deposit 1000, borrow 750 (75% LTV). Try to withdraw 500 and assert it fails (WouldBecomeUndercollateralized). Repay 300, then withdraw 200 successfully.',
      }),
    ],
  },

  // Week 24 — Lending Safety & Liquidations
  {
    weekNumber: 24,
    phaseWeek: 4,
    phaseId: 6,
    title: "Lending Protocol: Safety & Liquidations",
    goal: "Add liquidation engine, price-based safety checks, and protocol fees.",
    isCompleted: false,
    tasks: [
      makeTask("p6w4d1", 6, 24, 1, "Health Factor Calculation", "Implement the health factor formula and expose it via a view function for frontends.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Health factor must aggregate ALL collateral positions across multiple pools',
          'Each collateral token has its own liquidation_threshold, weighted by value',
          'Weighted health = sum(collateral_i * threshold_i) / sum(borrow_i)',
          'Simulate health factor client-side before submitting borrow transactions',
          'Emit HealthFactorUpdated event so frontends can alert users in real-time',
        ],
        codeExample: `// Health factor aggregated across multiple collateral pools
pub fn compute_aggregate_health(
    collaterals: &[(u64, u64, u64)], // (amount, price, threshold_bps)
    borrows: &[(u64, u64)],          // (amount, price)
) -> u64 {
    let weighted_collateral: u128 = collaterals.iter().map(|(amt, price, thresh)| {
        (*amt as u128) * (*price as u128) * (*thresh as u128) / 10000
    }).sum();

    let total_debt: u128 = borrows.iter().map(|(amt, price)| {
        (*amt as u128) * (*price as u128)
    }).sum();

    if total_debt == 0 { return u64::MAX; }
    // returns bps: 10000 = exactly at threshold
    (weighted_collateral / total_debt).min(u64::MAX as u128) as u64
}`,
        commonMistakes: [
          'Computing health factor only on a single collateral pool when user has multiple — misses the aggregate risk',
          'Using integer division for health factor — losing precision causes incorrect liquidation triggers',
        ],
        practicePrompt: 'Write a function that takes a UserPortfolio with Vec<CollateralPosition> and Vec<BorrowPosition> and returns (health_factor, max_additional_borrow, safe_withdraw_amount).',
      }),
      makeTask("p6w4d2", 6, 24, 2, "Liquidation Bonus Mechanics", "Implement the liquidation instruction with bonus incentive for liquidators.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Liquidators repay the borrower\'s debt and receive collateral at a discount (5-15% bonus)',
          'Liquidation bonus = repaid_debt_value * (1 + bonus_factor)',
          'Close factor limits how much debt can be liquidated per call (e.g. 50%)',
          'Dynamic bonus: Aave increases bonus as health factor worsens to incentivize fast liquidation',
          'Liquidation profit must be positive — require!(collateral_received_value > debt_paid_value)',
        ],
        codeExample: `pub fn liquidate(
    ctx: Context<Liquidate>,
    repay_amount: u64,
) -> Result<()> {
    let pool = &mut ctx.accounts.borrow_pool;
    accrue_interest(pool)?;
    let pos = &mut ctx.accounts.user_position;

    // verify position is liquidatable
    let collateral_value = get_oracle_value(&ctx.accounts.collateral_oracle)?;
    let debt_value = get_oracle_value(&ctx.accounts.borrow_oracle)?;
    require!(
        is_liquidatable(collateral_value, pool.liquidation_threshold, debt_value),
        ErrorCode::PositionHealthy
    );

    // close factor: max 50% of debt per liquidation
    let max_repay = get_current_debt(pos, pool) / 2;
    let repay_amount = repay_amount.min(max_repay);

    // collateral seized = repay_value * (1 + bonus) in collateral tokens
    let bonus_factor = 10500u64; // 105% = 5% bonus
    let seized_value = (repay_amount as u128)
        .checked_mul(bonus_factor as u128).unwrap() / 10000;
    let seized_collateral = (seized_value * 1_000_000
        / collateral_value as u128) as u64;

    // transfer: liquidator repays debt, receives seized_collateral
    pool.total_borrows -= repay_amount;
    ctx.accounts.collateral_position.deposited_shares -= seized_collateral;
    Ok(())
}`,
        commonMistakes: [
          'Setting liquidation bonus too high (>15%) — creates bank run dynamics where LPs rush to exit before liquidations',
          'Not enforcing close_factor — full liquidation in one call destabilizes protocol and removes borrower equity',
        ],
        practicePrompt: 'Write a test: setup position at 95% LTV (undercollateralized). Liquidate 50%. Assert debt reduced by 50% and liquidator received collateral worth 5% more than repaid.',
      }),
      makeTask("p6w4d3", 6, 24, 3, "Oracle Price Integration", "Integrate Pyth or Switchboard oracle prices into the lending protocol.", 4, "coding", { url: "https://docs.pyth.network/price-feeds/use-real-data/solana", label: "Pyth Solana Docs", platform: "docs" }, {
        keyPoints: [
          'Pyth provides confidence intervals — reject prices where confidence > price * 1%',
          'Switchboard aggregates multiple sources and provides on-chain median',
          'Price staleness: reject oracle data older than 60 seconds (on mainnet)',
          'Pyth exponent: price = price_raw * 10^exponent (negative exponents are common)',
          'Always use the primary oracle with a fallback oracle for redundancy',
        ],
        codeExample: `use pyth_sdk_solana::load_price_feed_from_account_info;

pub fn get_pyth_price(price_account: &AccountInfo) -> Result<u64> {
    let price_feed = load_price_feed_from_account_info(price_account)
        .map_err(|_| error!(ErrorCode::InvalidOracle))?;

    let price = price_feed
        .get_price_no_older_than(60) // max 60 seconds old
        .ok_or(error!(ErrorCode::PriceStale))?;

    // confidence check: reject if confidence > 1% of price
    require!(
        price.conf < (price.price.unsigned_abs() / 100),
        ErrorCode::PriceConfidenceTooWide
    );

    // normalize to 6 decimal places
    let price_u64 = if price.expo >= 0 {
        (price.price as u64)
            .checked_mul(10u64.pow(price.expo as u32)).unwrap()
    } else {
        (price.price as u64)
            / 10u64.pow((-price.expo) as u32)
    };
    Ok(price_u64)
}`,
        commonMistakes: [
          'Ignoring the confidence interval — a very wide confidence band means the price is unreliable',
          'Forgetting to handle negative exponents — Pyth SOL price uses expo=-8, raw price is 6_000_000_00 = $60.00',
        ],
        practicePrompt: 'Write a mock oracle account for testing: implement a struct MockOracle with set_price(price: u64) and have your get_oracle_value function work with both Pyth and MockOracle.',
      }),
      makeTask("p6w4d4", 6, 24, 4, "Bad Debt Handling", "Design a mechanism to handle undercollateralized positions that can\'t be profitably liquidated.", 4, "reading", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Bad debt occurs when collateral_value < debt_value — liquidation is not profitable',
          'Protocol insurance fund absorbs bad debt to protect depositors',
          'Socialized losses: bad debt is spread across all depositors (total_deposits decreases)',
          'Automated market liquidators reduce bad debt risk by liquidating early',
          'Aave v3 uses an eMode and supply/borrow caps to limit concentration risk',
        ],
        codeExample: `#[account]
pub struct InsuranceFund {
    pub balance: u64,
    pub authority: Pubkey,
    pub bump: u8,
}

pub fn handle_bad_debt(
    ctx: Context<HandleBadDebt>,
    position_owner: Pubkey,
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let pos = &mut ctx.accounts.user_position;

    // verify position is truly bad debt (collateral < debt)
    let collateral_val = get_oracle_value(&ctx.accounts.oracle)?;
    let debt_val = get_current_debt(pos, pool);
    require!(collateral_val < debt_val, ErrorCode::NotBadDebt);

    let shortfall = debt_val - collateral_val;

    // try insurance fund first
    if ctx.accounts.insurance_fund.balance >= shortfall {
        ctx.accounts.insurance_fund.balance -= shortfall;
        pool.total_deposits -= shortfall; // restore pool accounting
    } else {
        // socialize losses across all depositors
        pool.total_deposits = pool.total_deposits.saturating_sub(shortfall);
    }

    // clear the bad position
    pos.borrowed_amount = 0;
    pos.deposited_shares = 0;
    Ok(())
}`,
        commonMistakes: [
          'Not having an insurance fund at all — protocol goes insolvent on first bad debt event',
          'Socializing losses without an event — depositors need to know their balance decreased',
        ],
        practicePrompt: 'Implement a deposit_to_insurance_fund instruction and a governance-controlled withdraw from it. Add a require that governance multisig signs withdrawals.',
      }),
      makeTask("p6w4d5", 6, 24, 5, "Protocol Fee Treasury", "Implement fee collection and treasury management for the lending protocol.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Reserve factor (e.g. 10%): 10% of interest paid goes to treasury, not depositors',
          'Accrue treasury fees alongside borrow index update in accrue_interest()',
          'Treasury PDA is controlled by governance or multisig authority',
          'Harvest fees instruction: transfer accumulated fees from pool to treasury',
          'Fee revenues fund: insurance fund top-ups, bug bounties, team compensation',
        ],
        codeExample: `pub fn accrue_interest_with_fees(pool: &mut LendingPool) -> Result<()> {
    let slot = Clock::get()?.slot;
    let elapsed = slot.saturating_sub(pool.last_update_slot);
    if elapsed == 0 { return Ok(()); }

    let interest_earned = compute_interest_earned(pool, elapsed);

    // split interest: reserve_factor goes to treasury
    let protocol_fee = (interest_earned as u128)
        .checked_mul(pool.reserve_factor as u128).unwrap()
        / 10000;
    let lp_share = interest_earned - protocol_fee as u64;

    pool.total_deposits += lp_share;
    pool.accrued_fees += protocol_fee as u64;
    pool.borrow_index = update_borrow_index(pool, elapsed);
    pool.last_update_slot = slot;
    Ok(())
}

pub fn harvest_fees(ctx: Context<HarvestFees>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let fees = pool.accrued_fees;
    require!(fees > 0, ErrorCode::NoFeesToHarvest);
    pool.accrued_fees = 0;
    // CPI: transfer fees from vault to treasury
    emit!(FeesHarvestedEvent { amount: fees });
    Ok(())
}`,
        commonMistakes: [
          'Crediting protocol fees to total_deposits — inflates LP share values incorrectly; fees must be tracked separately',
          'Not enforcing governance on harvest_fees — anyone could drain treasury timing arbitrage',
        ],
        practicePrompt: 'Write a test: borrow 1000 for 1 year at 10% APR with 10% reserve factor. Assert accrued_fees == 10 (10% of 100 interest). Harvest and verify treasury balance.',
      }),
      makeTask("p6w4d6", 6, 24, 6, "Emergency Pause Mechanism", "Implement circuit breakers and governance-controlled pause for protocol safety.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'paused flag on pool: all state-modifying instructions check !pool.paused',
          'Only guardian (multisig or timelock) can set paused = true',
          'Unpause should require governance vote with minimum delay (e.g. 24h timelock)',
          'Partial pause: can pause borrows only while allowing repays and withdrawals',
          'Emit PausedEvent with reason string for transparency',
        ],
        codeExample: `#[account]
pub struct Pool {
    // ...
    pub paused: bool,
    pub borrow_paused: bool,    // pauses only new borrows
    pub guardian: Pubkey,       // can pause immediately
    pub governance: Pubkey,     // can unpause (with delay)
}

// macro to add to all state-modifying instructions
macro_rules! require_not_paused {
    ($pool:expr) => {
        require!(!$pool.paused, ErrorCode::ProtocolPaused)
    };
}

pub fn pause(ctx: Context<Pause>) -> Result<()> {
    require!(
        ctx.accounts.guardian.key() == ctx.accounts.pool.guardian,
        ErrorCode::Unauthorized
    );
    ctx.accounts.pool.paused = true;
    emit!(PausedEvent {
        pool: ctx.accounts.pool.key(),
        guardian: ctx.accounts.guardian.key(),
        timestamp: Clock::get()?.unix_timestamp,
    });
    Ok(())
}

pub fn unpause(ctx: Context<Unpause>, timelock_id: u64) -> Result<()> {
    // verify timelock has elapsed
    let timelock = &ctx.accounts.timelock;
    require!(timelock.id == timelock_id, ErrorCode::InvalidTimelock);
    let now = Clock::get()?.unix_timestamp;
    require!(now >= timelock.execute_at, ErrorCode::TimelockNotReady);
    ctx.accounts.pool.paused = false;
    Ok(())
}`,
        commonMistakes: [
          'Only having one pause level — must be able to pause borrows without blocking repays (users need to exit)',
          'Guardian == deployer wallet — should be a multisig to prevent single point of failure',
        ],
        practicePrompt: 'Write a test: pause the pool, attempt a borrow (should fail with ProtocolPaused), attempt a repay (should succeed — repays always allowed). Then unpause and borrow again.',
      }),
      makeTask("p6w4d7", 6, 24, 7, "Full Lending Protocol Tests", "Write comprehensive integration tests for the complete lending protocol.", 4, "coding", { url: "https://www.anchor-lang.com/docs/testing/basics", label: "Anchor Testing Guide", platform: "docs" }, {
        keyPoints: [
          'Test happy path: deposit → borrow → accrue interest → repay → withdraw',
          'Test liquidation: manipulate oracle price to trigger health < 1.0, assert liquidator profits',
          'Test pause: guardian pauses, borrow fails, repay succeeds, guardian unpauses',
          'Test bad debt: price crashes below debt, insurance fund absorbs shortfall',
          'Use Bankrun for fast testing without spinning up full local validator',
        ],
        codeExample: `describe("Lending Protocol", () => {
  it("full lifecycle: deposit -> borrow -> repay -> withdraw", async () => {
    await deposit(user, 1000_000);
    await borrow(user, 500_000);

    // advance time to accrue interest
    await provider.context.warp_to_slot(SLOTS_PER_YEAR);

    const debt = await getCurrentDebt(user);
    assert.ok(debt.gtn(500_000), "interest should accrue");

    await repay(user, debt);
    const position = await program.account.userPosition.fetch(userPositionPda);
    assert.ok(position.borrowedAmount.eqn(0));

    await withdraw(user, await getShares(user));
    const balance = await getTokenBalance(userTokenAccount);
    assert.ok(balance.gtn(1000_000), "should earn interest as LP");
  });

  it("liquidates undercollateralized position", async () => {
    await deposit(user, 1000_000);
    await borrow(user, 750_000); // 75% LTV

    // crash collateral price 30%
    await mockOracle.setPrice(700_000);

    const liquidatorBefore = await getTokenBalance(liquidatorTokenAccount);
    await liquidate(liquidator, user, 375_000);
    const liquidatorAfter = await getTokenBalance(liquidatorTokenAccount);
    assert.ok(
      liquidatorAfter.sub(liquidatorBefore).gtn(375_000),
      "liquidator should profit from bonus"
    );
  });
});`,
        commonMistakes: [
          'Not testing partial repay — this edge case frequently has off-by-one bugs in borrow_index_snapshot updates',
          'Skipping the bad debt scenario — it is the most catastrophic failure mode and must be tested explicitly',
        ],
        practicePrompt: 'Run anchor test with coverage. Identify any uncovered instruction paths and write tests for them. Target: every instruction has at least one success and one failure test case.',
      }),
    ],
  },

  // Week 25 — NFT Programs
  {
    weekNumber: 25,
    phaseWeek: 5,
    phaseId: 6,
    title: "NFT Programs: Mint & Metadata",
    goal: "Build a custom NFT program with metadata, collection, and royalties.",
    isCompleted: false,
    tasks: [
      makeTask("p6w5d1", 6, 25, 1, "NFT Mint Program Structure", "Set up an Anchor program to mint NFTs using the SPL Token program with Metaplex metadata.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Developers", platform: "custom" }, {
        keyPoints: [
          'NFT = SPL Token with supply=1, decimals=0, and associated metadata account',
          'Metaplex Token Metadata program stores: name, symbol, uri (points to JSON off-chain)',
          'Mint authority is transferred to a PDA or null after minting to prevent re-minting',
          'Freeze authority can be retained by creator to enable utilities (staking, soul-bound tokens)',
          'mpl-token-metadata crate provides CPI helpers for metadata program instructions',
        ],
        codeExample: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, Mint, MintTo};
use mpl_token_metadata::instruction::create_metadata_accounts_v3;

pub fn mint_nft(
    ctx: Context<MintNft>,
    name: String,
    symbol: String,
    uri: String,
) -> Result<()> {
    // 1. Mint 1 token to recipient
    token::mint_to(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.recipient_ata.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        }),
        1,
    )?;

    // 2. Create metadata account via Metaplex CPI
    let creators = vec![mpl_token_metadata::state::Creator {
        address: ctx.accounts.creator.key(),
        verified: false,
        share: 100,
    }];
    let ix = create_metadata_accounts_v3(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.mint.key(),
        ctx.accounts.authority.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.authority.key(),
        name, symbol, uri,
        Some(creators),
        500, // royalty: 5% (basis points)
        true, false, None, None, None,
    );
    anchor_lang::solana_program::program::invoke(&ix, &[/* accounts */])?;
    Ok(())
}`,
        commonMistakes: [
          'Not revoking mint authority after minting — anyone with authority can mint more, breaking the 1-of-1 guarantee',
          'Hardcoding the metadata URI — should be passed as a parameter, pointing to an IPFS/Arweave JSON file',
        ],
        practicePrompt: 'Write a mint_nft instruction that mints one NFT, creates metadata with name/symbol/uri params, then sets mint_authority to None (revoke). Verify supply==1 in tests.',
      }),
      makeTask("p6w5d2", 6, 25, 2, "Metadata Account with Metaplex", "Create and update Metaplex metadata accounts: name, symbol, URI, attributes.", 4, "coding", { url: "https://developers.metaplex.com/token-metadata", label: "Token Metadata Docs", platform: "custom" }, {
        keyPoints: [
          'Metadata account PDA: seeds = ["metadata", mpl_token_metadata::id(), mint]',
          'URI points to JSON: { name, image, attributes: [{trait_type, value}] }',
          'is_mutable=true allows update_authority to change metadata post-mint',
          'Master Edition account limits print editions and stores max_supply',
          'Verified creator flag requires a CPI from the creator to sign the metadata',
        ],
        codeExample: `// Metadata JSON structure (stored off-chain at URI)
{
  "name": "Ardan NFT #1",
  "symbol": "ARDAN",
  "description": "A rare Ardan Labs blockchain developer cert NFT",
  "image": "https://arweave.net/abc123/1.png",
  "attributes": [
    { "trait_type": "Level", "value": "Expert" },
    { "trait_type": "Language", "value": "Rust" },
    { "trait_type": "Rarity", "value": "Legendary" }
  ],
  "properties": {
    "files": [{ "uri": "https://arweave.net/abc123/1.png", "type": "image/png" }],
    "creators": [{ "address": "YOUR_WALLET", "share": 100 }]
  }
}

// On-chain: update_metadata CPI
pub fn update_nft_uri(ctx: Context<UpdateMetadata>, new_uri: String) -> Result<()> {
    let ix = mpl_token_metadata::instruction::update_metadata_accounts_v2(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.update_authority.key(),
        None, // new update_authority
        Some(DataV2 { name: "..".to_string(), symbol: "..".to_string(), uri: new_uri,
            seller_fee_basis_points: 500, creators: None, collection: None, uses: None }),
        None,
        Some(true), // is_mutable
    );
    invoke(&ix, &[/* ... */])?;
    Ok(())
}`,
        commonMistakes: [
          'Pointing URI to a centralized server — if the server goes down, metadata is lost; use Arweave/IPFS',
          'Setting is_mutable=false before the project is stable — can never fix metadata bugs after',
        ],
        practicePrompt: 'Upload a test JSON file to IPFS via nft.storage, mint an NFT pointing to it, fetch metadata on-chain with metaplex JS SDK, verify all attributes match.',
      }),
      makeTask("p6w5d3", 6, 25, 3, "On-Chain Royalty Enforcement", "Implement royalty enforcement using Metaplex\'s Programmable NFTs (pNFTs).", 4, "reading", { url: "https://developers.metaplex.com/token-metadata/pnfts", label: "Metaplex pNFTs", platform: "custom" }, {
        keyPoints: [
          'Standard NFTs: royalties are honor-based (marketplaces can choose to pay or not)',
          'pNFTs: transfers are locked by RuleSet — only authorized programs (that pay royalties) can transfer',
          'RuleSet is stored in a separate account and checked by Token Auth Rules program',
          'Creator must set: TokenStandard::ProgrammableNonFungible in metadata',
          'Cost of pNFT enforcement: higher CU usage (~40k vs ~10k for standard)',
        ],
        codeExample: `// Programmable NFT (pNFT) transfer — royalties enforced on-chain
use mpl_token_metadata::instruction::builders::TransferBuilder;

pub fn transfer_pnft(ctx: Context<TransferPnft>) -> Result<()> {
    // pNFT transfer requires delegate, token_record, and rule_set
    let transfer_args = mpl_token_metadata::instruction::TransferArgs::V1 {
        amount: 1,
        authorization_data: None,
    };

    let transfer_ix = TransferBuilder::new()
        .token(ctx.accounts.token.key())
        .token_owner(ctx.accounts.owner.key())
        .destination_token(ctx.accounts.destination_token.key())
        .destination_owner(ctx.accounts.destination_owner.key())
        .mint(ctx.accounts.mint.key())
        .metadata(ctx.accounts.metadata.key())
        .edition(ctx.accounts.edition.key())
        .token_record(ctx.accounts.token_record.key())
        .destination_token_record(ctx.accounts.dest_token_record.key())
        .authority(ctx.accounts.owner.key())
        .payer(ctx.accounts.payer.key())
        .system_program(system_program::id())
        .sysvar_instructions(sysvar::instructions::id())
        .spl_token_program(spl_token::id())
        .spl_ata_program(spl_associated_token_account::id())
        .build(transfer_args)
        .unwrap()
        .instruction();
    invoke(&transfer_ix, &[/* ... */])?;
    Ok(())
}`,
        commonMistakes: [
          'Using standard NFT (TokenStandard::NonFungible) when you need royalty enforcement — marketplaces can bypass royalties',
          'Forgetting the token_record account in pNFT transfers — leads to instruction error that is hard to debug',
        ],
        practicePrompt: 'Read the Metaplex pNFT documentation and write a 1-page summary: what is a RuleSet, how does it prevent royalty bypass, and what is the cost/benefit tradeoff?',
      }),
      makeTask("p6w5d4", 6, 25, 4, "Collection Verification", "Create a Metaplex verified collection and add NFTs to it.", 4, "coding", { url: "https://developers.metaplex.com/token-metadata/collections", label: "Metaplex Collections", platform: "custom" }, {
        keyPoints: [
          'Collection NFT: special NFT whose mint is used as collection identifier',
          'verify_collection CPI marks the child NFT as part of the verified collection',
          'Verified bit prevents fake collections — only collection authority can verify',
          'Collection metadata stores: size (number of verified NFTs)',
          'Unverify allows removing NFTs from collection (e.g., for burns or transfers)',
        ],
        codeExample: `pub fn create_collection(
    ctx: Context<CreateCollection>,
    name: String,
    symbol: String,
    uri: String,
) -> Result<()> {
    // Mint the collection NFT (same as regular NFT but with CollectionDetails)
    let collection_details = mpl_token_metadata::state::CollectionDetails::V1 { size: 0 };
    // create_metadata with collection_details = Some(...)
    // create_master_edition with max_supply = Some(0) (no prints)
    Ok(())
}

pub fn add_to_collection(ctx: Context<AddToCollection>) -> Result<()> {
    // verify_collection_v1 CPI — must be signed by collection update_authority
    let ix = mpl_token_metadata::instruction::verify_collection(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.nft_metadata.key(),
        ctx.accounts.collection_authority.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.collection_mint.key(),
        ctx.accounts.collection_metadata.key(),
        ctx.accounts.collection_master_edition.key(),
        None, // collection_authority_record (None = direct authority)
    );
    invoke_signed(&ix, &[/* ... */], &[/* signer seeds */])?;
    Ok(())
}`,
        commonMistakes: [
          'Creating collection metadata without CollectionDetails — collection size won\'t be tracked on-chain',
          'Using verify_collection with the wrong master edition account — Metaplex will silently fail or panic',
        ],
        practicePrompt: 'Create a collection NFT, mint 3 child NFTs, verify all 3 as part of the collection, and assert collection_metadata.collection_details.size == 3.',
      }),
      makeTask("p6w5d5", 6, 25, 5, "Update Authority Controls", "Manage update authority delegation and freeze authority for NFT utilities.", 4, "coding", { url: "https://developers.metaplex.com/token-metadata", label: "Token Metadata", platform: "custom" }, {
        keyPoints: [
          'update_authority can update metadata URI, name, and creators',
          'Transferring update_authority to null makes NFT permanently immutable',
          'Delegating update_authority to a program enables on-chain trait evolution',
          'Freeze authority locks the token account — used for staking without custody',
          'Thaw + freeze cycle: stake NFT by freezing, unstake by thawing',
        ],
        codeExample: `// NFT staking via freeze authority
pub fn stake_nft(ctx: Context<StakeNft>) -> Result<()> {
    // Transfer update authority to staking program PDA
    // Freeze the token account (token cannot be transferred while frozen)
    let freeze_ix = spl_token::instruction::freeze_account(
        ctx.accounts.token_program.key,
        ctx.accounts.nft_token_account.key,
        ctx.accounts.nft_mint.key,
        ctx.accounts.freeze_authority.key, // staking program PDA
        &[],
    )?;
    anchor_lang::solana_program::program::invoke_signed(
        &freeze_ix,
        &[
            ctx.accounts.nft_token_account.to_account_info(),
            ctx.accounts.nft_mint.to_account_info(),
            ctx.accounts.freeze_authority.to_account_info(),
        ],
        &[&[b"stake-authority", &[ctx.accounts.config.bump]]],
    )?;

    // Record staking start time for reward calculation
    ctx.accounts.stake_record.staked_at = Clock::get()?.unix_timestamp;
    ctx.accounts.stake_record.mint = ctx.accounts.nft_mint.key();
    Ok(())
}`,
        commonMistakes: [
          'Using token custody (transferring NFT to program) instead of freeze — custody is risky; freeze lets user keep the NFT',
          'Forgetting to thaw before any metadata update — frozen accounts reject all instructions including metadata updates',
        ],
        practicePrompt: 'Implement stake_nft (freeze) and unstake_nft (thaw + calculate_rewards). Rewards = 10 tokens per day staked. Write test advancing clock 7 days and claiming 70 tokens.',
      }),
      makeTask("p6w5d6", 6, 25, 6, "Burn NFT Instruction", "Implement NFT burn with metadata cleanup to reclaim rent.", 4, "coding", { url: "https://developers.metaplex.com/token-metadata/burn", label: "Token Metadata Burn", platform: "custom" }, {
        keyPoints: [
          'Burning an NFT requires: burning the token, closing token account, closing metadata, closing edition',
          'Use Metaplex BurnBuilder to handle all accounts correctly in one CPI',
          'Closing metadata/edition accounts returns ~0.015 SOL in rent to the user',
          'Must verify the signer is the NFT owner or has burn_delegate authority',
          'Collection size should be decremented when a collection NFT is burned',
        ],
        codeExample: `use mpl_token_metadata::instruction::builders::BurnBuilder;

pub fn burn_nft(ctx: Context<BurnNft>) -> Result<()> {
    let burn_ix = BurnBuilder::new()
        .authority(ctx.accounts.owner.key())
        .token_owner(ctx.accounts.owner.key())
        .token(ctx.accounts.token_account.key())
        .mint(ctx.accounts.mint.key())
        .metadata(ctx.accounts.metadata.key())
        .edition(ctx.accounts.edition.key())
        .spl_token_program(spl_token::id())
        .build(mpl_token_metadata::instruction::BurnArgs::V1 { amount: 1 })
        .unwrap()
        .instruction();

    invoke(&burn_ix, &[
        ctx.accounts.owner.to_account_info(),
        ctx.accounts.token_account.to_account_info(),
        ctx.accounts.mint.to_account_info(),
        ctx.accounts.metadata.to_account_info(),
        ctx.accounts.edition.to_account_info(),
    ])?;
    Ok(())
}`,
        commonMistakes: [
          'Only burning the SPL token and not the metadata/edition accounts — wastes ~0.015 SOL in rent that should be returned',
          'Not checking that the signer owns the NFT — any caller could burn someone else\'s NFT',
        ],
        practicePrompt: 'Mint an NFT, record the owner SOL balance, burn the NFT, assert owner balance increased by ~0.015 SOL (rent reclaim). Assert token account no longer exists.',
      }),
      makeTask("p6w5d7", 6, 25, 7, "NFT Marketplace Listing (Preview)", "Build a basic listing mechanism using PDA escrow to prepare for Week 26.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Developers", platform: "custom" }, {
        keyPoints: [
          'Listing PDA stores: seller, mint, price, expiry, and list timestamp',
          'Escrow: NFT is transferred from seller\'s ATA to a PDA-controlled ATA on listing',
          'Cancel listing: return NFT to seller, close listing account, recover rent',
          'Purchase: buyer pays seller, NFT transferred to buyer, listing account closed',
          'List + buy must be atomic — use single transaction for buy to prevent race conditions',
        ],
        codeExample: `#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub mint: Pubkey,
    pub price: u64,        // in lamports
    pub listed_at: i64,
    pub expiry: i64,       // 0 = never expires
    pub bump: u8,
    pub escrow_bump: u8,
}

impl Listing {
    pub const LEN: usize = 8 + 32 + 32 + 8 + 8 + 8 + 1 + 1;
}

pub fn list_nft(ctx: Context<ListNft>, price: u64, expiry: i64) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    listing.seller = ctx.accounts.seller.key();
    listing.mint = ctx.accounts.mint.key();
    listing.price = price;
    listing.listed_at = Clock::get()?.unix_timestamp;
    listing.expiry = expiry;
    listing.bump = ctx.bumps.listing;

    // Transfer NFT to escrow ATA (owned by listing PDA)
    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), Transfer {
            from: ctx.accounts.seller_ata.to_account_info(),
            to: ctx.accounts.escrow_ata.to_account_info(),
            authority: ctx.accounts.seller.to_account_info(),
        }),
        1,
    )?;
    Ok(())
}`,
        commonMistakes: [
          'Storing NFT in seller\'s ATA instead of escrow — seller can transfer it out and listing becomes a trap',
          'Not enforcing expiry on purchase — expired listings should reject buys even if price matches',
        ],
        practicePrompt: 'Implement cancel_listing: verify signer == listing.seller, transfer NFT back from escrow to seller, close listing account and escrow ATA, return rent to seller.',
      }),
    ],
  },

  // Week 26 — NFT Marketplace
  {
    weekNumber: 26,
    phaseWeek: 6,
    phaseId: 6,
    title: "NFT Marketplace: Listing & Trading",
    goal: "Build NFT marketplace with listing, bidding, and royalty distribution.",
    isCompleted: false,
    tasks: [
      makeTask("p6w6d1", 6, 26, 1, "List NFT for Sale (PDA Escrow)", "Build the complete list instruction with PDA-controlled escrow account.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'Escrow ATA is derived: seeds = ["escrow", listing.key()] — owned by listing PDA',
          'Listing PDA seeds: ["listing", seller.key(), mint.key()] — unique per seller/NFT pair',
          'Delegating instead of transferring: seller keeps token but delegates to listing PDA',
          'Transfer-to-escrow approach is simpler and avoids delegate complexity',
          'Marketplace authority account stores: fee_bps, treasury, and governance key',
        ],
        codeExample: `#[derive(Accounts)]
pub struct ListNft<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    pub mint: Account<'info, Mint>,
    #[account(
        init, payer = seller, space = Listing::LEN,
        seeds = [b"listing", seller.key().as_ref(), mint.key().as_ref()],
        bump
    )]
    pub listing: Account<'info, Listing>,
    #[account(
        mut,
        constraint = seller_ata.owner == seller.key(),
        constraint = seller_ata.mint == mint.key(),
        constraint = seller_ata.amount == 1 @ ErrorCode::NotNftOwner
    )]
    pub seller_ata: Account<'info, TokenAccount>,
    #[account(
        init, payer = seller,
        associated_token::mint = mint,
        associated_token::authority = listing,
    )]
    pub escrow_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}`,
        commonMistakes: [
          'Not constraining seller_ata.amount == 1 before listing — seller could list an empty ATA',
          'Using delegate instead of escrow — delegate can be revoked by seller after listing, breaking purchases',
        ],
        practicePrompt: 'Implement the full list_nft instruction. Write two tests: (1) list succeeds, escrow has 1 token. (2) list fails when seller does not own the NFT.',
      }),
      makeTask("p6w6d2", 6, 26, 2, "Cancel Listing", "Implement cancel_listing with NFT return and rent recovery.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'Only the original seller can cancel — verify listing.seller == signer.key()',
          'Close escrow_ata: transfer NFT back, then close the token account to recover rent',
          'Close listing account: set its lamports to 0, transfer to seller',
          'Use Anchor #[account(mut, close = seller)] to handle closing automatically',
          'After cancel, listing PDA is gone — next list creates a new one',
        ],
        codeExample: `#[derive(Accounts)]
pub struct CancelListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(
        mut,
        close = seller,   // auto-close and return lamports to seller
        seeds = [b"listing", seller.key().as_ref(), listing.mint.as_ref()],
        bump = listing.bump,
        constraint = listing.seller == seller.key() @ ErrorCode::Unauthorized
    )]
    pub listing: Account<'info, Listing>,
    #[account(mut, constraint = escrow_ata.owner == listing.key())]
    pub escrow_ata: Account<'info, TokenAccount>,
    #[account(mut, constraint = seller_ata.owner == seller.key())]
    pub seller_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn cancel_listing(ctx: Context<CancelListing>) -> Result<()> {
    let listing = &ctx.accounts.listing;
    let seeds = &[
        b"listing", listing.seller.as_ref(), listing.mint.as_ref(),
        &[listing.bump],
    ];
    // Transfer NFT back to seller using listing PDA as signer
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.escrow_ata.to_account_info(),
                to: ctx.accounts.seller_ata.to_account_info(),
                authority: ctx.accounts.listing.to_account_info(),
            },
            &[seeds],
        ),
        1,
    )?;
    // close = seller in the constraint handles listing account closing
    Ok(())
}`,
        commonMistakes: [
          'Forgetting to close the escrow ATA — leaves a rent-funded empty token account on-chain forever',
          'Not using new_with_signer for the transfer CPI — listing PDA must sign the transfer from escrow',
        ],
        practicePrompt: 'Write a test: list NFT, cancel listing. Assert seller has NFT back, escrow ATA is gone, listing account is gone, seller balance increased (rent returned).',
      }),
      makeTask("p6w6d3", 6, 26, 3, "Execute Purchase (CPI to Token)", "Implement the buy instruction: pay seller, transfer NFT, split fees and royalties.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'Buy flow: buyer pays price → split into: royalty (5%) + marketplace fee (2%) + seller proceeds',
          'system_program::transfer for SOL payments from buyer to each recipient',
          'NFT transfer: escrow_ata → buyer_ata, signed by listing PDA',
          'Read royalty from metadata.data.seller_fee_basis_points',
          'Close listing and escrow accounts after successful purchase',
        ],
        codeExample: `pub fn buy_nft(ctx: Context<BuyNft>) -> Result<()> {
    let listing = &ctx.accounts.listing;
    let price = listing.price;

    // Read royalty from metadata
    let metadata = Metadata::from_account_info(&ctx.accounts.metadata)?;
    let royalty_bps = metadata.data.seller_fee_basis_points as u64;
    let marketplace_fee_bps = ctx.accounts.marketplace_config.fee_bps;

    let royalty_amount = price * royalty_bps / 10000;
    let marketplace_fee = price * marketplace_fee_bps / 10000;
    let seller_proceeds = price - royalty_amount - marketplace_fee;

    // Transfer SOL: buyer -> creator (royalty)
    system_program::transfer(
        CpiContext::new(ctx.accounts.system_program.to_account_info(), Transfer {
            from: ctx.accounts.buyer.to_account_info(),
            to: ctx.accounts.creator.to_account_info(),
        }),
        royalty_amount,
    )?;
    // buyer -> marketplace treasury
    // buyer -> seller
    // Transfer NFT: escrow -> buyer_ata (using listing PDA signer)
    // Close listing + escrow accounts
    Ok(())
}`,
        commonMistakes: [
          'Paying royalty from seller_proceeds instead of from total price — double-charges the seller',
          'Not reading royalty from on-chain metadata — hardcoding royalty allows future metadata changes to be bypassed',
        ],
        practicePrompt: 'Write a test: list for 1 SOL, buy. Assert seller got ~0.93 SOL, creator got ~0.05, marketplace got ~0.02. Assert buyer has NFT and listing is closed.',
      }),
      makeTask("p6w6d4", 6, 26, 4, "Auction: English Auction Logic", "Implement an English (ascending price) auction with bidding and auto-extension.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'Auction account: seller, mint, start_price, current_bid, highest_bidder, end_time',
          'New bid must exceed current_bid by min_increment (e.g. 5%)',
          'Auto-extension: if bid arrives within 10 minutes of end, extend end_time by 10 minutes',
          'Previous bidder must be refunded immediately on each new bid',
          'Settle auction: transfer NFT to winner, SOL to seller, close auction account',
        ],
        codeExample: `#[account]
pub struct Auction {
    pub seller: Pubkey,
    pub mint: Pubkey,
    pub start_price: u64,
    pub current_bid: u64,
    pub highest_bidder: Pubkey,
    pub end_time: i64,
    pub min_increment_bps: u64, // e.g. 500 = 5%
    pub bump: u8,
}

pub fn place_bid(ctx: Context<PlaceBid>, amount: u64) -> Result<()> {
    let auction = &mut ctx.accounts.auction;
    let now = Clock::get()?.unix_timestamp;
    require!(now < auction.end_time, ErrorCode::AuctionEnded);

    let min_bid = auction.current_bid
        + auction.current_bid * auction.min_increment_bps / 10000;
    require!(amount >= min_bid, ErrorCode::BidTooLow);

    // Auto-extend if within 10 minutes of end
    if auction.end_time - now < 600 {
        auction.end_time += 600;
    }

    // Refund previous bidder
    if auction.current_bid > 0 {
        **ctx.accounts.previous_bidder.try_borrow_mut_lamports()? +=
            auction.current_bid;
        **ctx.accounts.auction.to_account_info().try_borrow_mut_lamports()? -=
            auction.current_bid;
    }

    auction.current_bid = amount;
    auction.highest_bidder = ctx.accounts.bidder.key();
    Ok(())
}`,
        commonMistakes: [
          'Holding all bids in escrow simultaneously — requires tracking all bidders; immediate refund is simpler and safer',
          'Not implementing anti-sniping (auto-extension) — auctions get sniped in the last second without it',
        ],
        practicePrompt: 'Write auction tests: (1) place bid, verify previous bidder refunded. (2) Bid within 10 min of end, verify end_time extended. (3) settle after end_time, verify winner gets NFT.',
      }),
      makeTask("p6w6d5", 6, 26, 5, "Bid & Cancel-Bid Instructions", "Implement offer/bid system where buyers bid on non-listed NFTs.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'Offer = bid on any NFT regardless of listing status — stored in Offer PDA',
          'Offer PDA: seeds = ["offer", buyer.key(), mint.key()]',
          'SOL escrowed in Offer account when offer is placed',
          'Cancel offer: close Offer PDA, return escrowed SOL to buyer',
          'Accept offer: seller transfers NFT, buyer\'s escrow SOL released to seller',
        ],
        codeExample: `#[account]
pub struct Offer {
    pub buyer: Pubkey,
    pub mint: Pubkey,
    pub amount: u64,
    pub expiry: i64,
    pub bump: u8,
}

pub fn make_offer(ctx: Context<MakeOffer>, amount: u64, expiry: i64) -> Result<()> {
    let offer = &mut ctx.accounts.offer;
    offer.buyer = ctx.accounts.buyer.key();
    offer.mint = ctx.accounts.mint.key();
    offer.amount = amount;
    offer.expiry = expiry;
    offer.bump = ctx.bumps.offer;

    // Escrow buyer's SOL into offer account (via lamport transfer)
    let rent = Rent::get()?.minimum_balance(Offer::LEN);
    **ctx.accounts.buyer.try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.offer.to_account_info().try_borrow_mut_lamports()? += amount;
    Ok(())
}

pub fn cancel_offer(ctx: Context<CancelOffer>) -> Result<()> {
    let offer = &ctx.accounts.offer;
    require!(offer.buyer == ctx.accounts.buyer.key(), ErrorCode::Unauthorized);
    // Anchor close = buyer returns lamports + rent
    Ok(())
}`,
        commonMistakes: [
          'Not checking offer expiry on accept — seller can accept a very old offer at the original price even if market moved',
          'Storing SOL in a separate vault account instead of the Offer PDA itself — unnecessary complexity',
        ],
        practicePrompt: 'Implement accept_offer: verify NFT ownership, transfer NFT to buyer, pay seller from offer escrow (minus fees/royalties), close offer account.',
      }),
      makeTask("p6w6d6", 6, 26, 6, "Royalty Split on Sale", "Implement automatic royalty distribution to multiple creators on every sale.", 4, "coding", { url: "https://developers.metaplex.com/token-metadata", label: "Token Metadata Docs", platform: "custom" }, {
        keyPoints: [
          'Metaplex metadata.creators is Vec<Creator> with share (0-100, must sum to 100)',
          'Verified creators: only those with verified=true should receive royalties',
          'Compute each creator\'s cut: creator_amount = total_royalty * creator.share / 100',
          'Require creator ATAs as remaining_accounts — iterate and transfer to each',
          'If creator not verified, their share goes to the collection authority',
        ],
        codeExample: `pub fn distribute_royalties<'info>(
    metadata_account: &AccountInfo<'info>,
    remaining_accounts: &[AccountInfo<'info>],
    total_royalty: u64,
    system_program: &AccountInfo<'info>,
    payer: &AccountInfo<'info>,
) -> Result<()> {
    let metadata = Metadata::from_account_info(metadata_account)?;
    let creators = metadata.data.creators
        .ok_or(error!(ErrorCode::NoCreators))?;

    let verified_creators: Vec<_> = creators.iter()
        .filter(|c| c.verified)
        .collect();

    let total_share: u8 = verified_creators.iter().map(|c| c.share).sum();

    for creator in &verified_creators {
        let amount = (total_royalty as u128)
            .checked_mul(creator.share as u128).unwrap()
            / total_share as u128;

        // Find matching account in remaining_accounts
        let creator_account = remaining_accounts.iter()
            .find(|a| a.key() == creator.address)
            .ok_or(error!(ErrorCode::MissingCreatorAccount))?;

        system_program::transfer(
            CpiContext::new(system_program.clone(), Transfer {
                from: payer.clone(),
                to: creator_account.clone(),
            }),
            amount as u64,
        )?;
    }
    Ok(())
}`,
        commonMistakes: [
          'Distributing royalties to unverified creators — they could be spoofed; only verified=true creators should receive',
          'Not handling the case where total_share != 100 (some creators not verified) — leads to underpaying royalties',
        ],
        practicePrompt: 'Create an NFT with 2 creators: 70% and 30% shares. Sell for 1 SOL with 10% royalty. Assert creator1 gets 0.07 SOL and creator2 gets 0.03 SOL.',
      }),
      makeTask("p6w6d7", 6, 26, 7, "Marketplace Fee Collection", "Implement marketplace fee configuration, collection, and treasury management.", 4, "coding", { url: "https://developers.metaplex.com/", label: "Metaplex Docs", platform: "custom" }, {
        keyPoints: [
          'MarketplaceConfig PDA: fee_bps, treasury, authority, total_volume, total_fees',
          'Authority can update fee_bps (bounded: 0-500 bps max, no rug-pull via fee change)',
          'Track total_volume and total_fees for analytics and reporting',
          'Allow sellers to delist expired listings in bulk (housekeeping instruction)',
          'Emit SaleEvent with full details for indexers: buyer, seller, mint, price, fees',
        ],
        codeExample: `#[account]
pub struct MarketplaceConfig {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub fee_bps: u64,         // marketplace fee, e.g. 200 = 2%
    pub total_volume: u128,   // cumulative SOL traded
    pub total_fees: u128,     // cumulative fees collected
    pub bump: u8,
}

pub fn update_fee(ctx: Context<UpdateFee>, new_fee_bps: u64) -> Result<()> {
    require!(new_fee_bps <= 500, ErrorCode::FeeTooHigh); // max 5%
    require!(
        ctx.accounts.authority.key() == ctx.accounts.config.authority,
        ErrorCode::Unauthorized
    );
    ctx.accounts.config.fee_bps = new_fee_bps;
    Ok(())
}

#[event]
pub struct SaleEvent {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub mint: Pubkey,
    pub price: u64,
    pub royalty: u64,
    pub marketplace_fee: u64,
    pub seller_proceeds: u64,
    pub timestamp: i64,
}`,
        commonMistakes: [
          'Not capping fee_bps — authority could raise fees to 100% and take all sale proceeds',
          'Not emitting SaleEvent — frontends and indexers cannot display transaction history without events',
        ],
        practicePrompt: 'Build a complete test: initialize marketplace config, list NFT, buy NFT, assert SaleEvent emitted with correct amounts, assert treasury balance increased by fee amount.',
      }),
    ],
  },

  // Week 27 — Security Auditing
  {
    weekNumber: 27,
    phaseWeek: 7,
    phaseId: 6,
    title: "Security Auditing: Vulnerability Patterns",
    goal: "Learn common Solana smart contract vulnerabilities and how to prevent them.",
    isCompleted: false,
    tasks: [
      makeTask("p6w7d1", 6, 27, 1, "Owner Checks & Account Validation", "Understand account owner spoofing attacks and how Anchor prevents them.", 4, "reading", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks Reference", platform: "github" }, {
        keyPoints: [
          'Solana does not enforce that an account passed to your program is the type you expect',
          'Account owner: account.owner must equal the program ID that created it',
          'Anchor\'s Account<\'info, T> deserializer checks the discriminator (8-byte prefix)',
          'UncheckedAccount (AccountInfo) bypasses all checks — use only when required',
          'AccountLoader<\'info, T> for zero-copy large accounts also checks owner',
        ],
        codeExample: `// VULNERABLE: no owner check
pub fn vulnerable_withdraw(ctx: Context<VulnerableWithdraw>) -> Result<()> {
    let user_data = UserData::try_from_slice(&ctx.accounts.user_data.data.borrow())?;
    // attacker passes a crafted account with same layout but different owner
    transfer_tokens(&user_data.amount)?;
    Ok(())
}

// SECURE: Anchor Account<> checks owner + discriminator
#[derive(Accounts)]
pub struct SecureWithdraw<'info> {
    #[account(
        has_one = owner,   // checks user_data.owner == owner.key()
        constraint = user_data.balance >= amount @ ErrorCode::InsufficientBalance
    )]
    pub user_data: Account<'info, UserData>,  // ✓ Anchor checks: owner == program_id
    pub owner: Signer<'info>,                 // ✓ must sign
}

// Manual owner check when using AccountInfo directly:
pub fn check_account_owner(account: &AccountInfo, expected_owner: &Pubkey) -> Result<()> {
    require!(
        account.owner == expected_owner,
        ErrorCode::InvalidAccountOwner
    );
    Ok(())
}`,
        commonMistakes: [
          'Using AccountInfo directly without checking .owner — an attacker can forge any layout',
          'Trusting account data without Anchor deserialization — discriminator check prevents type confusion',
        ],
        practicePrompt: 'Find the Sealevel Attacks repository, clone it, and run the "owner check" attack example. Document what the attack does and how the fix prevents it.',
      }),
      makeTask("p6w7d2", 6, 27, 2, "Signer Authorization Patterns", "Master signer checks to prevent unauthorized instruction execution.", 4, "reading", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks", platform: "github" }, {
        keyPoints: [
          'Signer<\'info> in Anchor context ensures is_signer == true for the account',
          'has_one constraint: checks that a stored pubkey matches the signer',
          'Privilege escalation: never derive admin authority from user-controlled input',
          'Program-signed CPIs: use invoke_signed with PDA seeds, not user-provided authority',
          'Multi-sig authority: require M-of-N signers using a dedicated multisig account',
        ],
        codeExample: `// VULNERABLE: missing signer check on authority
#[derive(Accounts)]
pub struct VulnerableAdminAction<'info> {
    pub config: Account<'info, Config>,
    pub authority: AccountInfo<'info>,  // ← NOT a Signer — anyone can pass any pubkey
}

// SECURE: enforce signer and has_one
#[derive(Accounts)]
pub struct SecureAdminAction<'info> {
    #[account(
        mut,
        has_one = authority @ ErrorCode::Unauthorized
    )]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,   // ✓ must sign the transaction
}

// SECURE: PDA authority (program-signed, no user key needed)
pub fn program_signed_cpi(ctx: Context<ProgramSigned>) -> Result<()> {
    let seeds = &[b"vault-authority", &[ctx.accounts.config.vault_bump]];
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer { from: ctx.accounts.vault.to_account_info(), /* ... */ },
            &[seeds],
        ),
        ctx.accounts.vault.amount,
    )?;
    Ok(())
}`,
        commonMistakes: [
          'Using AccountInfo instead of Signer<\'info> for admin accounts — is_signer is never checked',
          'Checking authority pubkey but not signer flag: require!(ctx.accounts.authority.key() == config.authority) is NOT enough without Signer<>',
        ],
        practicePrompt: 'Write a vulnerable program with a missing signer check. Write an exploit test that calls it with a non-signer authority. Then add the fix and verify the exploit fails.',
      }),
      makeTask("p6w7d3", 6, 27, 3, "PDA Seed Manipulation Attacks", "Understand and prevent PDA seed collision and bump manipulation attacks.", 4, "reading", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks", platform: "github" }, {
        keyPoints: [
          'PDA bump grinding: attacker could find seeds that collide with a valid PDA',
          'Canonical bump: always use find_program_address (not create_program_address) — returns canonical bump',
          'Store the bump and verify: seeds = [...known seeds..., &[stored_bump]] in constraints',
          'Seed uniqueness: include user pubkey in seeds to prevent cross-user PDA sharing',
          'PDA account closing: close to system_program (not user) to prevent re-initialization',
        ],
        codeExample: `// VULNERABLE: not storing bump, recomputing each time
pub fn vulnerable_transfer(ctx: Context<VulnerableTransfer>) -> Result<()> {
    // find_program_address is expensive (O(255) hash attempts)
    // and an attacker could front-run with a different bump
    let (_, _bump) = Pubkey::find_program_address(
        &[b"user-vault", ctx.accounts.user.key().as_ref()],
        ctx.program_id,
    );
    // ...
    Ok(())
}

// SECURE: store bump in account, verify in constraint
#[account]
pub struct UserVault {
    pub owner: Pubkey,
    pub bump: u8,  // store canonical bump
}

#[derive(Accounts)]
pub struct SecureTransfer<'info> {
    #[account(
        mut,
        seeds = [b"user-vault", user.key().as_ref()],
        bump = vault.bump,  // ✓ verifies stored canonical bump
        has_one = owner @ ErrorCode::Unauthorized,
    )]
    pub vault: Account<'info, UserVault>,
    pub owner: Signer<'info>,
    pub user: AccountInfo<'info>,
}`,
        commonMistakes: [
          'Not storing the canonical bump — recomputation is expensive (wastes CUs) and can use non-canonical bump',
          'Using same PDA seeds for different account types — two programs with same seeds produce same PDA, causing confusion',
        ],
        practicePrompt: 'Write a program with unsafe bump usage. Create an exploit test. Fix it by storing bump in account struct and using bump = account.bump constraint.',
      }),
      makeTask("p6w7d4", 6, 27, 4, "Integer Overflow/Underflow Prevention", "Audit all arithmetic operations for overflow vulnerabilities and fix them.", 4, "coding", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks", platform: "github" }, {
        keyPoints: [
          'In Rust release builds, overflow wraps (u64 wraps at u64::MAX + 1 → 0)',
          'checked_add/sub/mul/div: returns Option<T> — require! on None',
          'saturating_add/sub: clamps at min/max — safe for counters, wrong for financial math',
          'Solana\'s u64 max: 18,446,744,073,709,551,615 (18.4 quintillion lamports = 18.4B SOL)',
          'Use u128 for intermediate calculations that multiply two u64 values',
        ],
        codeExample: `// VULNERABLE: silent overflow in release build
pub fn vulnerable_deposit(pool: &mut Pool, amount: u64) -> Result<()> {
    pool.total_deposits += amount;  // WRAPS in release mode!
    Ok(())
}

// SECURE: checked arithmetic
pub fn secure_deposit(pool: &mut Pool, amount: u64) -> Result<()> {
    pool.total_deposits = pool.total_deposits
        .checked_add(amount)
        .ok_or(error!(ErrorCode::Overflow))?;
    Ok(())
}

// SECURE: u128 for intermediate mul
pub fn secure_fee_calc(amount: u64, fee_bps: u64) -> Result<u64> {
    let fee = (amount as u128)
        .checked_mul(fee_bps as u128)
        .ok_or(error!(ErrorCode::Overflow))?
        .checked_div(10000)
        .ok_or(error!(ErrorCode::DivisionByZero))?;
    u64::try_from(fee).map_err(|_| error!(ErrorCode::Overflow))
}

// VULNERABLE: underflow
pub fn vulnerable_withdraw(pool: &mut Pool, amount: u64) -> Result<()> {
    pool.total_deposits -= amount;  // PANIC in debug, WRAP in release
    Ok(())
}

// SECURE: require before subtract
pub fn secure_withdraw(pool: &mut Pool, amount: u64) -> Result<()> {
    require!(pool.total_deposits >= amount, ErrorCode::InsufficientFunds);
    pool.total_deposits -= amount; // safe: checked above
    Ok(())
}`,
        commonMistakes: [
          'Testing only in debug mode — overflow panics in debug but silently wraps in release (where you deploy)',
          'Using saturating_sub for financial math — balance.saturating_sub(1_000_000_000) returns 0 if balance is 0, hiding a bug',
        ],
        practicePrompt: 'Audit your AMM or Lending program: search for every arithmetic operation. Replace all with checked_ variants. Run cargo test -- --release to test in release mode.',
      }),
      makeTask("p6w7d5", 6, 27, 5, "Reentrancy in Multi-Instruction Transactions", "Understand Solana\'s account locking and how multi-instruction attacks work.", 4, "reading", { url: "https://github.com/coral-xyz/sealevel-attacks", label: "Sealevel Attacks", platform: "github" }, {
        keyPoints: [
          'Solana prevents traditional reentrancy: same account cannot be locked twice in one instruction',
          'Multi-instruction reentrancy: instruction 1 modifies state, instruction 2 in same tx exploits stale state',
          'Check-effects-interactions pattern: update state BEFORE making CPI calls',
          'Cross-program reentrancy: program A calls B, B calls A — still possible',
          'load_instruction_at_checked: inspect other instructions in tx to detect malicious composition',
        ],
        codeExample: `// VULNERABLE: state update AFTER CPI (classic reentrancy order)
pub fn vulnerable_withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    // 1. Transfer first (effects before checks)
    token::transfer(cpi_ctx, amount)?;
    // 2. Update state AFTER — if reentered, old balance is still there
    ctx.accounts.user.balance -= amount;  // ← too late
    Ok(())
}

// SECURE: Check-Effects-Interactions pattern
pub fn secure_withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let user = &mut ctx.accounts.user;
    // 1. CHECK: verify precondition
    require!(user.balance >= amount, ErrorCode::InsufficientBalance);
    // 2. EFFECTS: update state FIRST
    user.balance = user.balance.checked_sub(amount)
        .ok_or(ErrorCode::Underflow)?;
    // 3. INTERACTIONS: CPI after state is committed
    token::transfer(
        CpiContext::new(ctx.accounts.token_program.to_account_info(), Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.user_wallet.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        }),
        amount,
    )?;
    Ok(())
}`,
        commonMistakes: [
          'Assuming Solana is immune to reentrancy — multi-CPI reentrancy is real and has been exploited',
          'Not following Check-Effects-Interactions order — always update state before making external calls',
        ],
        practicePrompt: 'Write a multi-CPI reentrancy example program. Document the attack flow. Add the CEI fix and verify the attack path fails.',
      }),
      makeTask("p6w7d6", 6, 27, 6, "Anchor Constraint Audit Checklist", "Systematically audit Anchor #[derive(Accounts)] structs for missing constraints.", 4, "exercise", { url: "https://docs.coral-xyz.com/", label: "Anchor Docs", platform: "docs" }, {
        keyPoints: [
          'Every account needs: mut (if modified), owner check (via Account<>), signer check (if required)',
          'Relationship constraints: has_one validates foreign keys in account structs',
          'PDA constraints: seeds + bump must always be specified on PDA accounts',
          'Initialization guard: init_if_needed requires careful re-initialization attack analysis',
          'Remaining accounts: cannot use Anchor macros — must validate every account manually',
        ],
        codeExample: `// AUDIT TEMPLATE: go through each field systematically

#[derive(Accounts)]
pub struct AuditedInstruction<'info> {
    // ✓ mut: needs modification
    // ✓ seeds + bump: PDA verified
    // ✓ has_one = authority: checks stored authority matches signer
    // ✓ constraint: custom business logic
    #[account(
        mut,
        seeds = [b"pool", pool.token_a_mint.as_ref()],
        bump = pool.bump,
        has_one = authority @ ErrorCode::Unauthorized,
        constraint = pool.total_deposits > 0 @ ErrorCode::EmptyPool
    )]
    pub pool: Account<'info, Pool>,

    // ✓ Signer: must sign transaction
    pub authority: Signer<'info>,

    // ✓ mut + specific vault: not just any token account
    #[account(
        mut,
        address = pool.token_a_vault @ ErrorCode::WrongVault  // exact address check
    )]
    pub vault: Account<'info, TokenAccount>,

    // ✓ Program IDs verified by Anchor type system
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

// Remaining accounts pattern (for variable-length royalty recipients):
pub fn validate_remaining_accounts(
    remaining_accounts: &[AccountInfo],
    expected_owners: &[Pubkey],
) -> Result<()> {
    for (account, expected) in remaining_accounts.iter().zip(expected_owners) {
        require!(account.key() == expected, ErrorCode::UnexpectedAccount);
        require!(account.is_writable, ErrorCode::AccountNotWritable);
    }
    Ok(())
}`,
        commonMistakes: [
          'Using address = config.authority for a Signer — address check alone does not verify signing; use has_one + Signer<>',
          'Skipping audit of remaining_accounts — every manually validated account is a potential vulnerability',
        ],
        practicePrompt: 'Pick your most complex instruction from this phase. Write a security audit report: list every account, its constraints, and whether each constraint is necessary and sufficient.',
      }),
      makeTask("p6w7d7", 6, 27, 7, "Full Program Audit Walkthrough", "Conduct a structured security audit of your Phase 6 programs.", 4, "exercise", { url: "https://www.sec3.dev/blog/how-to-audit-solana-smart-contracts-part-1", label: "sec3 — Solana Security Audit Guide", platform: "custom" }, {
        keyPoints: [
          'Use cargo-audit to check dependencies for known CVEs',
          'Run anchor build --verifiable for reproducible builds',
          'Automated tools: Soteria, xray (Anchor-specific linter), cargo clippy',
          'Manual review: focus on account validation, arithmetic, CPI targets, and access control',
          'Write a threat model: who are the adversaries, what do they want, what can they do?',
        ],
        codeExample: `# Security audit workflow for Solana programs

# 1. Dependency audit
cargo audit

# 2. Lint with clippy (all warnings are potential bugs)
cargo clippy -- -D warnings

# 3. Check for common patterns with grep
grep -r "unchecked" programs/ --include="*.rs"
grep -r "AccountInfo" programs/ --include="*.rs" | grep -v "//.*AccountInfo"
grep -r "invoke(" programs/ --include="*.rs"  # manual CPI without program check
grep -r "+=" programs/ --include="*.rs"        # potential unchecked addition
grep -r "-=" programs/ --include="*.rs"        # potential unchecked subtraction

# 4. Build in release mode and test
cargo test --release

# 5. Review each instruction against checklist:
# [ ] Account owner checks
# [ ] Signer authorization
# [ ] PDA bump stored and verified
# [ ] All arithmetic uses checked_ operations
# [ ] CEI order in every instruction
# [ ] No arbitrary CPI targets
# [ ] No init_if_needed without re-init protection`,
        commonMistakes: [
          'Auditing only business logic while ignoring dependency vulnerabilities — cargo audit catches known CVEs in crates',
          'Not testing exploit paths explicitly — document each vulnerability type and write a test that exploits the unfixed version',
        ],
        practicePrompt: 'Run the full audit checklist on your AMM or Lending protocol. Document every finding. Fix all HIGH severity issues. Write exploit tests for each vulnerability you found.',
      }),
    ],
  },

  // Week 28 — Production Hardening
  {
    weekNumber: 28,
    phaseWeek: 8,
    phaseId: 6,
    title: "Production Hardening & Phase 6 Capstone",
    goal: "Harden your programs for production and build a full DeFi protocol.",
    isCompleted: false,
    tasks: [
      makeTask("p6w8d1", 6, 28, 1, "Upgrade Authority Best Practices", "Design a secure upgrade strategy using program upgrade authority and timelocks.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Programs are upgradeable by default — upgrade_authority can deploy new code',
          'Immutable option: solana program set-upgrade-authority --final (irreversible)',
          'Multisig upgrade authority: use Squads Protocol or SPL Governance',
          'Timelock upgrades: propose upgrade, wait 48h, then execute — gives community time to react',
          'Buffer account: stage new code to buffer before committing to reduce downtime',
        ],
        codeExample: `// Upgrade authority management with Squads Protocol
// This is TypeScript for the CLI, not Anchor program code

import { Multisig } from "@sqds/multisig";

// 1. Create multisig (3-of-5 threshold)
const [multisigPda] = Multisig.pdas.multisig({ programId: SQUADS_PROGRAM_ID });

// 2. Transfer upgrade authority to multisig PDA
// $ solana program set-upgrade-authority <PROGRAM_ID> --new-upgrade-authority <MULTISIG_PDA>

// 3. To upgrade: create proposal
const txIndex = await Multisig.rpc.proposalCreate({ ... });

// 4. Collect 3 approvals from 5 signers
await Multisig.rpc.proposalApprove({ multisigPda, transactionIndex: txIndex, member: signer1 });

// 5. Execute after threshold met
await Multisig.rpc.vaultTransactionExecute({ ... });

// Timelock pattern: store proposal with execute_at = now + 48 * 3600
// All multisig members see the proposed code before it goes live`,
        commonMistakes: [
          'Keeping upgrade authority as a single hot wallet — one compromised key = protocol takeover',
          'Upgrading without a timelock — users and integrators need time to review and exit if they disagree',
        ],
        practicePrompt: 'Set up a 2-of-3 Squads multisig on devnet. Transfer your test program\'s upgrade authority to it. Deploy an upgrade and walk through the approval process.',
      }),
      makeTask("p6w8d2", 6, 28, 2, "Multi-sig for Admin Actions", "Implement on-chain governance for protocol parameters using multisig voting.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Admin actions: fee changes, pause, oracle changes, adding collateral types',
          'SPL Governance: full-featured DAO with token-weighted voting',
          'Simple multisig: M-of-N Pubkeys stored in a Config account, requires N signatures',
          'Timelock: admin proposals have mandatory delay before execution',
          'Emit ProposalCreated/Approved/Executed events for transparency',
        ],
        codeExample: `#[account]
pub struct Multisig {
    pub owners: Vec<Pubkey>,        // up to 10 signers
    pub threshold: u8,              // M of N required
    pub nonce: u64,                 // prevent replay
    pub bump: u8,
}

#[account]
pub struct Proposal {
    pub multisig: Pubkey,
    pub instruction_data: Vec<u8>, // serialized instruction
    pub approvals: Vec<Pubkey>,    // who has approved
    pub executed: bool,
    pub created_at: i64,
    pub execute_after: i64,        // timelock
    pub bump: u8,
}

pub fn approve_proposal(ctx: Context<ApproveProposal>) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let multisig = &ctx.accounts.multisig;

    require!(!proposal.executed, ErrorCode::AlreadyExecuted);
    require!(
        multisig.owners.contains(&ctx.accounts.approver.key()),
        ErrorCode::NotMultisigOwner
    );
    require!(
        !proposal.approvals.contains(&ctx.accounts.approver.key()),
        ErrorCode::AlreadyApproved
    );
    proposal.approvals.push(ctx.accounts.approver.key());
    Ok(())
}

pub fn execute_proposal(ctx: Context<ExecuteProposal>) -> Result<()> {
    let proposal = &ctx.accounts.proposal;
    let multisig = &ctx.accounts.multisig;
    require!(
        proposal.approvals.len() >= multisig.threshold as usize,
        ErrorCode::InsufficientApprovals
    );
    require!(
        Clock::get()?.unix_timestamp >= proposal.execute_after,
        ErrorCode::TimelockNotExpired
    );
    // execute the stored instruction via CPI
    Ok(())
}`,
        commonMistakes: [
          'Not checking for duplicate approvals — same owner could approve multiple times to reach threshold alone',
          'No timelock on execute — proposals should have mandatory delay for community review',
        ],
        practicePrompt: 'Implement a 3-key multisig with timelock for updating lending protocol fee. Write test: create proposal, get 3 approvals, wait for timelock, execute. Assert fee changed.',
      }),
      makeTask("p6w8d3", 6, 28, 3, "Compute Unit Budget Optimization", "Profile and optimize Solana program compute unit consumption.", 4, "coding", { url: "https://solana.com/docs/programs/limitations", label: "Solana Program Limitations", platform: "docs" }, {
        keyPoints: [
          'Default CU budget: 200,000 per instruction. Max: 1,400,000 per transaction',
          'Request higher budget: ComputeBudgetInstruction::set_compute_unit_limit(budget)',
          'Set priority fee: ComputeBudgetInstruction::set_compute_unit_price(micro_lamports)',
          'CU costs: deserialization ~1000 CUs, hash ~100 CUs, CPI ~1000 CUs base',
          'Use msg!() sparingly — logging is expensive; remove debug logs before production',
        ],
        codeExample: `// Client: request more CU and set priority fee
use solana_sdk::compute_budget::ComputeBudgetInstruction;

let budget_ix = ComputeBudgetInstruction::set_compute_unit_limit(400_000);
let priority_ix = ComputeBudgetInstruction::set_compute_unit_price(1000); // micro-lamports per CU

let tx = Transaction::new_signed_with_payer(
    &[budget_ix, priority_ix, your_instruction],
    Some(&payer.pubkey()),
    &[&payer],
    recent_blockhash,
);

// Program: measure CU usage
// Add to instruction handler:
let start_cu = sol_remaining_compute_units();
// ... do work ...
let used_cu = start_cu - sol_remaining_compute_units();
msg!("Used {} CUs", used_cu);  // only in devnet builds

// Optimization tips:
// 1. Load accounts in order of use (reduces cache misses)
// 2. Use zero-copy (AccountLoader) for large accounts
// 3. Minimize CPI depth (each CPI costs ~1000 CUs)
// 4. Pre-compute PDAs client-side (pass as accounts instead of re-deriving)
// 5. Remove msg!() and unused accounts in production`,
        commonMistakes: [
          'Not setting compute budget for complex instructions — default 200k fails for programs with multiple CPIs',
          'Leaving debug msg!() calls in production — each log costs CUs and reveals internals',
        ],
        practicePrompt: 'Measure CU usage of your swap instruction by adding sol_remaining_compute_units() logs. Optimize: remove debug logs, reorder account access. Target < 50k CUs for simple swap.',
      }),
      makeTask("p6w8d4", 6, 28, 4, "Error Handling & Logging", "Design a comprehensive error taxonomy and structured logging strategy.", 4, "coding", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Anchor error codes start at 6000 — use descriptive names with documentation',
          'Categorize errors: validation (wrong input), authorization (wrong signer), state (wrong state)',
          'Include error context: ErrorCode::InsufficientFunds.with_message("balance: {bal}")',
          'Client-side: parse anchor error codes from transaction logs to show user-friendly messages',
          'Structured events: prefer #[event] over msg!() for production monitoring',
        ],
        codeExample: `use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    // Validation errors (6000-6099)
    #[msg("Amount must be greater than zero")]
    ZeroAmount,
    #[msg("Amount exceeds maximum allowed")]
    AmountTooLarge,

    // Authorization errors (6100-6199)
    #[msg("Signer is not authorized to perform this action")]
    Unauthorized,
    #[msg("Account owner does not match expected program")]
    InvalidAccountOwner,

    // State errors (6200-6299)
    #[msg("Pool is currently paused")]
    PoolPaused,
    #[msg("Insufficient liquidity in pool")]
    InsufficientLiquidity,
    #[msg("Slippage tolerance exceeded")]
    SlippageTooHigh,

    // Math errors (6300-6399)
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Arithmetic underflow")]
    Underflow,
    #[msg("Division by zero")]
    DivisionByZero,
}

// Structured event logging (preferred over msg!())
#[event]
pub struct SwapEvent {
    pub user: Pubkey,
    pub amount_in: u64,
    pub amount_out: u64,
    pub fee: u64,
    pub pool: Pubkey,
    pub slot: u64,
}`,
        commonMistakes: [
          'Using panic!() or unwrap() in program code — always returns a generic error; use require!() with ErrorCode',
          'Generic error codes like ErrorCode::Err — makes debugging impossible; always use descriptive names',
        ],
        practicePrompt: 'Audit your Phase 6 programs: replace every unwrap() with checked operations + ErrorCode. Replace all msg!() with #[event] structs. Count the events your AMM emits per swap.',
      }),
      makeTask("p6w8d5", 6, 28, 5, "Devnet Deployment & Testing", "Deploy your DeFi suite to devnet and run live integration tests.", 4, "coding", { url: "https://www.anchor-lang.com/docs/deployment", label: "Anchor Deployment", platform: "docs" }, {
        keyPoints: [
          'anchor build --verifiable creates a reproducible build for source verification',
          'anchor deploy deploys to the cluster in Anchor.toml (devnet/mainnet)',
          'solana program show <PROGRAM_ID> confirms deployment and displays upgrade authority',
          'Test on devnet with real Switchboard/Pyth oracle accounts (use devnet addresses)',
          'solana logs -c devnet | grep <PROGRAM_ID> streams live program logs',
        ],
        codeExample: `# Anchor.toml for devnet deployment
[programs.devnet]
amm = "YourProgramIdHere..."
lending = "YourLendingProgramId..."

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "devnet"
wallet = "~/.config/solana/id.json"

# Deployment commands
anchor build --verifiable     # reproducible build
anchor deploy                 # deploy to configured cluster

# Verify deployment
solana program show <PROGRAM_ID> --url devnet

# Stream program logs
solana logs --url devnet | grep "Program YourProgramId"

# Run tests against devnet (slow but real)
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com \\
ANCHOR_WALLET=~/.config/solana/id.json \\
anchor test --skip-local-validator`,
        commonMistakes: [
          'Deploying without checking upgrade authority — ensure it is set to your multisig, not the deployer wallet',
          'Not testing with real oracle feeds — devnet Pyth accounts exist and should be used for realistic testing',
        ],
        practicePrompt: 'Deploy your AMM program to devnet. Create a pool with devnet USDC and SOL. Execute a real swap transaction and verify on Solana Explorer.',
      }),
      makeTask("p6w8d6", 6, 28, 6, "Mainnet Readiness Checklist", "Complete a pre-mainnet checklist: security, performance, monitoring, and documentation.", 4, "exercise", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Security: external audit from Ottersec, Neodyme, or Trail of Bits',
          'Performance: all instructions < 200k CU in the happy path',
          'Monitoring: Grafana dashboard tracking TVL, volume, health factors',
          'Documentation: public docs covering all instructions, error codes, and account structures',
          'Bug bounty: Immunefi listing with responsible disclosure process',
        ],
        codeExample: `# Mainnet readiness checklist

## Security
- [ ] External audit completed and all H/M findings resolved
- [ ] Bug bounty program live (Immunefi or HackerOne)
- [ ] Upgrade authority set to 3-of-5 multisig with timelock
- [ ] Emergency pause mechanism tested and keys held by 3 different people
- [ ] All accounts use canonical PDAs with stored bumps

## Performance
- [ ] All instructions measured < 200k CU (happy path)
- [ ] ComputeBudget set correctly in client SDK
- [ ] No debug logs in production build

## Monitoring
- [ ] Helius webhook for all program events
- [ ] Grafana dashboard: TVL, 24h volume, active borrows
- [ ] PagerDuty alert if TVL drops > 20% in 1 hour

## Documentation
- [ ] All instructions documented with parameter types and constraints
- [ ] Error codes documented with common causes and solutions
- [ ] Integration guide for developers building on top of your protocol`,
        commonMistakes: [
          'Skipping external audit for a "small" protocol — exploits do not discriminate by TVL; new protocols are prime targets',
          'Launching without monitoring — you need to detect exploits in progress, not after the fact',
        ],
        practicePrompt: 'Complete the mainnet checklist for your Phase 6 AMM. For any unchecked item, write a 1-sentence explanation of the risk it mitigates and your plan to address it before mainnet.',
      }),
      makeTask("p6w8d7", 6, 28, 7, "Phase 6 Capstone: Full DeFi Suite Deploy", "Deploy and demo your complete Phase 6 DeFi suite: AMM + Lending + NFT Marketplace.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Deploy all three programs to devnet with correct cross-program references',
          'Create demo script: initialize pools, add liquidity, borrow, list NFT, sell NFT',
          'Write a 1-page architecture diagram showing how the three programs interact',
          'Record a 3-minute demo video for your portfolio',
          'Write GitHub README with: overview, architecture, instructions, deployed addresses',
        ],
        codeExample: `// Demo script: full DeFi suite interaction
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { AmmClient, LendingClient, MarketplaceClient } from "./clients";

async function runDemo() {
    const connection = new Connection("https://api.devnet.solana.com");

    // 1. Initialize AMM pool
    const amm = new AmmClient(connection, AMM_PROGRAM_ID);
    const poolPda = await amm.initializePool(tokenA, tokenB, 30); // 0.30% fee
    await amm.addLiquidity(poolPda, 1000_000, 50000_000);
    console.log("Pool initialized:", poolPda.toString());

    // 2. Execute a swap
    const swapResult = await amm.swap(poolPda, tokenA, 100_000, 0);
    console.log("Swapped:", swapResult.amountOut, "token B received");

    // 3. Deposit to lending and borrow
    const lending = new LendingClient(connection, LENDING_PROGRAM_ID);
    await lending.deposit(usdcPool, 500_000);
    await lending.borrow(solPool, 50_000); // borrow 50 SOL against USDC
    console.log("Borrowed 50 SOL against USDC collateral");

    // 4. Mint and list NFT
    const marketplace = new MarketplaceClient(connection, MARKETPLACE_PROGRAM_ID);
    const nftMint = await marketplace.mintNft("Ardan DeFi Expert #1", "ADE", ipfsUri);
    await marketplace.listNft(nftMint, 1_000_000_000); // 1 SOL
    console.log("NFT listed:", nftMint.toString());
}`,
        commonMistakes: [
          'Building the demo script at the end without testing each client individually — integration bugs are much harder to debug',
          'Not recording the demo video — future employers and investors want to see working software',
        ],
        practicePrompt: 'Complete the full demo script. Deploy all programs to devnet. Share devnet transaction signatures. Commit everything to GitHub with a polished README including architecture diagram.',
      }),
    ],
  },
]

// ─── Phase 7: 10 Solana Projects (Weeks 29–32) ────────────────────────────────
const phase7Weeks: Week[] = [
  // Week 29 — Projects 1-2
  {
    weekNumber: 29,
    phaseWeek: 1,
    phaseId: 7,
    title: "Projects 1–2: Token Launch & NFT Mint",
    goal: "Build and deploy your first two portfolio projects.",
    isCompleted: false,
    tasks: [
      makeTask("p7w1d1", 7, 29, 1, "Token Launch: SPL Token with Vesting PDA", "Build a token launch program: mint authority, initial supply, and vesting schedule locked in a PDA.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'VestingSchedule PDA: stores total_amount, released, start_timestamp, cliff, duration',
          'Cliff period: no tokens releasable until cliff passes (e.g. 1 year)',
          'Linear vesting after cliff: releasable = total * elapsed_after_cliff / vesting_duration',
          'Release instruction: calculate releasable, transfer to beneficiary, update released field',
          'Only beneficiary can call release; admin can revoke unvested tokens',
        ],
        codeExample: `#[account]
pub struct VestingSchedule {
    pub beneficiary: Pubkey,
    pub mint: Pubkey,
    pub vault: Pubkey,            // token vault holding vested tokens
    pub total_amount: u64,
    pub released: u64,
    pub start_timestamp: i64,
    pub cliff_seconds: i64,       // e.g. 365 * 24 * 3600 = 1 year
    pub duration_seconds: i64,    // total vesting period after cliff
    pub revocable: bool,
    pub bump: u8,
}

pub fn release(ctx: Context<Release>) -> Result<()> {
    let schedule = &mut ctx.accounts.schedule;
    let now = Clock::get()?.unix_timestamp;
    let cliff_end = schedule.start_timestamp + schedule.cliff_seconds;
    require!(now >= cliff_end, ErrorCode::CliffNotReached);

    let elapsed = (now - cliff_end).min(schedule.duration_seconds);
    let vested = (schedule.total_amount as i128 * elapsed as i128
        / schedule.duration_seconds as i128) as u64;
    let releasable = vested.saturating_sub(schedule.released);
    require!(releasable > 0, ErrorCode::NothingToRelease);

    schedule.released += releasable;
    // CPI: transfer releasable from vault to beneficiary
    Ok(())
}`,
        commonMistakes: [
          'Using block time (clock.slot) instead of unix_timestamp for vesting — slots are faster than 1/s',
          'Not storing released amount — recomputing from start allows double-claiming',
        ],
        practicePrompt: 'Deploy Token Launch to devnet. Vest 1,000,000 tokens over 4 years with 1-year cliff. Advance clock to cliff, call release, assert ~0 tokens (just cliff). Advance 2 more years, release again, assert ~500k tokens.',
      }),
      makeTask("p7w1d2", 7, 29, 2, "Token Launch: Distribution Logic", "Build airdrop distribution with Merkle tree allowlist verification.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Merkle distribution: build a Merkle tree of (address, amount) pairs off-chain',
          'Store Merkle root on-chain in a DistributorConfig account',
          'Claim instruction: verify Merkle proof, mint tokens, mark as claimed',
          'ClaimRecord PDA: seeds = ["claimed", distributor, claimant] prevents double-claiming',
          'Use @solana/spl-account-compression for large allowlists (> 10,000 addresses)',
        ],
        codeExample: `use solana_program::keccak;

pub fn claim(
    ctx: Context<Claim>,
    amount: u64,
    proof: Vec<[u8; 32]>,
) -> Result<()> {
    require!(!ctx.accounts.claim_record.claimed, ErrorCode::AlreadyClaimed);

    // Verify Merkle proof
    let leaf = keccak::hashv(&[
        ctx.accounts.claimant.key().as_ref(),
        &amount.to_le_bytes(),
    ]).to_bytes();

    let root = ctx.accounts.distributor.merkle_root;
    let computed_root = compute_merkle_root(leaf, proof);
    require!(computed_root == root, ErrorCode::InvalidMerkleProof);

    // Mint tokens to claimant
    ctx.accounts.claim_record.claimed = true;
    // CPI: mint amount tokens to claimant ATA
    Ok(())
}

fn compute_merkle_root(leaf: [u8; 32], proof: Vec<[u8; 32]>) -> [u8; 32] {
    proof.iter().fold(leaf, |acc, sibling| {
        if acc <= *sibling {
            keccak::hashv(&[&acc, sibling]).to_bytes()
        } else {
            keccak::hashv(&[sibling, &acc]).to_bytes()
        }
    })
}`,
        commonMistakes: [
          'Not using a ClaimRecord PDA — without it, same address can claim multiple times in different transactions',
          'Building Merkle tree with sorted leaves wrong — leaf ordering must match exactly between on-chain and off-chain generation',
        ],
        practicePrompt: 'Build a 100-address Merkle airdrop. Deploy to devnet. Claim from 3 different addresses. Assert double-claim fails. Write GitHub README with contract address and claim instructions.',
      }),
      makeTask("p7w1d3", 7, 29, 3, "Token Launch: Deploy & Test Devnet", "Deploy Token Launch project to devnet and write the GitHub README.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'anchor deploy: pushes compiled .so to devnet network',
          'Verify on Solana Explorer: program account shows correct upgrade authority',
          'Test all instruction paths with real devnet SOL (not localnet)',
          'GitHub README: project overview, architecture diagram, deployment address, test instructions',
          'Add repository topics: solana, anchor, token, vesting, airdrop',
        ],
        codeExample: `# Token Launch Deployment Checklist

# 1. Build verifiable
anchor build --verifiable

# 2. Deploy
anchor deploy --provider.cluster devnet

# 3. Verify program ID matches Declare_id! in lib.rs
solana program show <PROGRAM_ID> --url devnet

# 4. Run devnet tests
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com anchor test --skip-local-validator

# 5. Devnet testing checklist:
# [ ] Initialize vesting schedule with real token mint
# [ ] Advance clock using set_clock (devnet doesn't allow this — use localnet for time tests)
# [ ] Execute airdrop claim with 3 different wallets
# [ ] Verify Solana Explorer shows correct program events

# README template structure:
# ## Token Launch Program
# **Deployed:** devnet — <PROGRAM_ID>
# ## Architecture: [diagram]
# ## Instructions: initialize_vesting, release, claim_airdrop
# ## Testing: anchor test`,
        commonMistakes: [
          'Deploying without updating program ID in declare_id!() — results in a deployed program that rejects all instructions',
          'Not airdropping test SOL before running devnet tests — instructions fail with insufficient funds',
        ],
        practicePrompt: 'Complete deployment. Share the Solana Explorer link to your deployed program. Commit README to GitHub. Ask a friend to claim from your airdrop using only the README instructions.',
      }),
      makeTask("p7w1d4", 7, 29, 4, "NFT Mint: Collection Initialization", "Initialize a Metaplex collection for your NFT project.", 4, "project", { url: "https://developers.metaplex.com/", label: "Metaplex Developers", platform: "custom" }, {
        keyPoints: [
          'Collection NFT is a master NFT whose mint key identifies the collection',
          'CollectionDetails::V1 { size: 0 } enables on-chain size tracking',
          'Collection metadata: name = "My Collection", symbol = "MC", URI = IPFS JSON',
          'Master edition: max_supply = Some(0) means no prints from this NFT',
          'collection.json: { name, description, image, external_url, seller_fee_basis_points }',
        ],
        codeExample: `// Collection initialization using Metaplex JS SDK (v3)
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";

const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

// Create collection NFT
const collectionMint = generateSigner(umi);
await createNft(umi, {
    mint: collectionMint,
    name: "Ardan Labs NFT Collection",
    symbol: "ARDAN",
    uri: "https://arweave.net/your-collection-metadata",
    sellerFeeBasisPoints: percentAmount(5, 2), // 5% royalty
    isCollection: true,  // marks as collection root
}).sendAndConfirm(umi);

console.log("Collection mint:", collectionMint.publicKey);`,
        commonMistakes: [
          'Not setting isCollection: true — NFT is created but not recognized as a collection root by marketplaces',
          'Using a centralized URI (HTTPS server) — collection metadata disappears if server goes down',
        ],
        practicePrompt: 'Deploy collection NFT to devnet. Upload collection JSON to IPFS. Verify collection appears on Magic Eden devnet explorer with correct name and image.',
      }),
      makeTask("p7w1d5", 7, 29, 5, "NFT Mint: Mint Instruction with Metaplex", "Build a candy-machine-style mint instruction for your NFT collection.", 4, "project", { url: "https://developers.metaplex.com/", label: "Metaplex Developers", platform: "custom" }, {
        keyPoints: [
          'MintConfig PDA: price, max_supply, current_supply, start_time, end_time, collection_mint',
          'Mint instruction: check time window, check supply, collect SOL, mint NFT + verify collection',
          'Random metadata selection: use slot hash + counter for pseudo-random URI index',
          'Whitelist mint: Merkle proof required before public mint opens',
          'Treasury receives SOL from each mint; authority can harvest at any time',
        ],
        codeExample: `#[account]
pub struct MintConfig {
    pub authority: Pubkey,
    pub collection_mint: Pubkey,
    pub treasury: Pubkey,
    pub price: u64,
    pub max_supply: u32,
    pub current_supply: u32,
    pub start_time: i64,
    pub end_time: i64,
    pub bump: u8,
}

pub fn mint_nft(ctx: Context<MintNft>) -> Result<()> {
    let config = &mut ctx.accounts.config;
    let now = Clock::get()?.unix_timestamp;

    require!(now >= config.start_time, ErrorCode::MintNotStarted);
    require!(now <= config.end_time, ErrorCode::MintEnded);
    require!(config.current_supply < config.max_supply, ErrorCode::SoldOut);

    // Collect mint price
    system_program::transfer(
        CpiContext::new(ctx.accounts.system_program.to_account_info(), Transfer {
            from: ctx.accounts.buyer.to_account_info(),
            to: ctx.accounts.treasury.to_account_info(),
        }),
        config.price,
    )?;

    config.current_supply += 1;
    let index = config.current_supply;
    let uri = format!("https://arweave.net/collection/{}.json", index);

    // Mint NFT + verify collection (CPI to token metadata)
    Ok(())
}`,
        commonMistakes: [
          'Using sequential IDs without randomness — bots can predict which index has rare traits and snipe specific NFTs',
          'Not checking end_time — mints after the sale window should be rejected',
        ],
        practicePrompt: 'Deploy to devnet. Mint 5 NFTs from 3 different wallets. Verify all appear in the collection on Solana Explorer. Assert minting after end_time fails.',
      }),
      makeTask("p7w1d6", 7, 29, 6, "NFT Mint: Royalties & Update Auth", "Configure royalties, update authority, and freeze mechanisms for your NFT collection.", 4, "project", { url: "https://developers.metaplex.com/", label: "Metaplex Developers", platform: "custom" }, {
        keyPoints: [
          'Set seller_fee_basis_points = 500 (5%) in metadata for marketplace royalties',
          'Update authority retained by program PDA enables on-chain evolution (level-up, etc.)',
          'is_mutable = true initially, freeze metadata after art reveal',
          'Reveal: pre-mint with placeholder URI, post-mint batch-update to real URIs',
          'Royalty enforcement: use pNFT (TokenStandard::ProgrammableNonFungible) for on-chain enforcement',
        ],
        codeExample: `// Batch reveal: update all NFT URIs after mint is complete
pub fn reveal_nft(
    ctx: Context<RevealNft>,
    final_uri: String,
    make_immutable: bool,
) -> Result<()> {
    // Update authority is program PDA — revealed by program authority instruction
    let ix = update_metadata_accounts_v2(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.update_authority_pda.key(),
        None,
        Some(DataV2 {
            name: ctx.accounts.metadata_account.data.name.clone(),
            symbol: ctx.accounts.metadata_account.data.symbol.clone(),
            uri: final_uri,
            seller_fee_basis_points: 500,
            creators: None,
            collection: None,
            uses: None,
        }),
        Some(!make_immutable), // is_mutable = false when revealing final art
        None,
    );
    invoke_signed(&ix, &[/* ... */], &[/* pda_seeds */])?;
    Ok(())
}`,
        commonMistakes: [
          'Making metadata immutable before reveal — cannot update URIs post-launch if metadata is frozen',
          'Keeping update authority as a single EOA — if key is lost, metadata can never be updated or frozen',
        ],
        practicePrompt: 'Add a reveal instruction to your NFT mint program. Mint 10 NFTs with placeholder URIs. Batch reveal all 10 in a single instruction (use remaining_accounts for all metadata accounts).',
      }),
      makeTask("p7w1d7", 7, 29, 7, "Both Projects: README & GitHub", "Polish both projects and publish to GitHub as portfolio pieces.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'README structure: badges, overview, architecture, instructions list, testing, deployment',
          'Architecture diagram: draw.io or Excalidraw showing accounts + instruction flows',
          'Add GitHub topics for discoverability: solana, anchor, rust, nft, defi, web3',
          'CI/CD: GitHub Actions running anchor test on every push',
          'Live demo: deployed devnet program ID prominently displayed',
        ],
        codeExample: `# Example GitHub Actions CI for Anchor project
# .github/workflows/ci.yml

name: Anchor Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: Install Solana
        run: |
          sh -c "$(curl -sSfL https://release.solana.com/v1.18.0/install)"
          echo "$HOME/.local/share/solana/install/active_release/bin" >> $GITHUB_PATH
      - name: Install Anchor
        run: cargo install --git https://github.com/coral-xyz/anchor --tag v0.30.1 anchor-cli --locked
      - name: Run tests
        run: anchor test`,
        commonMistakes: [
          'README with no architecture diagram — reviewers cannot understand the program without a visual',
          'Not adding a CI badge to README — signals to employers that you care about code quality',
        ],
        practicePrompt: 'Set up GitHub Actions CI for both projects. Both must pass anchor test in CI. Add CI badge to README. Star both repos and share links in a portfolio document.',
      }),
    ],
  },

  // Week 30 — Projects 3-5
  {
    weekNumber: 30,
    phaseWeek: 2,
    phaseId: 7,
    title: "Projects 3–5: DEX, Staking, DAO",
    goal: "Build three mid-complexity DeFi projects.",
    isCompleted: false,
    tasks: [
      makeTask("p7w2d1", 7, 30, 1, "DEX: AMM with Constant Product", "Build a production-quality AMM DEX using the foundation from Phase 6.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Reuse Phase 6 AMM code — refactor into a clean, deployable program',
          'Add multi-pool support: one program handles multiple pools via PDAs',
          'Pool registry: PoolRegistry PDA listing all initialized pools',
          'Price discovery: expose get_price view function for frontend consumption',
          'Route swaps: single-hop and two-hop (A→B→C) routing',
        ],
        codeExample: `// Multi-pool routing: swap A -> B -> C via two hops
pub fn swap_two_hop(
    ctx: Context<SwapTwoHop>,
    amount_in: u64,
    min_amount_out: u64,
) -> Result<()> {
    // Hop 1: A -> B
    let intermediate_amount = execute_swap(
        &mut ctx.accounts.pool_ab,
        amount_in,
        0, // no slippage check on intermediate
    )?;

    // Hop 2: B -> C
    let amount_out = execute_swap(
        &mut ctx.accounts.pool_bc,
        intermediate_amount,
        min_amount_out, // slippage check on final output
    )?;

    emit!(TwoHopSwapEvent {
        token_in: ctx.accounts.token_a.key(),
        token_out: ctx.accounts.token_c.key(),
        amount_in,
        intermediate_amount,
        amount_out,
    });
    Ok(())
}`,
        commonMistakes: [
          'Not adding slippage protection on the final hop of multi-hop routes — intermediate amounts can be manipulated',
          'Forgetting to add the DEX to a pool registry — frontends cannot discover pools without an index',
        ],
        practicePrompt: 'Deploy DEX to devnet with 3 pools: SOL/USDC, SOL/BONK, USDC/BONK. Implement 2-hop routing. Verify a BONK→USDC direct swap and a BONK→SOL→USDC route give similar prices.',
      }),
      makeTask("p7w2d2", 7, 30, 2, "DEX: Frontend with @solana/wallet-adapter", "Build a minimal Next.js frontend for your DEX.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          '@solana/wallet-adapter-react provides WalletProvider and useWallet hook',
          'useAnchorProgram hook: wraps program IDL and connection',
          'Display pool reserves and spot price in real-time (1-second polling or websocket)',
          'Swap form: input amount, auto-compute output via get_price, slippage slider',
          'Transaction confirmation: show spinner, then success/error toast',
        ],
        codeExample: `// Next.js DEX swap component
"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorProgram } from "@/hooks/useAnchorProgram";
import { BN } from "@coral-xyz/anchor";

export function SwapWidget() {
  const { publicKey, sendTransaction } = useWallet();
  const { program } = useAnchorProgram();
  const [amountIn, setAmountIn] = useState("");
  const [estimatedOut, setEstimatedOut] = useState(0);

  const onSwap = async () => {
    const tx = await program.methods
      .swap(new BN(parseFloat(amountIn) * 1e6), new BN(0))
      .accounts({ pool: POOL_PDA, /* ... */ })
      .transaction();
    const sig = await sendTransaction(tx, connection);
    await connection.confirmTransaction(sig);
    toast.success("Swapped successfully!");
  };

  return (
    <div>
      <WalletMultiButton />
      <input value={amountIn} onChange={e => setAmountIn(e.target.value)} />
      <p>You receive: {estimatedOut} tokens</p>
      <button onClick={onSwap} disabled={!publicKey}>Swap</button>
    </div>
  );
}`,
        commonMistakes: [
          'Not handling wallet disconnect gracefully — program calls with null publicKey throw unhandled errors',
          'Polling reserves too frequently — 1-second polling on mainnet costs RPC credits; use WebSocket subscriptions',
        ],
        practicePrompt: 'Deploy the frontend to Vercel. Share the URL. The swap must work end-to-end: connect wallet, enter amount, swap, see confirmation. Record a 30-second screen recording.',
      }),
      makeTask("p7w2d3", 7, 30, 3, "Staking: Lock Tokens, Earn Rewards by Time", "Build a staking program where users lock tokens and earn proportional rewards over time.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Staking pool tracks: total_staked, reward_per_token_stored, last_update_time',
          'reward_per_token_stored increases each slot: += reward_rate * elapsed / total_staked',
          'UserStake PDA: amount, reward_per_token_paid, rewards_pending',
          'Claim: pending = (rpt_stored - rpt_paid) * staked_amount + rewards_pending',
          'Compound: auto-stake claimed rewards in same instruction',
        ],
        codeExample: `#[account]
pub struct StakingPool {
    pub reward_mint: Pubkey,
    pub stake_mint: Pubkey,
    pub reward_rate: u64,          // reward tokens per slot
    pub reward_per_token_stored: u128, // scaled by 1e18
    pub total_staked: u64,
    pub last_update_slot: u64,
    pub bump: u8,
}

fn update_reward(pool: &mut StakingPool) -> Result<()> {
    let slot = Clock::get()?.slot;
    let elapsed = slot.saturating_sub(pool.last_update_slot);
    if pool.total_staked > 0 && elapsed > 0 {
        let reward_per_token_delta = (pool.reward_rate as u128)
            .checked_mul(elapsed as u128).unwrap()
            .checked_mul(1_000_000_000_000_000_000u128).unwrap()
            / pool.total_staked as u128;
        pool.reward_per_token_stored = pool.reward_per_token_stored
            .saturating_add(reward_per_token_delta);
    }
    pool.last_update_slot = slot;
    Ok(())
}

fn earned(pool: &StakingPool, user: &UserStake) -> u64 {
    ((user.amount as u128)
        .checked_mul(pool.reward_per_token_stored
            .saturating_sub(user.reward_per_token_paid)).unwrap()
        / 1_000_000_000_000_000_000u128) as u64
    + user.rewards_pending
}`,
        commonMistakes: [
          'Computing rewards using timestamps instead of slots — timestamps can be manipulated by validators',
          'Not calling update_reward before any state change — users can get extra rewards if rpt is stale',
        ],
        practicePrompt: 'Deploy staking program. User A stakes 1000 tokens. Advance 100 slots. User B stakes 1000. Advance 100 more slots. Assert A earned ~2x more rewards than B.',
      }),
      makeTask("p7w2d4", 7, 30, 4, "Staking: Early Withdrawal Penalty", "Add penalty mechanisms and locked staking tiers to the staking program.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Lock period: user chooses 30/90/180 day lock for a multiplier bonus (1x/1.5x/2x)',
          'Early unstake penalty: if unstaking before lock_end, penalty = 20% of staked amount',
          'Penalty goes to insurance fund or is burned (reduces supply)',
          'VeToken model: voting power = staked_amount * time_remaining / max_lock',
          'Lock extension: user can extend lock to increase multiplier',
        ],
        codeExample: `#[account]
pub struct UserStake {
    pub owner: Pubkey,
    pub amount: u64,
    pub lock_end: i64,          // Unix timestamp when lock expires
    pub lock_multiplier: u64,   // 10000 = 1x, 15000 = 1.5x, 20000 = 2x
    pub reward_per_token_paid: u128,
    pub rewards_pending: u64,
    pub bump: u8,
}

pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
    let user = &mut ctx.accounts.user_stake;
    let pool = &mut ctx.accounts.pool;
    let now = Clock::get()?.unix_timestamp;

    update_reward(pool)?;
    let pending = earned(pool, user);
    user.rewards_pending = 0;
    user.reward_per_token_paid = pool.reward_per_token_stored;

    let (actual_amount, penalty) = if now < user.lock_end {
        let penalty = amount * 2000 / 10000; // 20% penalty
        (amount - penalty, penalty)
    } else {
        (amount, 0)
    };

    user.amount -= amount;
    pool.total_staked -= amount;
    // Transfer actual_amount to user
    // Transfer penalty to insurance_fund
    Ok(())
}`,
        commonMistakes: [
          'Applying penalty to rewards instead of principal — only principal should be penalized for early withdrawal',
          'Not handling lock extension — if user cannot extend, they must unstake and re-stake losing their lock progress',
        ],
        practicePrompt: 'Write three staking tests: (1) 180-day lock earns 2x rewards. (2) Early unstake loses 20%. (3) Unstake after lock period: no penalty, full rewards. Deploy to devnet.',
      }),
      makeTask("p7w2d5", 7, 30, 5, "DAO: Governance Token + Proposal Creation", "Build an on-chain DAO with token-weighted governance and proposal creation.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Governance token holders create proposals by locking tokens as deposit',
          'Proposal PDA: title, description_uri, instruction_data, voting_start, voting_end, for_votes, against_votes',
          'Quorum: minimum total votes required for proposal to be valid (e.g. 10% of supply)',
          'Proposal deposit returned when proposal is executed or cancelled',
          'Only token holders (above threshold) can create proposals',
        ],
        codeExample: `#[account]
pub struct Proposal {
    pub proposer: Pubkey,
    pub dao: Pubkey,
    pub title: String,             // max 64 chars
    pub description_uri: String,   // IPFS link to full description
    pub instruction_data: Vec<u8>, // serialized instruction to execute
    pub target_program: Pubkey,
    pub for_votes: u64,
    pub against_votes: u64,
    pub voting_start: i64,
    pub voting_end: i64,
    pub executed: bool,
    pub cancelled: bool,
    pub deposit: u64,              // governance tokens locked
    pub bump: u8,
}

pub fn create_proposal(
    ctx: Context<CreateProposal>,
    title: String,
    description_uri: String,
    instruction_data: Vec<u8>,
    voting_duration: i64,
) -> Result<()> {
    let dao = &ctx.accounts.dao;
    let token_balance = ctx.accounts.proposer_token_account.amount;
    require!(
        token_balance >= dao.proposal_threshold,
        ErrorCode::InsufficientTokensToPropose
    );
    // Lock deposit tokens, initialize proposal
    Ok(())
}`,
        commonMistakes: [
          'No proposal deposit — spam proposals overwhelm voters; require token lockup to create',
          'No quorum check — 3 votes on a proposal with 1M supply should not pass',
        ],
        practicePrompt: 'Create a DAO with 1000 token supply, proposal_threshold=10 tokens, quorum=10%. Create a proposal to change fee_bps to 100. Deploy to devnet.',
      }),
      makeTask("p7w2d6", 7, 30, 6, "DAO: Vote Instruction, Quorum Check", "Implement the vote instruction with delegation and snapshot-based power.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'VoteRecord PDA: voter, proposal, vote (For/Against), weight — prevents double voting',
          'Vote weight = token_balance at proposal creation snapshot (not current balance)',
          'Delegation: delegate voting power to another address',
          'Quorum check: (for_votes + against_votes) / total_supply >= quorum_bps',
          'Time check: voting must be within [voting_start, voting_end]',
        ],
        codeExample: `pub fn cast_vote(
    ctx: Context<CastVote>,
    vote: VoteChoice, // For or Against
) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let now = Clock::get()?.unix_timestamp;
    require!(now >= proposal.voting_start, ErrorCode::VotingNotStarted);
    require!(now <= proposal.voting_end, ErrorCode::VotingEnded);
    require!(!ctx.accounts.vote_record.voted, ErrorCode::AlreadyVoted);

    let vote_weight = ctx.accounts.voter_token_account.amount;
    require!(vote_weight > 0, ErrorCode::NoVotingPower);

    match vote {
        VoteChoice::For => proposal.for_votes += vote_weight,
        VoteChoice::Against => proposal.against_votes += vote_weight,
    }
    ctx.accounts.vote_record.voted = true;
    ctx.accounts.vote_record.vote = vote;
    ctx.accounts.vote_record.weight = vote_weight;
    emit!(VoteCastEvent {
        voter: ctx.accounts.voter.key(),
        proposal: proposal.key(),
        vote,
        weight: vote_weight,
    });
    Ok(())
}`,
        commonMistakes: [
          'Using current token balance instead of snapshot — users can vote then sell tokens, allowing double influence',
          'Not requiring VoteRecord PDA — users can vote multiple times from different ATAs',
        ],
        practicePrompt: 'Write DAO voting tests: 3 voters with different weights vote. Verify for_votes/against_votes are correct. Try double-voting (should fail). Check quorum pass/fail.',
      }),
      makeTask("p7w2d7", 7, 30, 7, "DAO: Execution After Vote Passes", "Implement proposal execution: verify quorum, verify For > Against, execute stored instruction.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Execution check: proposal.voting_end passed, quorum met, for_votes > against_votes',
          'Execute stored instruction_data via CPI to target_program',
          'One-time execution: set proposal.executed = true before CPI to prevent re-execution',
          'Proposal expiry: proposals can be cancelled if not executed within expiry_time after voting_end',
          'Return deposit to proposer upon successful execution',
        ],
        codeExample: `pub fn execute_proposal(ctx: Context<ExecuteProposal>) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    let dao = &ctx.accounts.dao;
    let now = Clock::get()?.unix_timestamp;

    require!(!proposal.executed, ErrorCode::AlreadyExecuted);
    require!(now > proposal.voting_end, ErrorCode::VotingStillActive);

    // Quorum check
    let total_votes = proposal.for_votes + proposal.against_votes;
    let quorum_threshold = dao.total_supply * dao.quorum_bps / 10000;
    require!(total_votes >= quorum_threshold, ErrorCode::QuorumNotMet);

    // Majority check
    require!(proposal.for_votes > proposal.against_votes, ErrorCode::ProposalRejected);

    // Mark executed BEFORE CPI (prevent reentrancy)
    proposal.executed = true;

    // Execute the stored instruction
    let ix = solana_program::instruction::Instruction {
        program_id: proposal.target_program,
        accounts: vec![/* ... from remaining_accounts */],
        data: proposal.instruction_data.clone(),
    };
    invoke_signed(&ix, &ctx.remaining_accounts, &[/* dao seeds */])?;

    // Return deposit to proposer
    Ok(())
}`,
        commonMistakes: [
          'Setting executed = true after CPI — allows reentrancy to execute the proposal multiple times',
          'Not returning deposit — proposer permanently loses tokens even on successful proposals',
        ],
        practicePrompt: 'Complete the full DAO lifecycle test: create proposal, vote with quorum, execute. The stored instruction should update a protocol fee. Verify fee changed after execution.',
      }),
    ],
  },

  // Week 31 — Projects 6-8
  {
    weekNumber: 31,
    phaseWeek: 3,
    phaseId: 7,
    title: "Projects 6–8: Escrow, Lending, Lottery",
    goal: "Build three advanced DeFi projects.",
    isCompleted: false,
    tasks: [
      makeTask("p7w3d1", 7, 31, 1, "Escrow: Safe P2P Token Swap", "Build a trustless escrow for swapping two different tokens between two parties.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Maker deposits token A into escrow PDA; taker sends token B in exchange',
          'EscrowState PDA: maker, taker (optional — if null, anyone can take), token_a, amount_a, token_b, amount_b',
          'If taker is specified, only that address can complete the swap',
          'Partial fill: allow taker to fulfill any fraction, return remainder to maker',
          'Expiry: maker can cancel and reclaim after expiry_timestamp',
        ],
        codeExample: `#[account]
pub struct EscrowState {
    pub maker: Pubkey,
    pub taker: Option<Pubkey>,     // None = permissionless
    pub token_a_mint: Pubkey,
    pub token_b_mint: Pubkey,
    pub token_a_amount: u64,       // deposited by maker
    pub token_b_amount: u64,       // expected from taker
    pub expiry: i64,               // 0 = no expiry
    pub bump: u8,
    pub vault_bump: u8,
}

pub fn make_offer(
    ctx: Context<MakeOffer>,
    token_a_amount: u64,
    token_b_amount: u64,
    taker: Option<Pubkey>,
    expiry: i64,
) -> Result<()> {
    let escrow = &mut ctx.accounts.escrow;
    escrow.maker = ctx.accounts.maker.key();
    escrow.taker = taker;
    escrow.token_a_amount = token_a_amount;
    escrow.token_b_amount = token_b_amount;
    escrow.expiry = expiry;

    // Transfer token A from maker to vault
    token::transfer(/* CpiContext */, token_a_amount)?;
    Ok(())
}

pub fn take_offer(ctx: Context<TakeOffer>) -> Result<()> {
    let escrow = &ctx.accounts.escrow;
    if let Some(taker) = escrow.taker {
        require!(taker == ctx.accounts.taker.key(), ErrorCode::WrongTaker);
    }
    if escrow.expiry > 0 {
        require!(Clock::get()?.unix_timestamp < escrow.expiry, ErrorCode::EscrowExpired);
    }
    // Transfer token B from taker to maker
    // Transfer token A from vault to taker
    // Close escrow + vault accounts
    Ok(())
}`,
        commonMistakes: [
          'Not closing the vault account after completion — leaves rent-funded token accounts orphaned on-chain',
          'Not verifying token_b_mint matches expected — taker could send a worthless token',
        ],
        practicePrompt: 'Deploy escrow to devnet. Test 3 scenarios: (1) permissioned taker succeeds. (2) wrong taker fails. (3) maker cancels after expiry. Record all txn signatures.',
      }),
      makeTask("p7w3d2", 7, 31, 2, "Escrow: Time-Locked Release", "Add time-lock to escrow: released only after a specific date or after conditions are met.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Time-lock use cases: vesting, delayed payment, trust-minimized OTC deals',
          'release_time: Unix timestamp; release only allowed after this time',
          'Conditional release: oracle price condition (e.g., release if SOL > $200)',
          'Dispute resolution: arbitrator key can force-release or refund before time-lock',
          'Stream payments: release proportional amount at each call based on elapsed time',
        ],
        codeExample: `pub struct TimeLockEscrow {
    pub beneficiary: Pubkey,
    pub depositor: Pubkey,
    pub arbitrator: Option<Pubkey>,
    pub amount: u64,
    pub release_time: i64,
    pub condition: ReleaseCondition,
    pub bump: u8,
}

pub enum ReleaseCondition {
    TimeOnly,
    OraclePriceAbove { oracle: Pubkey, threshold: u64 },
    Streaming { start: i64, end: i64, released: u64 },
}

pub fn release(ctx: Context<Release>) -> Result<()> {
    let escrow = &mut ctx.accounts.escrow;
    let now = Clock::get()?.unix_timestamp;

    let releasable = match &escrow.condition {
        ReleaseCondition::TimeOnly => {
            require!(now >= escrow.release_time, ErrorCode::TooEarly);
            escrow.amount
        },
        ReleaseCondition::Streaming { start, end, released } => {
            let elapsed = (now - start).max(0).min(end - start);
            let total_duration = end - start;
            let vested = escrow.amount * elapsed as u64 / total_duration as u64;
            vested.saturating_sub(*released)
        },
        ReleaseCondition::OraclePriceAbove { oracle, threshold } => {
            let price = get_pyth_price(/* oracle account */)?;
            require!(price >= *threshold, ErrorCode::ConditionNotMet);
            escrow.amount
        },
    };
    // transfer releasable to beneficiary
    Ok(())
}`,
        commonMistakes: [
          'Not handling the streaming case: returning 0 when nothing new to release should be a no-op, not an error',
          'Missing arbitrator — without dispute resolution, either party can be locked out by bad faith',
        ],
        practicePrompt: 'Implement streaming escrow: 1000 tokens over 100 slots. At slot 50, release and assert ~500 tokens released. At slot 100, release remaining ~500. Assert total = 1000.',
      }),
      makeTask("p7w3d3", 7, 31, 3, "Lending: Deposit/Borrow/Repay Cycle", "Build a simplified lending protocol optimized for portfolio clarity.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Refactor Phase 6 lending into a clean standalone project with minimal dependencies',
          'Focus: deposit USDC, borrow SOL against USDC collateral',
          'Use a simplified linear interest model (no kinked curve) for clarity',
          'Integrate mock oracle for tests, real Pyth for devnet',
          'Clean TypeScript SDK: LendingClient class with deposit/borrow/repay/withdraw methods',
        ],
        codeExample: `// TypeScript SDK for lending protocol
export class LendingClient {
    constructor(
        private program: Program<Lending>,
        private connection: Connection,
    ) {}

    async deposit(poolPda: PublicKey, amount: BN): Promise<string> {
        const [userPositionPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("position"), poolPda.toBuffer(), this.wallet.publicKey.toBuffer()],
            this.program.programId
        );
        return this.program.methods
            .deposit(amount)
            .accounts({ pool: poolPda, userPosition: userPositionPda })
            .rpc();
    }

    async getHealthFactor(userPositionPda: PublicKey): Promise<number> {
        const position = await this.program.account.userPosition.fetch(userPositionPda);
        const pool = await this.program.account.lendingPool.fetch(position.pool);
        // compute health factor
        return position.collateralValue.toNumber() * pool.liquidationThreshold.toNumber()
            / position.borrowedAmount.toNumber() / 10000;
    }
}`,
        commonMistakes: [
          'Not building a TypeScript SDK — raw Anchor program calls are unusable by non-Rust developers',
          'Skipping mock oracle — tests that require real Pyth feeds cannot run in CI',
        ],
        practicePrompt: 'Build LendingClient TypeScript class with all 4 methods. Write integration tests using the SDK (not raw program.methods). Deploy to devnet and document SDK usage in README.',
      }),
      makeTask("p7w3d4", 7, 31, 4, "Lending: Interest Accrual Model", "Implement and visualize the compound interest model for the lending protocol.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'APY vs APR: APR = periodic_rate * periods, APY = (1 + periodic_rate)^periods - 1',
          'Compound interest: borrow_index grows multiplicatively each slot',
          'Simulate 1 year of interest accrual and plot utilization vs rate curve',
          'Rate snapshots: store borrow_rate at regular intervals for APY calculation',
          'Expose getAPR() and getAPY() in the TypeScript SDK',
        ],
        codeExample: `// Simulate interest accrual over time
function simulateInterest(
    initialDeposit: number,
    initialBorrow: number,
    baseRate: number,   // annual bps
    daysToSimulate: number
): { day: number, debt: number, depositValue: number }[] {
    const slotsPerDay = 2 * 3600 * 24; // 2 slots/second
    let borrowIndex = 1e18;
    let totalDeposits = initialDeposit;
    let totalBorrows = initialBorrow;
    const results = [];

    for (let day = 0; day <= daysToSimulate; day++) {
        const utilization = totalBorrows / totalDeposits;
        const annualRateBps = baseRate + utilization * 800; // slope=800
        const slotRate = annualRateBps / 10000 / (365 * slotsPerDay);
        borrowIndex *= (1 + slotRate * slotsPerDay);

        results.push({
            day,
            debt: initialBorrow * borrowIndex / 1e18,
            depositValue: totalDeposits + (totalBorrows * (borrowIndex / 1e18 - 1))
        });
    }
    return results;
}`,
        commonMistakes: [
          'Confusing APR with APY in documentation — compound interest makes APY significantly higher than APR at high rates',
          'Not simulating the interest model before deploying — unexpected rate behavior can cause bad debt',
        ],
        practicePrompt: 'Plot your interest model: utilization (x-axis 0-100%) vs APR (y-axis). At 80% utilization, rate should be ~10%. At 100% utilization, rate should be ~50%. Adjust slope until satisfied.',
      }),
      makeTask("p7w3d5", 7, 31, 5, "Lottery: VRF Randomness with Switchboard", "Build an on-chain lottery using Switchboard VRF for provably fair randomness.", 4, "project", { url: "https://docs.switchboard.xyz/randomness", label: "Switchboard Randomness", platform: "docs" }, {
        keyPoints: [
          'VRF (Verifiable Random Function): randomness proven to be unbiased by on-chain verification',
          'Switchboard VRF: request randomness, wait for VRF fulfillment callback',
          'Lottery account: entry_price, max_tickets, tickets_sold, vrf_account, winner',
          'Two-phase: sell phase (accept entries) → randomness fulfilled → distribute phase',
          'Randomness seed = vrf_result[0..8] as u64 % tickets_sold → winner index',
        ],
        codeExample: `use switchboard_v2::VrfAccountData;

#[account]
pub struct Lottery {
    pub authority: Pubkey,
    pub vrf_account: Pubkey,    // Switchboard VRF account
    pub entry_price: u64,
    pub max_tickets: u32,
    pub tickets_sold: u32,
    pub treasury: u64,
    pub winner: Option<Pubkey>,
    pub draw_slot: u64,         // must be in the future
    pub state: LotteryState,
    pub bump: u8,
}

pub enum LotteryState { Open, DrawRequested, Complete }

pub fn request_draw(ctx: Context<RequestDraw>) -> Result<()> {
    let lottery = &mut ctx.accounts.lottery;
    require!(matches!(lottery.state, LotteryState::Open), ErrorCode::WrongState);
    require!(
        Clock::get()?.slot >= lottery.draw_slot,
        ErrorCode::TooEarlyToDraw
    );
    // Request randomness from Switchboard VRF
    switchboard_v2::VrfRequestRandomness {
        /* authority, vrf, oracle_queue, ... */
    }.invoke(ctx.accounts.switchboard_program.clone(), /* ... */)?;
    lottery.state = LotteryState::DrawRequested;
    Ok(())
}

pub fn consume_randomness(ctx: Context<ConsumeRandomness>) -> Result<()> {
    let vrf = VrfAccountData::new(&ctx.accounts.vrf_account)?;
    let result = vrf.get_result()?;
    let winner_index = u64::from_le_bytes(result.value[..8].try_into().unwrap())
        % ctx.accounts.lottery.tickets_sold as u64;
    ctx.accounts.lottery.winner = Some(ctx.accounts.tickets[winner_index as usize].buyer);
    Ok(())
}`,
        commonMistakes: [
          'Using slot hash as randomness — validators can manipulate slot hash within bounds to influence outcome',
          'Selecting winner in the same transaction as randomness request — randomness must be fulfilled in a separate transaction',
        ],
        practicePrompt: 'Deploy lottery to devnet. Sell 10 tickets from 5 wallets. Request VRF draw. Wait for fulfillment. Verify winner was one of the 10 ticket holders. Transfer prize to winner.',
      }),
      makeTask("p7w3d6", 7, 31, 6, "Lottery: Ticket Purchase & Winner Selection", "Complete the lottery program with prize distribution and multiple rounds.", 4, "project", { url: "https://docs.switchboard.xyz/randomness", label: "Switchboard Randomness", platform: "docs" }, {
        keyPoints: [
          'TicketRecord PDA: buyer, lottery, ticket_number, bought_at',
          'Multiple tickets per buyer: allow up to max_tickets_per_buyer per address',
          'Prize distribution: winner gets 90%, 5% to protocol, 5% to next lottery seed',
          'Round system: after winner selected, auto-initialize next lottery round',
          'Unclaimed prizes: if winner does not claim within claim_window, prize rolls over',
        ],
        codeExample: `pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
    let lottery = &mut ctx.accounts.lottery;
    require!(matches!(lottery.state, LotteryState::Open), ErrorCode::LotteryClosed);
    require!(lottery.tickets_sold < lottery.max_tickets, ErrorCode::SoldOut);

    // Pay entry price
    system_program::transfer(
        CpiContext::new(ctx.accounts.system_program.to_account_info(), Transfer {
            from: ctx.accounts.buyer.to_account_info(),
            to: ctx.accounts.lottery.to_account_info(),
        }),
        lottery.entry_price,
    )?;

    // Record ticket
    let ticket = &mut ctx.accounts.ticket_record;
    ticket.buyer = ctx.accounts.buyer.key();
    ticket.lottery = ctx.accounts.lottery.key();
    ticket.ticket_number = lottery.tickets_sold;
    lottery.tickets_sold += 1;
    lottery.treasury += lottery.entry_price;
    emit!(TicketPurchased {
        buyer: ticket.buyer,
        ticket_number: ticket.ticket_number,
    });
    Ok(())
}`,
        commonMistakes: [
          'Storing all tickets in lottery account Vec — use individual TicketRecord PDAs for unbounded ticket counts',
          'Not emitting TicketPurchased event — frontends cannot build a live ticket list without events',
        ],
        practicePrompt: 'Complete multi-round lottery: after winner claims, auto-start next round with new draw_slot. Deploy to devnet, run 2 full rounds, verify prize amounts in both.',
      }),
      makeTask("p7w3d7", 7, 31, 7, "Deploy All Three to Devnet", "Deploy Escrow, Lending, and Lottery to devnet with tests and GitHub READMEs.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Monorepo structure: one Anchor workspace with 3 programs',
          'Anchor.toml: separate [programs.devnet] entries for each program',
          'Shared types: common error codes and utility functions in a shared crate',
          'CI: single GitHub Actions workflow running all three test suites',
          'Portfolio page: list all 3 programs with devnet addresses and Explorer links',
        ],
        codeExample: `# Anchor.toml — multi-program workspace
[programs.devnet]
escrow = "EscrowProgramId..."
lending = "LendingProgramId..."
lottery = "LotteryProgramId..."

[workspace]
members = ["programs/escrow", "programs/lending", "programs/lottery"]

# Cargo.toml workspace
[workspace]
members = ["programs/*"]
resolver = "2"

[workspace.dependencies]
anchor-lang = { version = "0.30.1", features = ["init-if-needed"] }
anchor-spl = "0.30.1"

# Each program imports shared crate
# programs/escrow/Cargo.toml:
[dependencies]
shared-utils = { path = "../../shared-utils" }`,
        commonMistakes: [
          'Three separate repos instead of one monorepo — cross-program dependencies become messy',
          'No shared utility crate — duplicating error codes and math functions across programs',
        ],
        practicePrompt: 'Set up the monorepo. Deploy all 3 to devnet in one CI run. Add Solana Explorer badge links to each program in the root README. Share the GitHub link.',
      }),
    ],
  },

  // Week 32 — Projects 9-10
  {
    weekNumber: 32,
    phaseWeek: 4,
    phaseId: 7,
    title: "Projects 9–10: Bridge & ZK+Solana",
    goal: "Build your most ambitious Solana projects.",
    isCompleted: false,
    tasks: [
      makeTask("p7w4d1", 7, 32, 1, "Bridge: Wormhole SDK Integration", "Integrate Wormhole cross-chain messaging to bridge tokens between Solana and EVM chains.", 4, "project", { url: "https://docs.wormhole.com/", label: "Wormhole Docs", platform: "docs" }, {
        keyPoints: [
          'Wormhole: decentralized cross-chain messaging protocol with 19 guardians',
          'VAA (Verified Action Approval): signed message attesting to an event on source chain',
          'Wormhole Token Bridge: lock-and-mint bridging for SPL tokens',
          'testnet.wormholescan.io: explore VAAs and bridge transactions',
          '@certusone/wormhole-sdk: TypeScript SDK for generating bridge transactions',
        ],
        codeExample: `import {
    transferFromSolana,
    redeemOnEth,
    parseSequenceFromLogSolana,
    getEmitterAddressSolana,
} from "@certusone/wormhole-sdk";
import { CONTRACTS } from "@certusone/wormhole-sdk";

// Bridge SOL -> ETH: Lock tokens on Solana, mint wrapped on Ethereum
async function bridgeToEthereum(amount: bigint, recipientEthAddress: string) {
    // 1. Initiate transfer on Solana
    const transferTx = await transferFromSolana(
        connection,
        CONTRACTS.TESTNET.solana.core,
        CONTRACTS.TESTNET.solana.token_bridge,
        wallet.publicKey,
        tokenAccount,
        tokenMint,
        amount,
        hexToUint8Array(recipientEthAddress),
        CHAIN_ID_ETH,
    );
    const txId = await sendAndConfirm(transferTx);

    // 2. Get Sequence from logs
    const sequence = parseSequenceFromLogSolana(txReceipt);

    // 3. Wait for guardian attestation (VAA)
    const vaaUrl = \`https://api.testnet.wormholescan.io/api/v1/vaas/\${CHAIN_ID_SOLANA}/\${emitterAddress}/\${sequence}\`;
    const vaaBytes = await fetchVAA(vaaUrl);

    // 4. Redeem on Ethereum
    await redeemOnEth(ETH_TOKEN_BRIDGE_ADDRESS, ethSigner, vaaBytes);
}`,
        commonMistakes: [
          'Not waiting for guardian attestation (~15 seconds on testnet) before redeeming — VAA is not available instantly',
          'Using mainnet contract addresses on testnet — always use CONTRACTS.TESTNET for development',
        ],
        practicePrompt: 'Bridge 0.01 devnet SOL-equivalent tokens from Solana testnet to Ethereum Goerli. Track the VAA on wormholescan. Verify wrapped tokens appear in MetaMask. Document the full flow.',
      }),
      makeTask("p7w4d2", 7, 32, 2, "Bridge: Lock-and-Mint Pattern", "Build the on-chain Solana program for the locking side of a custom bridge.", 4, "project", { url: "https://docs.wormhole.com/", label: "Wormhole Docs", platform: "docs" }, {
        keyPoints: [
          'Lock side (Solana): receive tokens from user, send Wormhole message with amount + destination',
          'Mint side (EVM): receive Wormhole VAA, verify, mint wrapped tokens to recipient',
          'BridgeVault PDA: holds locked tokens until redemption or reversal',
          'Nonce: unique per transaction to prevent replay of the same lock',
          'Finality: Solana requires 32 confirmations for Wormhole guardian attestation',
        ],
        codeExample: `// Custom bridge: lock tokens on Solana
#[account]
pub struct BridgeConfig {
    pub authority: Pubkey,
    pub vault: Pubkey,
    pub wormhole_bridge: Pubkey,   // Wormhole core bridge program
    pub wormhole_token_bridge: Pubkey,
    pub target_chain: u16,         // Chain ID of destination (e.g. 2 = ETH)
    pub target_contract: [u8; 32], // EVM contract address (32 bytes padded)
    pub nonce: u32,
    pub bump: u8,
}

pub fn lock_and_bridge(
    ctx: Context<LockAndBridge>,
    amount: u64,
    recipient: [u8; 20], // EVM address
) -> Result<()> {
    // 1. Transfer tokens to vault
    token::transfer(/* maker -> vault */, amount)?;

    // 2. Publish Wormhole message
    // Encode payload: (amount: u64 LE, recipient: [u8; 20])
    let mut payload = Vec::with_capacity(28);
    payload.extend_from_slice(&amount.to_le_bytes());
    payload.extend_from_slice(&recipient);

    wormhole_anchor_sdk::wormhole::post_message(
        /* wormhole accounts */,
        ctx.accounts.config.nonce,
        payload,
        wormhole_anchor_sdk::wormhole::Finality::Confirmed,
    )?;
    ctx.accounts.config.nonce += 1;
    Ok(())
}`,
        commonMistakes: [
          'Not incrementing nonce — each bridge message needs a unique nonce to prevent duplicate VAA verification',
          'Using Finality::Processed instead of Confirmed — guardians require higher finality for security',
        ],
        practicePrompt: 'Build the Solana lock program. Test: user locks 100 tokens, assert vault balance = 100, assert Wormhole sequence emitted. Document the full bridge architecture.',
      }),
      makeTask("p7w4d3", 7, 32, 3, "Bridge: Cross-Chain Message Passing", "Implement bidirectional cross-chain messaging using Wormhole for arbitrary data.", 4, "project", { url: "https://docs.wormhole.com/", label: "Wormhole Docs", platform: "docs" }, {
        keyPoints: [
          'Wormhole can pass arbitrary bytes (not just tokens) — use for cross-chain governance, oracles, etc.',
          'Message verification: parse VAA, check guardian signatures, check emitter chain/address',
          'Replay protection: store processed VAA hashes in a ProcessedVAA PDA',
          'Cross-chain DAO: vote on ETH, execute on Solana via Wormhole message',
          'Wormhole relayers: automatic delivery of messages without user interaction',
        ],
        codeExample: `// Receive and verify Wormhole message on Solana
pub fn receive_message(
    ctx: Context<ReceiveMessage>,
    vaa_hash: [u8; 32],
) -> Result<()> {
    let msg = ctx.accounts.posted.message().data();

    // Replay protection
    require!(
        !ctx.accounts.processed_vaa.processed,
        ErrorCode::AlreadyProcessed
    );
    ctx.accounts.processed_vaa.processed = true;
    ctx.accounts.processed_vaa.vaa_hash = vaa_hash;

    // Verify emitter is our trusted ETH contract
    let emitter = ctx.accounts.posted.meta().emitter_address;
    require!(
        emitter == ctx.accounts.config.trusted_emitter,
        ErrorCode::UntrustedEmitter
    );

    // Parse and execute the cross-chain instruction
    let payload = parse_payload(msg)?;
    match payload.action {
        Action::UpdateFee { new_fee } => {
            ctx.accounts.protocol_config.fee_bps = new_fee;
        },
        Action::PauseProtocol => {
            ctx.accounts.protocol_config.paused = true;
        },
    }
    Ok(())
}`,
        commonMistakes: [
          'Not verifying the emitter address — any chain could send malicious messages if emitter is not checked',
          'No replay protection — same VAA can be submitted multiple times executing the action repeatedly',
        ],
        practicePrompt: 'Build a cross-chain DAO: votes happen on Ethereum, execution happens on Solana. Deploy to testnets. Vote on Ethereum, relay VAA, execute on Solana. Document the full pipeline.',
      }),
      makeTask("p7w4d4", 7, 32, 4, "ZK+Solana: Groth16 Verifier on Solana", "Deploy a Groth16 verifier program on Solana and verify ZK proofs on-chain.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Solana has native precompiles for BN254 (Groth16) operations via syscalls',
          'alt_bn128_pairing: native pairing check for Groth16 verification',
          'Groth16 verify: e(A, B) == e(alpha, beta) * e(vk_x, gamma) * e(C, delta)',
          'Public inputs must be committed to vk_x before verification',
          'Circuit-specific VK is uploaded once; proof is verified per transaction',
        ],
        codeExample: `use solana_program::alt_bn128::prelude::*;

pub fn verify_groth16_proof(
    ctx: Context<VerifyProof>,
    proof_a: [u8; 64],    // G1 point
    proof_b: [u8; 128],   // G2 point
    proof_c: [u8; 64],    // G1 point
    public_inputs: Vec<[u8; 32]>,
) -> Result<()> {
    let vk = &ctx.accounts.verifying_key;

    // Compute vk_x = vk_gamma_abc[0] + sum(pub_input[i] * vk_gamma_abc[i+1])
    let mut vk_x = vk.gamma_abc[0];
    for (i, input) in public_inputs.iter().enumerate() {
        let mul_result = alt_bn128_multiplication(
            &[vk.gamma_abc[i + 1].as_ref(), input.as_ref()].concat()
        ).map_err(|_| error!(ErrorCode::BN128Error))?;
        vk_x = alt_bn128_addition(&[vk_x.as_ref(), mul_result.as_ref()].concat())
            .map_err(|_| error!(ErrorCode::BN128Error))?
            .try_into().unwrap();
    }

    // Pairing check: e(A,B) * e(-alpha, beta) * e(-vk_x, gamma) * e(-C, delta) == 1
    let pairing_input = build_pairing_input(&proof_a, &proof_b, &vk_x, vk, &proof_c);
    let result = alt_bn128_pairing(&pairing_input)
        .map_err(|_| error!(ErrorCode::PairingFailed))?;
    require!(result[31] == 1, ErrorCode::InvalidProof);
    Ok(())
}`,
        commonMistakes: [
          'Using soft (non-native) BN254 implementation — 100x more expensive in CUs than the native syscalls',
          'Not negating A or alpha in the pairing check — Groth16 verification requires specific negations in the equation',
        ],
        practicePrompt: 'Write a Circom circuit for "I know x such that x^2 = y (public)". Generate a Groth16 proof with snarkjs. Submit and verify the proof on your Solana devnet verifier program.',
      }),
      makeTask("p7w4d5", 7, 32, 5, "ZK+Solana: Private Transaction Circuit", "Build a Circom circuit for private transfers and verify it on Solana.", 4, "project", { url: "https://docs.circom.io/", label: "Circom Documentation", platform: "docs" }, {
        keyPoints: [
          'Private transfer: prove ownership of note commitment without revealing amount or recipient',
          'Note = hash(amount, recipient, nonce) — commitment stored on-chain',
          'Nullifier = hash(note, secret_key) — prevents double-spending',
          'Circuit inputs: note (private), recipient (private), merkle_path (private), root (public), nullifier (public)',
          'On-chain: store Merkle root of note commitments, set of spent nullifiers',
        ],
        codeExample: `pragma circom 2.0.0;
include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/mux1.circom";

template PrivateTransfer(merkle_depth) {
    // Public inputs
    signal input root;          // current Merkle root of commitments
    signal input nullifier_hash; // H(note || secret_key)
    signal input new_commitment; // commitment for recipient

    // Private inputs
    signal input amount;
    signal input secret_key;
    signal input nonce;
    signal input merkle_path[merkle_depth];
    signal input merkle_indices[merkle_depth];

    // 1. Reconstruct note commitment
    component note_hash = Poseidon(3);
    note_hash.inputs[0] <== amount;
    note_hash.inputs[1] <== nonce;
    note_hash.inputs[2] <== secret_key;

    // 2. Verify Merkle inclusion
    // (use MerkleProof template from Phase 9 example)

    // 3. Verify nullifier
    component null_hash = Poseidon(2);
    null_hash.inputs[0] <== note_hash.out;
    null_hash.inputs[1] <== secret_key;
    nullifier_hash === null_hash.out;
}`,
        commonMistakes: [
          'Not including nullifier in circuit — amount can be double-spent without nullifier tracking',
          'Exposing recipient in public inputs — defeats the privacy of the transaction',
        ],
        practicePrompt: 'Complete the PrivateTransfer circuit. Compile with circom. Generate a proof. Submit and verify on your Solana verifier program from the previous task. Document the full flow.',
      }),
      makeTask("p7w4d6", 7, 32, 6, "ZK+Solana: Full Proof Pipeline", "Build the complete ZK+Solana pipeline: circuit → proof → on-chain verification → state update.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Full flow: user generates proof off-chain → submits proof + public inputs to Solana → program verifies → updates state',
          'NullifierSet PDA: stores spent nullifiers, checked on every spend',
          'CommitmentTree PDA: append-only Merkle tree of deposits',
          'Deposit: hash(amount, recipient, nonce) → store commitment',
          'Withdraw: submit proof → verify → mark nullifier spent → transfer tokens',
        ],
        codeExample: `// Full ZK private transfer program
pub fn deposit(ctx: Context<Deposit>, commitment: [u8; 32], amount: u64) -> Result<()> {
    // Accept tokens from user
    token::transfer(/* user -> vault */, amount)?;
    // Append commitment to Merkle tree
    let tree = &mut ctx.accounts.commitment_tree;
    tree.append(commitment)?;
    emit!(DepositEvent { commitment, amount, index: tree.next_index - 1 });
    Ok(())
}

pub fn withdraw(
    ctx: Context<Withdraw>,
    proof_a: [u8; 64],
    proof_b: [u8; 128],
    proof_c: [u8; 64],
    root: [u8; 32],
    nullifier_hash: [u8; 32],
    recipient: Pubkey,
    amount: u64,
) -> Result<()> {
    // Verify root exists in history (support old roots)
    require!(ctx.accounts.commitment_tree.is_known_root(root), ErrorCode::UnknownRoot);
    // Check nullifier not spent
    require!(!ctx.accounts.nullifier_set.is_spent(nullifier_hash), ErrorCode::NoteAlreadySpent);
    // Verify Groth16 proof
    verify_proof(&proof_a, &proof_b, &proof_c, &[root, nullifier_hash, recipient.to_bytes()])?;
    // Mark nullifier as spent
    ctx.accounts.nullifier_set.mark_spent(nullifier_hash);
    // Transfer tokens to recipient
    Ok(())
}`,
        commonMistakes: [
          'Only accepting the current Merkle root — deposits between transactions leave the root stale; store root history',
          'Verifying root after marking nullifier spent — nullifier gets marked even if root check fails',
        ],
        practicePrompt: 'Complete the full pipeline. Deposit 100 tokens. Generate a withdrawal proof. Submit and verify on devnet. Assert recipient received 100 tokens and nullifier is marked spent.',
      }),
      makeTask("p7w4d7", 7, 32, 7, "Portfolio Polish: README, Deploy, Demo Video", "Polish all 10 projects and prepare your Solana portfolio for job applications.", 4, "project", { url: "https://solana.com/developers", label: "Solana Developers", platform: "docs" }, {
        keyPoints: [
          'Each project needs: star-worthy README, devnet deployment, working tests, CI badge',
          'GitHub profile README: highlight the 10 projects with links and brief descriptions',
          'Demo videos: 1-2 minutes per project showing the happy-path flow',
          'Technical blog post: "I built 10 Solana programs in 4 months" — publish on Medium or dev.to',
          'Portfolio stats: total programs deployed, total test coverage, total lines of Rust',
        ],
        codeExample: `# Phase 7 Portfolio Checklist

## GitHub Profile README
\`\`\`markdown
## Solana Developer Portfolio

| Project | Description | Devnet | Tests | CI |
|---------|-------------|--------|-------|----|
| Token Launch | SPL token with vesting + Merkle airdrop | [Explorer](link) | 15 tests | ✅ |
| NFT Mint | Metaplex collection with royalties + reveal | [Explorer](link) | 12 tests | ✅ |
| DEX | Constant product AMM with multi-hop routing | [Explorer](link) | 20 tests | ✅ |
| Staking | Token staking with lock tiers + VeToken | [Explorer](link) | 18 tests | ✅ |
| DAO | Token-weighted governance with timelock | [Explorer](link) | 22 tests | ✅ |
| Escrow | P2P swap + streaming time-lock | [Explorer](link) | 14 tests | ✅ |
| Lending | Collateral lending + liquidation engine | [Explorer](link) | 25 tests | ✅ |
| Lottery | VRF-powered provably fair lottery | [Explorer](link) | 10 tests | ✅ |
| Bridge | Wormhole cross-chain token bridge | [Explorer](link) | 8 tests | ✅ |
| ZK Privacy | Circom circuit + on-chain Groth16 verifier | [Explorer](link) | 6 tests | ✅ |
\`\`\``,
        commonMistakes: [
          'Skipping demo videos — reviewers spend < 2 minutes per project; a video is worth 1000 lines of README',
          'Leaving broken tests in CI — a red CI badge is worse than no CI badge',
        ],
        practicePrompt: 'Complete the portfolio table in your GitHub profile README. Record demo videos for your 3 favorite projects. Write the blog post and publish it. Share all links in your portfolio document.',
      }),
    ],
  },
]

// ─── Phase 8: Price Oracle Blockchain (Weeks 33–36) ──────────────────────────
const phase8Weeks: Week[] = [
  // Week 33 — P2P Networking
  {
    weekNumber: 33,
    phaseWeek: 1,
    phaseId: 8,
    title: "P2P Networking with libp2p",
    goal: "Build the networking layer of your custom blockchain.",
    isCompleted: false,
    tasks: [
      makeTask("p8w1d1", 8, 33, 1, "libp2p: Node Identity & Keypairs", "Generate node identity keypairs, understand PeerIds, and set up the basic libp2p node structure.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'PeerId = hash of Ed25519 or secp256k1 public key — globally unique node identifier',
          'Keypair is generated once and persisted to disk for node identity continuity',
          'Multiaddr: libp2p address format — /ip4/127.0.0.1/tcp/8000/p2p/<PeerId>',
          'Noise protocol: libp2p default encryption layer for all connections',
          'yamux: multiplexing protocol allowing multiple streams over one TCP connection',
        ],
        codeExample: `use libp2p::{identity, PeerId};

pub struct NodeIdentity {
    pub keypair: identity::Keypair,
    pub peer_id: PeerId,
}

impl NodeIdentity {
    pub fn generate() -> Self {
        let keypair = identity::Keypair::generate_ed25519();
        let peer_id = PeerId::from(keypair.public());
        Self { keypair, peer_id }
    }

    pub fn from_file(path: &str) -> anyhow::Result<Self> {
        let bytes = std::fs::read(path)?;
        let keypair = identity::Keypair::from_protobuf_encoding(&bytes)?;
        let peer_id = PeerId::from(keypair.public());
        Ok(Self { keypair, peer_id })
    }

    pub fn save_to_file(&self, path: &str) -> anyhow::Result<()> {
        let bytes = self.keypair.to_protobuf_encoding()?;
        std::fs::write(path, bytes)?;
        Ok(())
    }
}

pub fn build_transport(keypair: &identity::Keypair) -> libp2p::core::transport::Boxed<(PeerId, libp2p::core::muxing::StreamMuxerBox)> {
    let noise_keys = libp2p::noise::Keypair::<libp2p::noise::X25519Spec>::new()
        .into_authentic(keypair).unwrap();
    libp2p::tcp::TokioTcpConfig::new()
        .upgrade(libp2p::core::upgrade::Version::V1)
        .authenticate(libp2p::noise::NoiseConfig::xx(noise_keys).into_authenticated())
        .multiplex(libp2p::yamux::YamuxConfig::default())
        .boxed()
}`,
        commonMistakes: [
          'Generating a new keypair on every restart — node gets a new PeerId each time, peers cannot reconnect',
          'Using TcpConfig instead of TokioTcpConfig — must use Tokio-specific transport when running on Tokio runtime',
        ],
        practicePrompt: 'Build a CLI that generates or loads a node identity from a file. Print the PeerId and local multiaddr. Verify determinism: same file = same PeerId across restarts.',
      }),
      makeTask("p8w1d2", 8, 33, 2, "Swarm & Transport Setup", "Initialize a libp2p Swarm with TCP transport and configure listening addresses.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'Swarm is the central coordinator: drives both the transport and the NetworkBehaviour',
          'NetworkBehaviour trait: defines how the node reacts to network events',
          'SwarmEvent: covers everything from new connections to protocol messages',
          'listen_on: bind to a multiaddr to accept incoming connections',
          'dial: initiate outgoing connection to another node multiaddr',
        ],
        codeExample: `use libp2p::{Swarm, swarm::{SwarmBuilder, SwarmEvent}};
use tokio::select;

pub async fn run_node(identity: NodeIdentity, listen_addr: libp2p::Multiaddr) -> anyhow::Result<()> {
    let transport = build_transport(&identity.keypair);
    let behaviour = OracleBehaviour::new(identity.peer_id);

    let mut swarm = SwarmBuilder::with_tokio_executor(
        transport,
        behaviour,
        identity.peer_id,
    ).build();

    swarm.listen_on(listen_addr)?;

    loop {
        select! {
            event = swarm.select_next_some() => {
                match event {
                    SwarmEvent::NewListenAddr { address, .. } => {
                        println!("Listening on: {address}");
                    }
                    SwarmEvent::ConnectionEstablished { peer_id, .. } => {
                        println!("Connected to: {peer_id}");
                    }
                    SwarmEvent::ConnectionClosed { peer_id, cause, .. } => {
                        eprintln!("Disconnected from {peer_id}: {cause:?}");
                    }
                    SwarmEvent::Behaviour(event) => {
                        handle_behaviour_event(&mut swarm, event).await?;
                    }
                    _ => {}
                }
            }
        }
    }
}`,
        commonMistakes: [
          'Blocking in the Swarm event loop — the loop must be non-blocking; use async/await throughout',
          'Not handling ConnectionClosed — nodes must detect peer loss and reconnect or remove from peer list',
        ],
        practicePrompt: 'Start two nodes on localhost:8000 and localhost:8001. Have node B dial node A. Verify both see ConnectionEstablished in their logs. Print connected peers every 5 seconds.',
      }),
      makeTask("p8w1d3", 8, 33, 3, "Peer Discovery with Kademlia DHT", "Set up Kademlia DHT for peer discovery without a centralized bootstrap list.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'Kademlia DHT: distributed peer discovery using XOR distance metric',
          'Bootstrap: dial at least one known peer to join the DHT',
          'Kademlia::bootstrap() triggers peer discovery from known peers',
          'GET_CLOSEST_PEERS: find nodes closest to a target key in the DHT',
          'Record storage: Kademlia can also store key-value records for peer routing',
        ],
        codeExample: `use libp2p::kad::{Kademlia, KademliaConfig, KademliaEvent, store::MemoryStore};
use libp2p::{Multiaddr, PeerId};

pub struct OracleBehaviour {
    pub kademlia: Kademlia<MemoryStore>,
}

impl OracleBehaviour {
    pub fn new(peer_id: PeerId) -> Self {
        let store = MemoryStore::new(peer_id);
        let kademlia = Kademlia::with_config(peer_id, store, KademliaConfig::default());
        Self { kademlia }
    }

    pub fn add_bootstrap_peer(&mut self, peer_id: PeerId, addr: Multiaddr) {
        self.kademlia.add_address(&peer_id, addr);
    }

    pub fn start_discovery(&mut self) {
        self.kademlia.bootstrap().expect("bootstrap failed");
    }
}

fn handle_kademlia_event(event: KademliaEvent) {
    match event {
        KademliaEvent::RoutingUpdated { peer, .. } => {
            println!("Discovered peer: {peer}");
        }
        KademliaEvent::OutboundQueryProgressed { result, .. } => {
            if let libp2p::kad::QueryResult::Bootstrap(Ok(_)) = result {
                println!("Bootstrap complete");
            }
        }
        _ => {}
    }
}`,
        commonMistakes: [
          'Not calling bootstrap() after adding addresses — addresses in routing table are not queried until triggered',
          'Using a single bootstrap peer with no fallback — if that peer is offline, new nodes cannot join',
        ],
        practicePrompt: 'Start 5 nodes. Bootstrap from one known peer. After 5 seconds, assert each node has at least 3 others in its Kademlia routing table.',
      }),
      makeTask("p8w1d4", 8, 33, 4, "Gossipsub for Message Broadcasting", "Implement Gossipsub for broadcasting new blocks and transactions across the network.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'Gossipsub: epidemic broadcast protocol — each node forwards to a subset of peers',
          'Topics: pub/sub channels (e.g., "new-blocks", "new-transactions", "oracle-prices")',
          'Message deduplication: Gossipsub tracks seen message IDs to prevent floods',
          'Mesh: each node maintains a mesh of 6-12 peers per topic for reliability',
          'Scoring: slow or duplicate-sending peers get lower score and less mesh priority',
        ],
        codeExample: `use libp2p::gossipsub::{
    Gossipsub, GossipsubConfigBuilder, GossipsubEvent,
    IdentTopic, MessageAuthenticity, ValidationMode,
};
use std::time::Duration;

pub fn build_gossipsub(keypair: &libp2p::identity::Keypair) -> Gossipsub {
    let config = GossipsubConfigBuilder::default()
        .heartbeat_interval(Duration::from_secs(1))
        .validation_mode(ValidationMode::Strict)
        .build()
        .expect("config build failed");

    let mut gs = Gossipsub::new(
        MessageAuthenticity::Signed(keypair.clone()),
        config,
    ).expect("gossipsub create failed");

    gs.subscribe(&IdentTopic::new("new-blocks")).unwrap();
    gs.subscribe(&IdentTopic::new("oracle-prices")).unwrap();
    gs
}

pub fn broadcast_block(gs: &mut Gossipsub, block: &Block) -> anyhow::Result<()> {
    let data = bincode::serialize(block)?;
    gs.publish(IdentTopic::new("new-blocks"), data)?;
    Ok(())
}`,
        commonMistakes: [
          'Not subscribing to topics before publishing — publishing to an unsubscribed topic has no effect',
          'Using ContentTopic instead of IdentTopic when signing is required',
        ],
        practicePrompt: 'Start 5 nodes all subscribed to "oracle-prices". Broadcast a price update from node 1. Assert all 5 nodes receive it within 500ms.',
      }),
      makeTask("p8w1d5", 8, 33, 5, "Request/Response Protocol", "Implement a custom request/response protocol for block sync and peer queries.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'RequestResponse behaviour: typed RPC between two specific peers',
          'Define Request and Response types: GetBlock(hash) returns BlockResponse',
          'ResponseChannel: one-time channel for sending the response back to requester',
          'Timeout: configure request_timeout (e.g. 10 seconds) for block sync',
          'Multiple outstanding requests: RequestResponse tracks them by RequestId',
        ],
        codeExample: `use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum BlockRequest {
    GetBlock { hash: [u8; 32] },
    GetBlockRange { from: u64, to: u64 },
    GetLatestBlock,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum BlockResponse {
    Block(Option<Block>),
    Blocks(Vec<Block>),
    Error(String),
}

// Usage in behaviour handler:
impl OracleBehaviour {
    pub fn request_block(&mut self, peer: PeerId, hash: [u8; 32]) {
        self.request_response.send_request(&peer, BlockRequest::GetBlock { hash });
    }

    pub fn handle_block_request(
        &mut self,
        channel: libp2p::request_response::ResponseChannel<BlockResponse>,
        req: BlockRequest,
    ) {
        let response = match req {
            BlockRequest::GetBlock { hash } => {
                BlockResponse::Block(self.chain.blocks.get(&hash).cloned())
            }
            BlockRequest::GetLatestBlock => {
                BlockResponse::Block(self.chain.blocks.get(&self.chain.head_hash).cloned())
            }
            BlockRequest::GetBlockRange { from, to } => {
                let blocks = (from..=to)
                    .filter_map(|h| self.chain.get_block_at_height(h).cloned())
                    .collect();
                BlockResponse::Blocks(blocks)
            }
        };
        let _ = self.request_response.send_response(channel, response);
    }
}`,
        commonMistakes: [
          'Not responding to requests — the ResponseChannel drops after timeout causing requester to fail silently',
          'Sending large block ranges in a single response — paginate large responses to avoid message size limits',
        ],
        practicePrompt: 'Implement GetBlockRange sync: new node starts empty, finds peers, requests blocks 0-100 in chunks of 10. Assert local chain has all 100 blocks after sync.',
      }),
      makeTask("p8w1d6", 8, 33, 6, "Peer Store & Connection Management", "Build a peer manager that tracks peer states, scores, and reconnects to lost validators.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'PeerStore: in-memory map of PeerId to PeerInfo (addresses, last_seen, score)',
          'Validator set: known validators that must stay connected for consensus',
          'Reconnect logic: if validator disconnects, attempt reconnect with exponential backoff',
          'Max connections: cap total connections to avoid file descriptor exhaustion',
          'Peer banning: block malicious peers by PeerId to prevent spam attacks',
        ],
        codeExample: `use std::collections::{HashMap, HashSet};
use libp2p::{Multiaddr, PeerId};

#[derive(Debug, Clone)]
pub struct PeerInfo {
    pub peer_id: PeerId,
    pub addresses: Vec<Multiaddr>,
    pub last_seen: std::time::Instant,
    pub is_validator: bool,
    pub score: i32,
    pub reconnect_attempts: u32,
}

pub struct PeerManager {
    peers: HashMap<PeerId, PeerInfo>,
    validators: Vec<PeerId>,
    banned: HashSet<PeerId>,
    max_connections: usize,
}

impl PeerManager {
    pub fn on_disconnect(&mut self, peer_id: &PeerId) {
        if self.validators.contains(peer_id) {
            let attempts = self.peers.get(peer_id)
                .map(|p| p.reconnect_attempts).unwrap_or(0);
            let delay_secs = 2u64.pow(attempts.min(6));
            println!("Validator {peer_id} disconnected, retry in {delay_secs}s");
        }
    }

    pub fn should_accept(&self, peer_id: &PeerId) -> bool {
        !self.banned.contains(peer_id) && self.peers.len() < self.max_connections
    }

    pub fn update_score(&mut self, peer_id: &PeerId, delta: i32) {
        if let Some(peer) = self.peers.get_mut(peer_id) {
            peer.score = peer.score.saturating_add(delta);
            if peer.score < -100 {
                self.banned.insert(*peer_id);
            }
        }
    }
}`,
        commonMistakes: [
          'Not capping max_connections — each connection uses a file descriptor; default OS limit is 1024',
          'Reconnecting immediately on disconnect — use exponential backoff to prevent storm reconnects',
        ],
        practicePrompt: 'Implement peer scoring: +10 for valid block, -50 for invalid block, ban at -100. Test: peer sends 3 invalid blocks, assert banned, reconnection refused.',
      }),
      makeTask("p8w1d7", 8, 33, 7, "P2P Integration Test: 3-Node Network", "Write an integration test spinning up 3 nodes, forming a network, and broadcasting a message.", 4, "coding", { url: "https://libp2p.io/", label: "libp2p Documentation", platform: "docs" }, {
        keyPoints: [
          'Use tokio::time::timeout to assert messages arrive within expected time bounds',
          'tokio::spawn separate task per node — each runs its own event loop',
          'Use mpsc channels to communicate between the test and node tasks',
          'Port 0: use OS-assigned ports in tests to avoid conflicts',
          'Test teardown: nodes must be stopped cleanly to avoid port conflicts in subsequent tests',
        ],
        codeExample: `#[tokio::test]
async fn test_three_node_gossip() {
    use tokio::{sync::mpsc, time::{timeout, Duration}};

    let (tx1, mut rx1) = mpsc::channel::<u64>(100);
    let (tx2, mut rx2) = mpsc::channel::<u64>(100);
    let (tx3, mut rx3) = mpsc::channel::<u64>(100);

    // Start 3 nodes on OS-assigned ports
    let h1 = tokio::spawn(run_test_node(id1, tx1));
    let h2 = tokio::spawn(run_test_node(id2, tx2));
    let h3 = tokio::spawn(run_test_node(id3, tx3));

    // Wait for nodes to start
    tokio::time::sleep(Duration::from_millis(300)).await;

    // Connect: node2 -> node1, node3 -> node2
    node2_ctrl.dial(node1_addr.clone()).await;
    node3_ctrl.dial(node2_addr.clone()).await;
    tokio::time::sleep(Duration::from_millis(200)).await;

    // Broadcast price from node1
    node1_ctrl.broadcast_price(100u64).await;

    // All nodes should receive within 1 second
    let r2 = timeout(Duration::from_secs(1), rx2.recv()).await;
    let r3 = timeout(Duration::from_secs(1), rx3.recv()).await;
    assert_eq!(r2.unwrap().unwrap(), 100, "node2 wrong value");
    assert_eq!(r3.unwrap().unwrap(), 100, "node3 wrong value");
}`,
        commonMistakes: [
          'Using fixed ports in tests — parallel test runs cause "address already in use" errors',
          'Not waiting for peers to connect before broadcasting — messages before mesh forms are dropped',
        ],
        practicePrompt: 'Write the 3-node integration test. Run it 5 times. Fix any timing flakiness. Run cargo test --test integration -- --nocapture to see logs.',
      }),
    ],
  },

  // Week 34 — Block Structure & Transactions
  {
    weekNumber: 34,
    phaseWeek: 2,
    phaseId: 8,
    title: "Block Structure & Transaction Model",
    goal: "Design and implement the blockchain data structures.",
    isCompleted: false,
    tasks: [
      makeTask("p8w2d1", 8, 34, 1, "Block Header: Hash, Prev_hash, Timestamp", "Design and implement the Block data structure with cryptographic linking.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Block header: index, timestamp, prev_hash, merkle_root, validator, signature',
          'Block hash = SHA-256 of the serialized header (not including the signature)',
          'Genesis block: prev_hash = [0u8; 32], index = 0',
          'Timestamp: Unix timestamp in milliseconds for sub-second resolution',
          'Use bincode for binary serialization or serde_json for debugging',
        ],
        codeExample: `use sha2::{Sha256, Digest};
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlockHeader {
    pub index: u64,
    pub timestamp: u64,
    pub prev_hash: [u8; 32],
    pub merkle_root: [u8; 32],
    pub validator: [u8; 33],     // compressed secp256k1 pubkey
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    pub header: BlockHeader,
    pub transactions: Vec<Transaction>,
    pub hash: [u8; 32],
    pub signature: Vec<u8>,
}

impl Block {
    pub fn compute_hash(header: &BlockHeader) -> [u8; 32] {
        let serialized = bincode::serialize(header).expect("serialize failed");
        let mut hasher = Sha256::new();
        hasher.update(&serialized);
        hasher.finalize().into()
    }

    pub fn genesis() -> Self {
        let header = BlockHeader {
            index: 0,
            timestamp: 0,
            prev_hash: [0u8; 32],
            merkle_root: [0u8; 32],
            validator: [0u8; 33],
        };
        let hash = Self::compute_hash(&header);
        Block { header, transactions: vec![], hash, signature: vec![] }
    }

    pub fn validate_hash(&self) -> bool {
        self.hash == Self::compute_hash(&self.header)
    }
}`,
        commonMistakes: [
          'Including the hash field in the hash computation — circular; hash only the header fields',
          'Using SystemTime for timestamps in tests — flaky; mock the clock for deterministic tests',
        ],
        practicePrompt: 'Create genesis block and a create_next_block function. Write a test: create 10 blocks and verify chain linkage (each prev_hash matches previous hash).',
      }),
      makeTask("p8w2d2", 8, 34, 2, "Merkle Tree Implementation in Rust", "Implement a binary Merkle tree for transaction inclusion proofs.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Merkle root = SHA-256(left_child_hash || right_child_hash) recursively',
          'Odd number of leaves: duplicate the last leaf to make even',
          'Merkle proof: Vec of sibling hashes from leaf to root',
          'verify_proof: recompute root from leaf and proof, compare to known root',
          'Empty tree: root = [0u8; 32]',
        ],
        codeExample: `use sha2::{Sha256, Digest};

pub struct MerkleTree {
    pub leaves: Vec<[u8; 32]>,
    pub root: [u8; 32],
}

impl MerkleTree {
    pub fn new(leaves: Vec<[u8; 32]>) -> Self {
        let root = Self::build_root(&leaves);
        Self { leaves, root }
    }

    fn build_root(leaves: &[[u8; 32]]) -> [u8; 32] {
        if leaves.is_empty() { return [0u8; 32]; }
        if leaves.len() == 1 { return leaves[0]; }
        let mut level: Vec<[u8; 32]> = leaves.to_vec();
        while level.len() > 1 {
            if level.len() % 2 != 0 {
                level.push(*level.last().unwrap());
            }
            level = level.chunks(2)
                .map(|pair| hash_pair(pair[0], pair[1]))
                .collect();
        }
        level[0]
    }

    pub fn generate_proof(&self, index: usize) -> Vec<[u8; 32]> {
        let mut proof = vec![];
        let mut idx = index;
        let mut level = self.leaves.clone();
        while level.len() > 1 {
            if level.len() % 2 != 0 { level.push(*level.last().unwrap()); }
            let sibling = if idx % 2 == 0 { level[idx + 1] } else { level[idx - 1] };
            proof.push(sibling);
            idx /= 2;
            level = level.chunks(2).map(|p| hash_pair(p[0], p[1])).collect();
        }
        proof
    }
}

fn hash_pair(a: [u8; 32], b: [u8; 32]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(a);
    hasher.update(b);
    hasher.finalize().into()
}`,
        commonMistakes: [
          'Not duplicating the last leaf for odd-length arrays — produces incorrect root and invalid proofs',
          'Wrong sibling ordering in proof verification — sibling direction must be stored (left/right)',
        ],
        practicePrompt: 'Create a Merkle tree with 8 transactions. Generate proof for tx[3]. Verify the proof. Tamper with tx[3] data and assert the proof is now invalid.',
      }),
      makeTask("p8w2d3", 8, 34, 3, "Transaction Model: From/To/Amount/Sig", "Design the transaction structure and implement serialization for the mempool.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Transaction fields: from (pubkey), to (pubkey), amount (u64), nonce (u64), fee, signature',
          'Transaction hash = SHA-256(from || to || amount || nonce || fee) — deterministic',
          'Nonce prevents replay: each account has a monotonically increasing nonce',
          'Signature covers the hash — verifiable by anyone with the public key',
          'Fee = amount * fee_rate — incentivizes validators to include transactions',
        ],
        codeExample: `use sha2::{Sha256, Digest};
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub from: [u8; 33],
    pub to: [u8; 33],
    pub amount: u64,
    pub nonce: u64,
    pub fee: u64,
    pub signature: Vec<u8>,
}

impl Transaction {
    pub fn hash(&self) -> [u8; 32] {
        let mut hasher = Sha256::new();
        hasher.update(&self.from);
        hasher.update(&self.to);
        hasher.update(self.amount.to_le_bytes());
        hasher.update(self.nonce.to_le_bytes());
        hasher.update(self.fee.to_le_bytes());
        hasher.finalize().into()
    }

    pub fn verify(&self) -> bool {
        use k256::ecdsa::{VerifyingKey, Signature, signature::Verifier};
        let vk = VerifyingKey::from_sec1_bytes(&self.from).ok();
        let sig = Signature::from_bytes(self.signature.as_slice().into()).ok();
        match (vk, sig) {
            (Some(vk), Some(sig)) => vk.verify(&self.hash(), &sig).is_ok(),
            _ => false,
        }
    }
}`,
        commonMistakes: [
          'Not including nonce in the hash — enables replay attacks where the same tx can be submitted repeatedly',
          'Verifying signature without nonce state check — old nonce tx passes sig verification but should be rejected',
        ],
        practicePrompt: 'Create 5 transactions from Alice to Bob with nonces 0-4. Verify all pass. Replay nonce 2 and assert the state machine rejects it.',
      }),
      makeTask("p8w2d4", 8, 34, 4, "ECDSA Signing with k256 Crate", "Implement account key generation, signing, and verification using secp256k1.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'k256 crate: secp256k1 implementation (same curve as Bitcoin/Ethereum)',
          'SigningKey: private key for signing; VerifyingKey: public key for verification',
          'Address = hash of verifying_key (last 20 bytes of SHA256 of compressed pubkey)',
          'Deterministic signing: k256 uses RFC6979 — same message gives same signature',
          'Key persistence: store secret key bytes securely, never in plaintext in production',
        ],
        codeExample: `use k256::ecdsa::{SigningKey, VerifyingKey, Signature, signature::{Signer, Verifier}};
use rand::rngs::OsRng;
use sha2::{Sha256, Digest};

pub struct Account {
    pub signing_key: SigningKey,
    pub address: [u8; 20],
}

impl Account {
    pub fn generate() -> Self {
        let signing_key = SigningKey::random(&mut OsRng);
        let address = compute_address(signing_key.verifying_key());
        Self { signing_key, address }
    }

    pub fn public_key_bytes(&self) -> [u8; 33] {
        self.signing_key.verifying_key()
            .to_sec1_bytes().as_ref().try_into().unwrap()
    }

    pub fn sign(&self, message: &[u8]) -> Vec<u8> {
        let sig: Signature = self.signing_key.sign(message);
        sig.to_bytes().to_vec()
    }
}

fn compute_address(vk: &VerifyingKey) -> [u8; 20] {
    let compressed = vk.to_sec1_bytes();
    let hash = Sha256::digest(&compressed);
    hash[12..].try_into().unwrap()
}`,
        commonMistakes: [
          'Using rand::thread_rng() for key generation — must use OsRng for cryptographic key material',
          'Storing private keys in plain text — always encrypt at rest in any non-demo environment',
        ],
        practicePrompt: 'Generate 3 accounts. Sign the same message with each. Verify all 3. Tamper with the message and assert all 3 verifications fail.',
      }),
      makeTask("p8w2d5", 8, 34, 5, "Block Validation Logic", "Implement the complete block validation function checking hash, signature, and transactions.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Validation order: header format, prev_hash linkage, hash correctness, validator signature, tx validation',
          'Validator must be in the authorized validator set',
          'All transactions must pass signature verification',
          'No duplicate nonces within a block',
          'Merkle root must match actual transaction hashes',
        ],
        codeExample: `#[derive(Debug)]
pub enum ValidationError {
    InvalidPrevHash,
    InvalidHash,
    InvalidValidatorSignature,
    UnauthorizedValidator,
    InvalidTransaction { index: usize, reason: String },
    InvalidMerkleRoot,
}

pub fn validate_block(
    block: &Block,
    prev_block: &Block,
    validator_set: &[[u8; 33]],
) -> Result<(), ValidationError> {
    if block.header.prev_hash != prev_block.hash {
        return Err(ValidationError::InvalidPrevHash);
    }
    if block.hash != Block::compute_hash(&block.header) {
        return Err(ValidationError::InvalidHash);
    }
    if !validator_set.contains(&block.header.validator) {
        return Err(ValidationError::UnauthorizedValidator);
    }
    let sig_ok = verify_sig(&block.header.validator, &block.hash, &block.signature);
    if !sig_ok { return Err(ValidationError::InvalidValidatorSignature); }

    for (i, tx) in block.transactions.iter().enumerate() {
        if !tx.verify() {
            return Err(ValidationError::InvalidTransaction {
                index: i, reason: "invalid signature".to_string()
            });
        }
    }
    let leaves: Vec<[u8; 32]> = block.transactions.iter().map(|tx| tx.hash()).collect();
    let expected_root = MerkleTree::new(leaves).root;
    if block.header.merkle_root != expected_root {
        return Err(ValidationError::InvalidMerkleRoot);
    }
    Ok(())
}`,
        commonMistakes: [
          'Skipping Merkle root validation — a validator could insert a fake transaction without changing the root',
          'Not checking timestamp is within expected bounds — future-dated blocks confuse sync',
        ],
        practicePrompt: 'Write 5 validation tests: valid block passes; wrong prev_hash fails; wrong hash fails; unauthorized validator fails; invalid tx sig fails.',
      }),
      makeTask("p8w2d6", 8, 34, 6, "Chain State: HashMap<Hash, Block>", "Implement the chain state with fork tracking and longest chain selection.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Store blocks in HashMap<[u8;32], Block> keyed by block hash',
          'Track head of chain: head_hash pointing to the latest block',
          'Fork handling: multiple blocks at same height — pick highest cumulative score',
          'get_ancestry: walk prev_hash to genesis to reconstruct block sequence',
          'Finalization: blocks 32+ deep are considered final',
        ],
        codeExample: `use std::collections::HashMap;

pub struct ChainState {
    pub blocks: HashMap<[u8; 32], Block>,
    pub head_hash: [u8; 32],
    pub height: u64,
}

impl ChainState {
    pub fn new(genesis: Block) -> Self {
        let h = genesis.hash;
        let mut blocks = HashMap::new();
        blocks.insert(h, genesis);
        Self { blocks, head_hash: h, height: 0 }
    }

    pub fn add_block(&mut self, block: Block) -> bool {
        let hash = block.hash;
        let idx = block.header.index;
        self.blocks.insert(hash, block);
        if idx > self.height {
            self.head_hash = hash;
            self.height = idx;
            return true;
        }
        false
    }

    pub fn get_block_at_height(&self, height: u64) -> Option<&Block> {
        let mut current = self.blocks.get(&self.head_hash)?;
        while current.header.index > height {
            current = self.blocks.get(&current.header.prev_hash)?;
        }
        if current.header.index == height { Some(current) } else { None }
    }

    pub fn is_finalized(&self, block_hash: &[u8; 32]) -> bool {
        self.blocks.get(block_hash)
            .map(|b| self.height.saturating_sub(b.header.index) >= 32)
            .unwrap_or(false)
    }
}`,
        commonMistakes: [
          'Not pruning old forks from the HashMap — memory grows unboundedly on a live node',
          'Assuming head always has highest index — forks at same height need score comparison',
        ],
        practicePrompt: 'Simulate a fork: A->B->C and A->B->D at same height. Add both. Assert head is the one produced by the majority-stake validator.',
      }),
      makeTask("p8w2d7", 8, 34, 7, "Mempool: Pending Transaction Queue", "Implement a transaction mempool with priority ordering and duplicate detection.", 4, "coding", { url: "https://github.com/topics/blockchain-rust", label: "Blockchain Rust Examples", platform: "github" }, {
        keyPoints: [
          'Mempool uses BTreeMap ordered by fee for inclusion priority',
          'Reject duplicates: check tx_hash not already in mempool or recent blocks',
          'Nonce ordering: per-account nonces must be sequential — reject nonce gaps',
          'Mempool size limit: evict lowest-fee transactions when full',
          'select_transactions: return top N transactions by fee for block building',
        ],
        codeExample: `use std::collections::{BTreeMap, HashMap, HashSet};
use std::cmp::Reverse;

pub struct Mempool {
    priority_queue: BTreeMap<Reverse<u64>, [u8; 32]>,
    transactions: HashMap<[u8; 32], Transaction>,
    account_nonces: HashMap<[u8; 33], u64>,
    seen_hashes: HashSet<[u8; 32]>,
    max_size: usize,
}

impl Mempool {
    pub fn add(&mut self, tx: Transaction) -> Result<(), String> {
        let hash = tx.hash();
        if self.seen_hashes.contains(&hash) { return Err("duplicate".into()); }
        if !tx.verify() { return Err("bad signature".into()); }
        let expected = *self.account_nonces.get(&tx.from).unwrap_or(&0);
        if tx.nonce != expected {
            return Err(format!("bad nonce: want {expected}, got {}", tx.nonce));
        }
        if self.transactions.len() >= self.max_size {
            if let Some((&low_key, _)) = self.priority_queue.iter().next_back() {
                if tx.fee <= low_key.0 { return Err("fee too low".into()); }
                let low_hash = self.priority_queue.remove(&low_key).unwrap();
                self.transactions.remove(&low_hash);
            }
        }
        self.priority_queue.insert(Reverse(tx.fee), hash);
        self.seen_hashes.insert(hash);
        self.account_nonces.insert(tx.from, tx.nonce + 1);
        self.transactions.insert(hash, tx);
        Ok(())
    }

    pub fn select_transactions(&self, max: usize) -> Vec<Transaction> {
        self.priority_queue.iter().take(max)
            .filter_map(|(_, h)| self.transactions.get(h).cloned())
            .collect()
    }
}`,
        commonMistakes: [
          'Not enforcing nonce ordering in mempool — out-of-order nonces confuse block validation',
          'Never evicting stale transactions — mempool grows without bound over time',
        ],
        practicePrompt: 'Fill mempool with 1000 transactions (varying fees). Call select(100). Assert returned 100 have highest fees. Assert duplicates rejected. Assert nonce gap rejected.',
      }),
    ],
  },

  // Week 35 — PoA Consensus
  {
    weekNumber: 35,
    phaseWeek: 3,
    phaseId: 8,
    title: "Consensus: Proof of Authority",
    goal: "Implement a simplified PoA consensus mechanism.",
    isCompleted: false,
    tasks: [
      makeTask("p8w3d1", 8, 35, 1, "Validator Set: Authorized Block Producers", "Design and implement the validator set management system.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'ValidatorSet: Vec of compressed pubkeys of authorized block producers',
          'Validators configured at genesis and changed via governance',
          'Each validator has a secp256k1 keypair for block signing',
          'Validator index: deterministic ordering for round-robin assignment',
          'Quorum = ceil(2n/3) + 1 signatures required for finality',
        ],
        codeExample: `#[derive(Debug, Clone)]
pub struct ValidatorSet {
    pub validators: Vec<[u8; 33]>,
    pub quorum: usize,
}

impl ValidatorSet {
    pub fn new(validators: Vec<[u8; 33]>) -> Self {
        let n = validators.len();
        let quorum = (2 * n / 3) + 1;
        Self { validators, quorum }
    }

    pub fn get_proposer(&self, slot: u64) -> &[u8; 33] {
        &self.validators[(slot as usize) % self.validators.len()]
    }

    pub fn is_validator(&self, pubkey: &[u8; 33]) -> bool {
        self.validators.contains(pubkey)
    }

    pub fn verify_quorum(
        &self,
        signatures: &std::collections::HashMap<[u8; 33], Vec<u8>>,
        msg: &[u8],
    ) -> bool {
        let valid = signatures.iter()
            .filter(|(pk, sig)| self.is_validator(pk) && verify_sig(pk, msg, sig))
            .count();
        valid >= self.quorum
    }
}`,
        commonMistakes: [
          'Using pubkey bytes as HashMap key without consistent encoding — two nodes may serialize the same key differently',
          'Not caching quorum count — recomputing it on every vote wastes CPU',
        ],
        practicePrompt: 'Implement ValidatorSet with 5 validators. Verify quorum: 3/5 signatures fail, 4/5 pass. Test proposer rotation over 10 slots: each of 5 validators proposes exactly twice.',
      }),
      makeTask("p8w3d2", 8, 35, 2, "Round-Robin Block Proposal", "Implement the leader rotation algorithm for PoA block production.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'Slot = wall clock time / slot_duration (e.g. 2 seconds per slot)',
          'Proposer = validator_set[slot % validator_count]',
          'Non-proposers wait for a block from the proposer then validate and vote',
          'Timeout: if no block arrives within slot_duration/2, record a skip',
          'Skip blocks: empty blocks to advance chain during proposer downtime',
        ],
        codeExample: `use std::time::{SystemTime, UNIX_EPOCH};
use tokio::time::{sleep, Duration, interval};

const SLOT_DURATION_MS: u64 = 2000;

pub struct ConsensusEngine {
    pub identity: Account,
    pub validator_set: ValidatorSet,
    pub chain: ChainState,
    pub mempool: Mempool,
}

impl ConsensusEngine {
    pub fn current_slot(&self) -> u64 {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH).unwrap()
            .as_millis() as u64;
        now / SLOT_DURATION_MS
    }

    pub fn is_my_turn(&self) -> bool {
        let slot = self.current_slot();
        self.validator_set.get_proposer(slot) == &self.identity.public_key_bytes()
    }

    pub async fn run_loop(&mut self) {
        let mut ticker = interval(Duration::from_millis(SLOT_DURATION_MS));
        loop {
            ticker.tick().await;
            if self.is_my_turn() {
                let block = self.propose_block();
                self.broadcast_block(block).await;
            } else {
                let res = tokio::time::timeout(
                    Duration::from_millis(SLOT_DURATION_MS / 2),
                    self.receive_block(),
                ).await;
                match res {
                    Ok(block) => self.process_block(block).await,
                    Err(_) => println!("Slot {} skipped", self.current_slot()),
                }
            }
        }
    }
}`,
        commonMistakes: [
          'Using local system time without NTP — nodes with clock drift propose at wrong slots',
          'Proposing when behind on sync — should only propose if current block is within 1 slot of network tip',
        ],
        practicePrompt: 'Run 5 validator tasks. Each should propose once in every 5-slot cycle. Verify 10 blocks produced in ~20 seconds with correct validator rotation.',
      }),
      makeTask("p8w3d3", 8, 35, 3, "Block Signature Threshold (2/3+1)", "Implement vote collection and quorum verification for block finalization.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'After receiving proposed block: validate it, sign the block hash, broadcast vote',
          'Vote = block_hash + validator_pubkey + signature',
          'Collect votes from peers via Gossipsub "votes" topic',
          'When quorum votes collected for same block_hash: finalize block',
          'Conflicting votes (same validator, different blocks): slashable equivocation',
        ],
        codeExample: `use std::collections::HashMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Vote {
    pub block_hash: [u8; 32],
    pub slot: u64,
    pub validator: [u8; 33],
    pub signature: Vec<u8>,
}

pub enum QuorumResult {
    Finalized([u8; 32]),
    Slash([u8; 33]),
    Pending,
}

pub struct VoteCollector {
    votes: HashMap<u64, HashMap<[u8; 32], Vec<Vote>>>,
    validator_set: ValidatorSet,
}

impl VoteCollector {
    pub fn add_vote(&mut self, vote: Vote) -> QuorumResult {
        if !verify_sig(&vote.validator, &vote.block_hash, &vote.signature) {
            return QuorumResult::Pending;
        }
        // Equivocation check
        if let Some(slot_votes) = self.votes.get(&vote.slot) {
            for (other_hash, others) in slot_votes {
                if *other_hash != vote.block_hash
                    && others.iter().any(|v| v.validator == vote.validator)
                {
                    return QuorumResult::Slash(vote.validator);
                }
            }
        }
        let block_votes = self.votes
            .entry(vote.slot).or_default()
            .entry(vote.block_hash).or_default();
        block_votes.push(vote.clone());
        if block_votes.len() >= self.validator_set.quorum {
            return QuorumResult::Finalized(vote.block_hash);
        }
        QuorumResult::Pending
    }
}`,
        commonMistakes: [
          'Not checking equivocation — validators can vote for both forks unpunished',
          'Accepting votes for old slots indefinitely — limit to current_slot +/- 2',
        ],
        practicePrompt: 'Test: 5 validators, quorum=4. Add 3 votes = Pending. Add 4th = Finalized. Test equivocation: same validator signs two different hashes at same slot = Slash.',
      }),
      makeTask("p8w3d4", 8, 35, 4, "Fork Choice Rule: Heaviest Chain", "Implement the fork choice algorithm to determine the canonical chain.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'Fork choice: when competing chains exist, pick the one with most validator weight',
          'Weight = number of finalized blocks in each competing subtree',
          'Longest chain is NOT always canonical — finalized blocks have priority',
          'GHOST algorithm considers all blocks, not just chain length',
          'Reorg: switch canonical chain when a competing chain becomes heavier',
        ],
        codeExample: `use std::collections::{HashMap, HashSet};

pub struct ForkChoice {
    pub chain_state: ChainState,
    pub finalized_blocks: HashSet<[u8; 32]>,
}

impl ForkChoice {
    pub fn get_head(&self) -> [u8; 32] {
        let mut current = self.get_finalized_tip();
        loop {
            let children: Vec<[u8; 32]> = self.chain_state.blocks.values()
                .filter(|b| b.header.prev_hash == current)
                .map(|b| b.hash)
                .collect();
            if children.is_empty() { return current; }
            current = *children.iter()
                .max_by_key(|h| self.count_finalized_descendants(h))
                .unwrap();
        }
    }

    fn get_finalized_tip(&self) -> [u8; 32] {
        self.finalized_blocks.iter()
            .filter_map(|h| self.chain_state.blocks.get(h))
            .max_by_key(|b| b.header.index)
            .map(|b| b.hash)
            .unwrap_or(self.chain_state.blocks.values()
                .min_by_key(|b| b.header.index).unwrap().hash)
    }

    fn count_finalized_descendants(&self, start: &[u8; 32]) -> usize {
        let mut count = if self.finalized_blocks.contains(start) { 1 } else { 0 };
        let children: Vec<_> = self.chain_state.blocks.values()
            .filter(|b| &b.header.prev_hash == start)
            .map(|b| b.hash)
            .collect();
        for child in children {
            count += self.count_finalized_descendants(&child);
        }
        count
    }
}`,
        commonMistakes: [
          'Using chain length instead of finalized count — attackers can mine long chains with no votes',
          'Not handling deep reorgs — more than 32 blocks of reorg should be rejected as finality violation',
        ],
        practicePrompt: 'Create two forks: fork A (3 finalized) and fork B (5 finalized). Assert get_head() returns fork B. Add 3 more finalized to fork A. Assert fork choice switches back to A.',
      }),
      makeTask("p8w3d5", 8, 35, 5, "Sync Protocol: Request Missing Blocks", "Implement block synchronization for nodes that fall behind.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'On connection to peer: exchange latest block hash and height',
          'If peer is ahead: request missing blocks in ranges via RequestResponse',
          'Validate each received block before adding to chain',
          'Sync modes: full sync (all blocks from genesis) vs fast sync (snapshot)',
          'Log sync progress percentage to avoid appearing stuck',
        ],
        codeExample: `pub struct SyncManager {
    pub chain: ChainState,
    pub validator_set: ValidatorSet,
}

impl SyncManager {
    pub async fn sync_with_peer(
        &mut self,
        peer_id: libp2p::PeerId,
        peer_height: u64,
        request_fn: impl Fn(u64, u64) -> Vec<Block>,
    ) -> anyhow::Result<()> {
        let local_height = self.chain.height;
        if peer_height <= local_height { return Ok(()); }

        let total = peer_height - local_height;
        let mut from = local_height + 1;
        while from <= peer_height {
            let to = (from + 99).min(peer_height);
            let blocks = request_fn(from, to);
            for block in blocks {
                if let Err(e) = validate_block(
                    &block,
                    self.chain.blocks.get(&block.header.prev_hash).unwrap(),
                    &self.validator_set.validators,
                ) {
                    anyhow::bail!("Bad block from {peer_id}: {e:?}");
                }
                self.chain.add_block(block);
            }
            let done = (to - local_height) * 100 / total;
            println!("Sync {done}%");
            from = to + 1;
        }
        Ok(())
    }
}`,
        commonMistakes: [
          'Requesting one block at a time — extremely slow; always batch-request (100 blocks per round trip)',
          'Not validating blocks during sync — accepting arbitrary data from peers without validation',
        ],
        practicePrompt: 'Start node A at height 0, node B at height 500. Connect. Assert A syncs all 500 blocks and reaches same head hash as B. Measure sync time.',
      }),
      makeTask("p8w3d6", 8, 35, 6, "Slash Conditions for Misbehavior", "Implement validator slashing for double signing and unavailability.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'Double signing (equivocation): validator signs two blocks at same height',
          'Slash proof: submit both conflicting signatures to SlashingRegistry',
          'Unavailability: validator misses too many assigned slots — remove from set',
          'Slashing removes the validator from the active set',
          'Slash bounty: reporter gets an incentive for submitting valid slash proofs',
        ],
        codeExample: `use std::collections::HashSet;

#[derive(Debug, Clone)]
pub struct SlashProof {
    pub validator: [u8; 33],
    pub slot: u64,
    pub hash_1: [u8; 32],
    pub sig_1: Vec<u8>,
    pub hash_2: [u8; 32],
    pub sig_2: Vec<u8>,
    pub reporter: [u8; 33],
}

pub struct SlashingRegistry {
    pub slashed: HashSet<[u8; 33]>,
    pub proofs: Vec<SlashProof>,
}

impl SlashingRegistry {
    pub fn submit_proof(&mut self, proof: SlashProof) -> Result<(), String> {
        if !verify_sig(&proof.validator, &proof.hash_1, &proof.sig_1) {
            return Err("bad sig 1".to_string());
        }
        if !verify_sig(&proof.validator, &proof.hash_2, &proof.sig_2) {
            return Err("bad sig 2".to_string());
        }
        if proof.hash_1 == proof.hash_2 {
            return Err("not a double sign".to_string());
        }
        if self.slashed.contains(&proof.validator) {
            return Err("already slashed".to_string());
        }
        self.slashed.insert(proof.validator);
        self.proofs.push(proof);
        Ok(())
    }
}`,
        commonMistakes: [
          'No check for already-slashed validators — same slash can be reported multiple times',
          'Slashing without dispute period — false proofs from malicious reporters need a challenge window',
        ],
        practicePrompt: 'Validator signs two blocks at height 5. Submit slash proof. Assert validator removed from ValidatorSet. Assert second slash attempt on same validator returns error.',
      }),
      makeTask("p8w3d7", 8, 35, 7, "Consensus Integration Test", "Test the complete PoA consensus with 5 nodes producing 20 blocks.", 4, "coding", { url: "https://tokio.rs/", label: "Tokio Async Runtime", platform: "docs" }, {
        keyPoints: [
          'Spin up 5 validator nodes using tokio::spawn with message channels',
          'Assert blocks produced at 1 per slot (2 seconds)',
          'Assert all 5 nodes converge to same chain head after 20 blocks',
          'Byzantine fault: kill 1 node, assert chain continues with 3/5 quorum',
          'Network partition: split into 2+3, assert 3-node side keeps producing',
        ],
        codeExample: `#[tokio::test(flavor = "multi_thread")]
async fn test_poa_5_nodes() {
    use tokio::time::{sleep, Duration};

    let validators = generate_validator_set(5);
    let nodes = start_test_nodes(&validators).await;

    // Run consensus for ~20 blocks
    sleep(Duration::from_secs(45)).await;

    for node in &nodes {
        let h = node.chain.height;
        assert!(h >= 18 && h <= 22, "unexpected height {h}");
    }
    let head = nodes[0].chain.head_hash;
    for node in &nodes {
        assert_eq!(node.chain.head_hash, head, "chain disagreement");
    }

    // Kill validator 0
    nodes[0].stop().await;
    sleep(Duration::from_secs(15)).await;
    // 4 remaining validators still meet quorum (4 >= 4)
    assert!(nodes[1].chain.height > 20, "chain stopped after validator failure");
}`,
        commonMistakes: [
          'Using wall clock sleep as termination condition — flaky on slow CI; use block count instead',
          'Not asserting chain agreement across all nodes — test passes even if nodes diverge',
        ],
        practicePrompt: 'Run the consensus test. Add a Byzantine fault test: kill 2 of 5 (below quorum) and assert chain halts. Restart both and assert chain resumes.',
      }),
    ],
  },

  // Week 36 — Price Oracle & REST API
  {
    weekNumber: 36,
    phaseWeek: 4,
    phaseId: 8,
    title: "Price Oracle & REST API",
    goal: "Add the price oracle functionality and external interface.",
    isCompleted: false,
    tasks: [
      makeTask("p8w4d1", 8, 36, 1, "Price Feed Aggregation Logic", "Collect price submissions from validators and aggregate them into a consensus price.", 4, "coding", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'Each validator submits price data fetched from external APIs (CoinGecko, Binance)',
          'Price submission is a special transaction type in the mempool',
          'Aggregation: collect prices from quorum of validators, compute median',
          'Freshness: reject submissions older than 30 seconds',
          'Price deviation: reject submissions more than 5% away from current consensus',
        ],
        codeExample: `use std::collections::HashMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriceSubmission {
    pub asset: String,
    pub price: u64,          // micro-USD (6 decimal places)
    pub timestamp: u64,      // Unix ms when fetched
    pub validator: [u8; 33],
    pub signature: Vec<u8>,
}

pub struct PriceAggregator {
    submissions: HashMap<String, Vec<PriceSubmission>>,
    quorum: usize,
    max_age_ms: u64,
}

impl PriceAggregator {
    pub fn add_submission(&mut self, sub: PriceSubmission) -> Option<u64> {
        let now = unix_ms_now();
        if now.saturating_sub(sub.timestamp) > self.max_age_ms { return None; }
        let hash = compute_submission_hash(&sub);
        if !verify_sig(&sub.validator, &hash, &sub.signature) { return None; }

        let subs = self.submissions.entry(sub.asset.clone()).or_default();
        subs.retain(|s| now.saturating_sub(s.timestamp) < self.max_age_ms);
        subs.push(sub);

        if subs.len() >= self.quorum {
            let mut prices: Vec<u64> = subs.iter().map(|s| s.price).collect();
            prices.sort_unstable();
            Some(prices[prices.len() / 2]) // median
        } else {
            None
        }
    }
}`,
        commonMistakes: [
          'Using mean instead of median — one outlier submission skews mean significantly',
          'Not removing stale submissions before aggregation — stale prices corrupt the feed',
        ],
        practicePrompt: 'Simulate 5 validators with prices [100, 101, 99, 200 (outlier), 102]. Assert median=101. Assert submissions older than 30s are removed before aggregation.',
      }),
      makeTask("p8w4d2", 8, 36, 2, "Median Price Calculation", "Implement robust median price with outlier detection and staleness handling.", 4, "coding", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'Median over 5+ validators resists a single Byzantine validator',
          'IQR filter: remove submissions outside Q1-1.5*IQR .. Q3+1.5*IQR',
          'TWAP on oracle prices smooths out momentary spikes',
          'If fewer than quorum fresh submissions, return last known price with staleness flag',
          'Confidence = number of validators agreeing within 1% of median',
        ],
        codeExample: `pub enum PriceResult {
    Price { value: u64, confidence: usize },
    Insufficient,
    HighVariance,
}

pub fn compute_robust_price(mut prices: Vec<u64>) -> PriceResult {
    let n = prices.len();
    if n == 0 { return PriceResult::Insufficient; }

    prices.sort_unstable();
    if n < 3 { return PriceResult::Price { value: prices[n/2], confidence: n }; }

    let q1 = prices[n / 4];
    let q3 = prices[3 * n / 4];
    let iqr = q3.saturating_sub(q1);
    let lower = q1.saturating_sub(iqr * 3 / 2);
    let upper = q3.saturating_add(iqr * 3 / 2);

    let filtered: Vec<u64> = prices.iter()
        .copied()
        .filter(|&p| p >= lower && p <= upper)
        .collect();

    if filtered.len() < 2 { return PriceResult::HighVariance; }

    let median = filtered[filtered.len() / 2];
    let confidence = filtered.iter()
        .filter(|&&p| {
            let diff = if p > median { p - median } else { median - p };
            diff * 100 / median < 1 // within 1%
        })
        .count();
    PriceResult::Price { value: median, confidence }
}`,
        commonMistakes: [
          'Using saturating_add for upper bound incorrectly — Q3 + 1.5*IQR can overflow u64 for large prices',
          'Returning error when below quorum — callers need last known price even if slightly stale',
        ],
        practicePrompt: 'Test with [100, 99, 101, 500, 98]. Assert median=100, confidence>=3. Verify 500 is filtered by IQR. Test HighVariance with widely spread prices.',
      }),
      makeTask("p8w4d3", 8, 36, 3, "Oracle Submit Price Instruction", "Add a price submission transaction type to the blockchain.", 4, "coding", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'OracleTransaction extends Transaction with asset, price, timestamp',
          'Only validator nodes can submit price transactions',
          'Price transaction included in special oracle_txs field of Block',
          'Oracle state account updated when block finalized with new consensus price',
          'Price history: keep last 100 prices per asset for TWAP calculation',
        ],
        codeExample: `use std::collections::{HashMap, VecDeque};
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OracleTransaction {
    pub base: Transaction,
    pub asset: String,
    pub price: u64,
    pub source_timestamp: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct OracleState {
    pub prices: HashMap<String, PricePoint>,
    pub history: HashMap<String, VecDeque<PricePoint>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PricePoint {
    pub price: u64,
    pub timestamp: u64,
    pub block_height: u64,
    pub confidence: usize,
}

impl OracleState {
    pub fn update(&mut self, asset: &str, price: u64, height: u64, confidence: usize) {
        let pt = PricePoint { price, timestamp: unix_ms_now(), block_height: height, confidence };
        self.prices.insert(asset.to_string(), pt.clone());
        let hist = self.history.entry(asset.to_string()).or_default();
        hist.push_back(pt);
        if hist.len() > 100 { hist.pop_front(); }
    }

    pub fn get_twap(&self, asset: &str, window_blocks: u64) -> Option<u64> {
        let pts = self.history.get(asset)?;
        let tip = self.prices.get(asset)?.block_height;
        let relevant: Vec<u64> = pts.iter()
            .filter(|p| tip.saturating_sub(p.block_height) <= window_blocks)
            .map(|p| p.price)
            .collect();
        if relevant.is_empty() { return None; }
        Some(relevant.iter().sum::<u64>() / relevant.len() as u64)
    }
}`,
        commonMistakes: [
          'Allowing any sender to submit oracle prices — only validators should be oracle reporters',
          'Storing unlimited price history — use VecDeque with a size cap',
        ],
        practicePrompt: 'Add oracle_txs to Block. In consensus, collect prices from quorum, compute median, store in OracleState. Query TWAP over last 10 blocks. Write unit test.',
      }),
      makeTask("p8w4d4", 8, 36, 4, "REST API: GET /blocks, /txs, /price", "Build an Axum REST API exposing blockchain data to external consumers.", 4, "coding", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'axum::Router with nested routes for clean API organization',
          'Shared state: Arc<RwLock<ChainState>> passed as axum State extractor',
          'JSON serialization: serde_json automatically via axum::Json',
          'Pagination: GET /blocks?from=100&limit=20',
          'CORS: tower_http::cors::CorsLayer for browser access',
        ],
        codeExample: `use axum::{Router, routing::get, extract::{State, Path, Query}, Json, http::StatusCode};
use std::sync::{Arc, RwLock};
use serde::{Deserialize, Serialize};

pub type AppState = Arc<RwLock<OracleBlockchain>>;

pub fn build_router(state: AppState) -> Router {
    Router::new()
        .route("/blocks/:hash", get(get_block))
        .route("/blocks", get(get_blocks))
        .route("/price/:asset", get(get_price))
        .route("/status", get(get_status))
        .layer(tower_http::cors::CorsLayer::permissive())
        .with_state(state)
}

async fn get_price(
    State(state): State<AppState>,
    Path(asset): Path<String>,
) -> Result<Json<PriceResponse>, StatusCode> {
    let chain = state.read().map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    chain.oracle_state.prices.get(&asset)
        .map(|p| Json(PriceResponse {
            asset: asset.clone(),
            price: p.price,
            timestamp: p.timestamp,
            confidence: p.confidence,
        }))
        .ok_or(StatusCode::NOT_FOUND)
}

#[derive(Serialize)]
pub struct PriceResponse {
    pub asset: String,
    pub price: u64,
    pub timestamp: u64,
    pub confidence: usize,
}`,
        commonMistakes: [
          'Holding the RwLock during async operations — drop the guard before any await point',
          'Returning 200 with empty body for not-found — always return 404 for missing resources',
        ],
        practicePrompt: 'Build the Axum server. Test with curl: /price/SOL-USD, /blocks?from=0&limit=10, /status. Verify JSON responses have correct fields.',
      }),
      makeTask("p8w4d5", 8, 36, 5, "Block Explorer HTML Page", "Build a minimal HTML block explorer served by the Axum API.", 4, "project", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'Serve static HTML from Axum using axum::response::Html',
          'JavaScript fetch: poll /blocks?limit=10 every 2 seconds for latest blocks',
          'Use textContent (not innerHTML) for all DOM updates to avoid XSS',
          'Display: block height, hash (truncated), timestamp, tx count, validator',
          'Price widget: show current SOL/USD price with last update time',
        ],
        codeExample: `// Safe DOM manipulation using textContent only
// This JavaScript snippet runs in the browser block explorer

async function refreshBlocks() {
    const blocks = await fetch('/blocks?limit=10').then(r => r.json());
    const price  = await fetch('/price/SOL-USD').then(r => r.json());

    // Safe price update
    document.getElementById('price').textContent =
        'SOL/USD: $' + (price.price / 1e6).toFixed(2);

    // Safe table update using DOM APIs, not innerHTML
    const tbody = document.getElementById('blocks-body');
    while (tbody.firstChild) { tbody.removeChild(tbody.firstChild); }
    for (const b of blocks) {
        const tr = document.createElement('tr');
        for (const text of [String(b.height), b.hash.slice(0,8)+'...', String(b.tx_count)]) {
            const td = document.createElement('td');
            td.textContent = text;   // textContent prevents XSS
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

setInterval(refreshBlocks, 2000);
refreshBlocks();`,
        commonMistakes: [
          'Using innerHTML to render block data — block hashes or tx data could contain malicious HTML if not sanitized',
          'Long-polling instead of setInterval — setInterval is fine for a block explorer',
        ],
        practicePrompt: 'Start a 3-node network. Open the block explorer in a browser. Verify new blocks appear every ~2 seconds. Verify price updates in real time. Screenshot the working explorer.',
      }),
      makeTask("p8w4d6", 8, 36, 6, "End-to-End: 3 Nodes + Price Oracle Running", "Run the complete system: 3 blockchain nodes with live price oracle and REST API.", 4, "project", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'docker-compose.yml: 3 validator containers + 1 observer node',
          'Each validator fetches SOL/USD price from a public API every 10 seconds',
          'Observer node: non-validating, syncs chain and serves REST API',
          'Price consensus: every block includes oracle prices from all 3 validators',
          'Log block height, price consensus, and peer count every 10 seconds',
        ],
        codeExample: `# docker-compose.yml for oracle blockchain
services:
  validator1:
    build: .
    command: ["oracle-chain", "validator", "--key", "/keys/v1.key", "--port", "8000"]
    volumes: ["./keys:/keys:ro"]
    ports: ["8000:8000"]
    environment:
      BOOTSTRAP_PEERS: "validator2:8000,validator3:8000"
      PRICE_API: "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
  validator2:
    build: .
    command: ["oracle-chain", "validator", "--key", "/keys/v2.key", "--port", "8000"]
    volumes: ["./keys:/keys:ro"]
    ports: ["8001:8000"]
    environment:
      BOOTSTRAP_PEERS: "validator1:8000,validator3:8000"
  validator3:
    build: .
    command: ["oracle-chain", "validator", "--key", "/keys/v3.key", "--port", "8000"]
    volumes: ["./keys:/keys:ro"]
    ports: ["8002:8000"]
    environment:
      BOOTSTRAP_PEERS: "validator1:8000,validator2:8000"
  api:
    build: .
    command: ["oracle-chain", "observer", "--api-port", "3000"]
    ports: ["3000:3000"]
    environment:
      BOOTSTRAP_PEERS: "validator1:8000"`,
        commonMistakes: [
          'Not persisting keys in Docker volumes — new keypair on restart breaks validator set membership',
          'Using container-internal IPs as bootstrap peers — use docker-compose service names',
        ],
        practicePrompt: 'Run docker-compose up. After 2 minutes verify: all 3 validators connected; /price/SOL-USD returns live price; block explorer shows active chain.',
      }),
      makeTask("p8w4d7", 8, 36, 7, "Phase 8 Capstone: Full System Demo", "Record a demo and write documentation for your price oracle blockchain.", 4, "project", { url: "https://docs.rs/axum/latest/axum/", label: "Axum Web Framework", platform: "docs" }, {
        keyPoints: [
          'Architecture diagram: network topology, validators, P2P, API, block explorer',
          'Performance metrics: blocks per second, P2P latency, price update frequency',
          'GitHub README: overview, how to run locally, how to add a validator',
          'Demo video: 5 minutes showing system start, block production, price updates, explorer',
          'Phase 8 demonstrates deep systems programming — emphasize this in applications',
        ],
        codeExample: `// Phase 8 README outline

// ## Oracle Blockchain
// Custom Proof of Authority blockchain with decentralized price oracle

// ### Key Features
// - libp2p P2P networking with Kademlia discovery and Gossipsub broadcast
// - Round-robin PoA consensus with 2/3+1 quorum finality
// - Median price aggregation from validator submissions
// - Axum REST API with live block explorer

// ### Performance Benchmarks
// - Block time: ~2 seconds
// - Finality: ~6 seconds (3 blocks)
// - P2P broadcast latency: <50ms on LAN
// - Oracle price freshness: 10-second update cycle

// ### Quick Start
// git clone https://github.com/you/oracle-blockchain
// docker-compose up
// open http://localhost:3000
// curl http://localhost:3000/price/SOL-USD`,
        commonMistakes: [
          'Not measuring performance — claims like "fast" need numbers to be credible',
          'README without Quick Start section — reviewers who cannot run it in 5 minutes skip it',
        ],
        practicePrompt: 'Complete the README with performance benchmarks. Record the 5-minute demo video. Add GitHub Actions CI that builds the Docker image. Share the link as your Phase 8 deliverable.',
      }),
    ],
  },
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
