import type { ExamQuestion } from '@/types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // ─── Ardan Rust Questions (ownership, lifetimes, async, traits, unsafe) ───
  {
    id: 'ar-001',
    examType: 'ardan-rust',
    topic: 'Ownership',
    difficulty: 'medium',
    question: 'What happens when you assign a String value to another variable in Rust?',
    options: {
      A: 'The String is copied byte-by-byte to the new variable',
      B: 'The ownership is moved to the new variable; the original is no longer valid',
      C: 'Both variables point to the same String data on the heap',
      D: 'The compiler automatically implements Clone for String',
    },
    answer: 'B',
    explanation:
      'String does not implement Copy. Assigning a String moves ownership to the new variable, invalidating the original. This is Rust\'s move semantics at work, preventing double-free errors.',
  },
  {
    id: 'ar-002',
    examType: 'ardan-rust',
    topic: 'Ownership',
    difficulty: 'hard',
    question: 'Which statement about the borrow checker is correct?',
    options: {
      A: 'You can have multiple mutable references to the same data at the same time',
      B: 'You can have one mutable reference OR any number of immutable references, but not both at the same time',
      C: 'Mutable references are not allowed in safe Rust code',
      D: 'Immutable references always outlive mutable references',
    },
    answer: 'B',
    explanation:
      'Rust enforces exclusive mutability: at any given moment, you may have either one &mut T or any number of &T references, never both simultaneously. This eliminates data races at compile time.',
  },
  {
    id: 'ar-003',
    examType: 'ardan-rust',
    topic: 'Lifetimes',
    difficulty: 'hard',
    question: 'What does the lifetime annotation \'a in fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str mean?',
    options: {
      A: 'Both inputs must have exactly the same lifetime duration',
      B: 'The returned reference is valid for the longer of the two input lifetimes',
      C: 'The returned reference lives at least as long as the shorter of the two input lifetimes',
      D: 'The function allocates new memory that lives for lifetime \'a',
    },
    answer: 'C',
    explanation:
      'The \'a annotation constrains the output lifetime to be at most as long as the shorter of the two input lifetimes. This tells the borrow checker the output reference is valid while both inputs are valid.',
  },
  {
    id: 'ar-004',
    examType: 'ardan-rust',
    topic: 'Lifetimes',
    difficulty: 'medium',
    question: 'What is lifetime elision in Rust?',
    options: {
      A: 'The compiler removes unused lifetimes from compiled code',
      B: 'A set of rules allowing the compiler to infer lifetime annotations without explicit annotation',
      C: 'A feature that extends the lifetime of temporary values',
      D: 'The process of shortening lifetimes to prevent memory leaks',
    },
    answer: 'B',
    explanation:
      'Lifetime elision is a set of three rules the compiler uses to infer lifetime annotations in function signatures, reducing the need for explicit annotations in common patterns like fn first_word(s: &str) -> &str.',
  },
  {
    id: 'ar-005',
    examType: 'ardan-rust',
    topic: 'Traits',
    difficulty: 'medium',
    question: 'What is the difference between impl Trait and dyn Trait in function parameters?',
    options: {
      A: 'impl Trait is for async functions; dyn Trait is for synchronous functions',
      B: 'impl Trait uses static dispatch (monomorphization); dyn Trait uses dynamic dispatch (vtable)',
      C: 'impl Trait requires the type to be Send; dyn Trait does not',
      D: 'There is no practical difference; both compile to the same code',
    },
    answer: 'B',
    explanation:
      'impl Trait is resolved at compile time via monomorphization — the compiler generates separate code for each concrete type. dyn Trait uses a vtable pointer for runtime polymorphism, adding indirection but allowing heterogeneous collections.',
  },
  {
    id: 'ar-006',
    examType: 'ardan-rust',
    topic: 'Traits',
    difficulty: 'hard',
    question: 'Which trait must a type implement to be safely shared across thread boundaries?',
    options: {
      A: 'Clone',
      B: 'Copy',
      C: 'Sync',
      D: 'Send',
    },
    answer: 'C',
    explanation:
      'Sync means a type can be safely referenced from multiple threads simultaneously (T: Sync means &T: Send). Send means ownership can be transferred across threads. Arc<T> requires T: Send + Sync to be itself Send + Sync.',
  },
  {
    id: 'ar-007',
    examType: 'ardan-rust',
    topic: 'Async/Await',
    difficulty: 'medium',
    question: 'In Rust\'s async model, what does an async fn actually return?',
    options: {
      A: 'A thread handle that executes the function in parallel',
      B: 'An impl Future<Output = T> that is lazy and must be awaited to run',
      C: 'A Result<T, Error> that resolves immediately',
      D: 'A raw pointer to the function\'s return value',
    },
    answer: 'B',
    explanation:
      'An async fn returns a Future. Futures in Rust are lazy — they do nothing until polled. You must .await them (or pass them to a runtime executor) for the code to execute.',
  },
  {
    id: 'ar-008',
    examType: 'ardan-rust',
    topic: 'Async/Await',
    difficulty: 'hard',
    question: 'Why does the following code fail to compile: async fn foo() { let rc = Rc::new(1); bar().await; drop(rc); }',
    options: {
      A: 'Rc<T> does not implement Debug',
      B: 'Rc<T> does not implement Send, and the Future holding it must be Send to be spawned on a multi-threaded runtime',
      C: 'You cannot use Rc inside async functions',
      D: 'drop() is not allowed in async contexts',
    },
    answer: 'B',
    explanation:
      'Rc<T> is not Send because it uses non-atomic reference counting. When an async function suspends at .await, the Future is potentially moved between threads. Any non-Send type held across an .await point makes the Future non-Send, preventing it from being spawned on multi-threaded runtimes like Tokio.',
  },
  {
    id: 'ar-009',
    examType: 'ardan-rust',
    topic: 'Unsafe',
    difficulty: 'hard',
    question: 'Which of the following is NOT allowed in safe Rust but IS allowed in an unsafe block?',
    options: {
      A: 'Creating a reference that might outlive the data it points to',
      B: 'Using the dereference operator on a raw pointer',
      C: 'Using the ? operator for error propagation',
      D: 'Defining a closure that captures variables by reference',
    },
    answer: 'B',
    explanation:
      'Dereferencing a raw pointer (*const T or *mut T) requires an unsafe block because the compiler cannot guarantee the pointer is valid, aligned, or non-null. Safe Rust enforces these invariants through its type system, but unsafe code shifts responsibility to the programmer.',
  },
  {
    id: 'ar-010',
    examType: 'ardan-rust',
    topic: 'Unsafe',
    difficulty: 'hard',
    question: 'What are the five things you can do in an unsafe block that you cannot do in safe Rust?',
    options: {
      A: 'Allocate memory, free memory, cast types, panic, and catch panics',
      B: 'Dereference raw pointers, call unsafe functions, access/modify mutable statics, implement unsafe traits, access union fields',
      C: 'Use generics, call C functions, create threads, mutate captured variables, and use box',
      D: 'Bypass lifetime checks, ignore borrow rules, use null pointers, write to ROM, and fork processes',
    },
    answer: 'B',
    explanation:
      'The five unsafe superpowers are: (1) dereference raw pointers, (2) call unsafe functions/methods, (3) access or modify mutable static variables, (4) implement unsafe traits, (5) access fields of unions. Everything else in Rust remains safe even inside an unsafe block.',
  },
  {
    id: 'ar-011',
    examType: 'ardan-rust',
    topic: 'Smart Pointers',
    difficulty: 'medium',
    question: 'When should you use Arc<T> instead of Rc<T>?',
    options: {
      A: 'When you need interior mutability',
      B: 'When you need to share data across multiple threads',
      C: 'When you need the fastest possible reference counting',
      D: 'When the contained type does not implement Clone',
    },
    answer: 'B',
    explanation:
      'Arc<T> (Atomically Reference Counted) uses atomic operations for thread-safe reference counting, making it Send + Sync when T: Send + Sync. Rc<T> uses cheaper non-atomic operations but is neither Send nor Sync.',
  },
  {
    id: 'ar-012',
    examType: 'ardan-rust',
    topic: 'Smart Pointers',
    difficulty: 'hard',
    question: 'What problem does RefCell<T> solve, and what are its trade-offs?',
    options: {
      A: 'It allows recursive types; trade-off is heap allocation overhead',
      B: 'It provides interior mutability, enforcing borrow rules at runtime instead of compile time; panics if rules are violated',
      C: 'It provides shared ownership with weak references; trade-off is cycle detection overhead',
      D: 'It pins memory in place for async; trade-off is that values cannot be moved',
    },
    answer: 'B',
    explanation:
      'RefCell<T> enables interior mutability — mutating data through shared references. It moves borrow checking from compile time to runtime via borrow()/borrow_mut(), panicking if rules are violated. Useful when the borrow checker is too conservative but adds runtime overhead.',
  },
  {
    id: 'ar-013',
    examType: 'ardan-rust',
    topic: 'Closures',
    difficulty: 'medium',
    question: 'What is the difference between the Fn, FnMut, and FnOnce closure traits?',
    options: {
      A: 'Fn is sync, FnMut is async, FnOnce is blocking',
      B: 'Fn can be called once; FnMut can be called multiple times with mutation; FnOnce borrows immutably',
      C: 'FnOnce takes ownership of captured values (can call once); FnMut can mutate captures (callable multiple times); Fn only reads captures (callable multiple times)',
      D: 'They are identical; the distinction is only historical',
    },
    answer: 'C',
    explanation:
      'FnOnce: captures by move, can only be called once. FnMut: captures by mutable reference, can be called multiple times. Fn: captures by immutable reference, can be called multiple times concurrently. FnOnce: FnMut: Fn is the hierarchy.',
  },
  {
    id: 'ar-014',
    examType: 'ardan-rust',
    topic: 'Iterators',
    difficulty: 'medium',
    question: 'What is the difference between iter(), iter_mut(), and into_iter() on a Vec<T>?',
    options: {
      A: 'iter() is faster; iter_mut() is slower; into_iter() panics on empty vecs',
      B: 'iter() yields &T; iter_mut() yields &mut T; into_iter() yields T (consumes the vec)',
      C: 'iter() counts elements; iter_mut() modifies elements in place; into_iter() removes elements',
      D: 'They all yield T but in different orders',
    },
    answer: 'B',
    explanation:
      'iter() borrows each element as &T. iter_mut() borrows each element as &mut T, allowing modification. into_iter() consumes the Vec, yielding owned T values. Choosing correctly prevents unnecessary clones.',
  },
  {
    id: 'ar-015',
    examType: 'ardan-rust',
    topic: 'Concurrency',
    difficulty: 'hard',
    question: 'What does Mutex<T> guarantee in Rust?',
    options: {
      A: 'That only one thread holds the lock at a time; the data is accessible only through the lock guard',
      B: 'That the contained type implements Send automatically',
      C: 'That deadlocks are impossible because Rust detects them at compile time',
      D: 'That the data is stored in shared memory accessible by all threads without locking',
    },
    answer: 'A',
    explanation:
      'Mutex<T> wraps data so it can only be accessed by calling lock(), which returns a MutexGuard<T>. The guard releases the lock when dropped (RAII). Rust does NOT prevent deadlocks at compile time — that remains the programmer\'s responsibility.',
  },
  {
    id: 'ar-016',
    examType: 'ardan-rust',
    topic: 'Memory Model',
    difficulty: 'hard',
    question: 'What is the purpose of the Pin<P> type in Rust?',
    options: {
      A: 'To prevent a value from being moved in memory after being pinned',
      B: 'To extend the lifetime of a reference beyond its normal scope',
      C: 'To mark a pointer as non-null for FFI purposes',
      D: 'To ensure a type is stored on the heap rather than the stack',
    },
    answer: 'A',
    explanation:
      'Pin<P> ensures the pointee cannot be moved. This is critical for self-referential types (like async state machines) that hold pointers to their own fields — moving them would invalidate those internal pointers. Required by the Future trait.',
  },
  {
    id: 'ar-017',
    examType: 'ardan-rust',
    topic: 'Traits',
    difficulty: 'medium',
    question: 'What is a "trait object" and when would you use one?',
    options: {
      A: 'A struct that contains a reference to a trait definition; used for reflection',
      B: 'A pointer (e.g. Box<dyn Trait>) that erases the concrete type, enabling dynamic dispatch for heterogeneous collections',
      C: 'A compile-time construct that monomorphizes generic trait bounds',
      D: 'A special type of enum that can hold any type implementing a trait',
    },
    answer: 'B',
    explanation:
      'Trait objects (Box<dyn Trait>, &dyn Trait) enable runtime polymorphism by storing a fat pointer: a data pointer + a vtable pointer. Use them when you need a heterogeneous collection or cannot know the concrete type at compile time. The trade-off is dynamic dispatch overhead.',
  },
  {
    id: 'ar-018',
    examType: 'ardan-rust',
    topic: 'Error Handling',
    difficulty: 'medium',
    question: 'What does the ? operator do in a function returning Result<T, E>?',
    options: {
      A: 'It unwraps the value or panics with a descriptive message',
      B: 'It converts Ok(v) to v and returns Err(e) early, calling From::from(e) to convert error types',
      C: 'It tries the expression and retries up to three times before returning an error',
      D: 'It logs the error to stderr and continues execution',
    },
    answer: 'B',
    explanation:
      'The ? operator is syntactic sugar for: match result { Ok(v) => v, Err(e) => return Err(From::from(e)) }. It enables ergonomic error propagation. The From conversion allows ? to work across different error types when conversions are defined.',
  },
  {
    id: 'ar-019',
    examType: 'ardan-rust',
    topic: 'Ownership',
    difficulty: 'easy',
    question: 'Which of the following types implements the Copy trait by default?',
    options: {
      A: 'String',
      B: 'Vec<i32>',
      C: 'i32',
      D: 'Box<i32>',
    },
    answer: 'C',
    explanation:
      'Scalar types (integers, floats, bools, chars) and tuples/arrays of Copy types implement Copy. String, Vec, and Box allocate heap memory and cannot be trivially bitwise-copied, so they do not implement Copy — they use move semantics.',
  },
  {
    id: 'ar-020',
    examType: 'ardan-rust',
    topic: 'Async/Await',
    difficulty: 'hard',
    question: 'What is the role of an executor in Rust\'s async runtime?',
    options: {
      A: 'To compile async functions into synchronous code at build time',
      B: 'To allocate memory for Future state machines on the heap',
      C: 'To poll Futures to completion, scheduling them when their Waker signals readiness',
      D: 'To manage thread pools for blocking I/O operations exclusively',
    },
    answer: 'C',
    explanation:
      'Rust\'s standard library defines Futures but not their executor. Executors (Tokio, async-std) drive Futures by calling poll(). When a Future returns Poll::Pending, it registers a Waker. The executor re-polls the Future when the Waker is called, enabling efficient async I/O without busy-waiting.',
  },
  {
    id: 'ar-021',
    examType: 'ardan-rust',
    topic: 'Unsafe',
    difficulty: 'medium',
    question: 'What is "undefined behavior" in the context of Rust\'s unsafe code?',
    options: {
      A: 'Code that the compiler rejects with a compile-time error',
      B: 'Behavior that panics at runtime with a clear error message',
      C: 'Behavior whose result is not defined by the language specification, allowing the compiler to optimize in ways that may corrupt data or crash the program unpredictably',
      D: 'Code that produces different results on different platforms as documented',
    },
    answer: 'C',
    explanation:
      'Undefined behavior (UB) means the program is allowed to do anything — the compiler assumes UB never happens and may optimize code in ways that produce incorrect results. Examples: data races, dereferencing null pointers, violating aliasing rules. Rust\'s safe subset eliminates UB by design.',
  },
  {
    id: 'ar-022',
    examType: 'ardan-rust',
    topic: 'Generics',
    difficulty: 'medium',
    question: 'What does monomorphization mean in Rust generics?',
    options: {
      A: 'Converting trait objects to concrete types at runtime',
      B: 'The compiler generates separate, concrete implementations of a generic function for each type it is called with',
      C: 'Combining multiple trait bounds into a single bound',
      D: 'Removing unused generic type parameters at compile time',
    },
    answer: 'B',
    explanation:
      'Monomorphization is how Rust implements zero-cost generics. For fn max<T: PartialOrd>(a: T, b: T), if called with i32 and f64, the compiler generates two concrete functions: max_i32 and max_f64. This gives C++-level performance with no runtime polymorphism overhead.',
  },

  // ─── Rust Foundation Questions ───────────────────────────────────────────────
  {
    id: 'rf-001',
    examType: 'rust-foundation',
    topic: 'Variables',
    difficulty: 'easy',
    question: 'In Rust, variables are immutable by default. Which keyword makes a variable mutable?',
    options: {
      A: 'var',
      B: 'mutable',
      C: 'mut',
      D: 'let mut const',
    },
    answer: 'C',
    explanation:
      'In Rust, all variables declared with let are immutable by default. Adding mut (let mut x = 5;) makes the variable mutable, allowing reassignment. This default-immutable design encourages safer code.',
  },
  {
    id: 'rf-002',
    examType: 'rust-foundation',
    topic: 'Data Types',
    difficulty: 'easy',
    question: 'What is the default integer type in Rust when no type is specified?',
    options: {
      A: 'i64',
      B: 'u32',
      C: 'i32',
      D: 'usize',
    },
    answer: 'C',
    explanation:
      'Rust infers i32 as the default integer type when no annotation is provided. This is generally a good choice — fast on most platforms, large enough for most uses, and signed to handle negative numbers.',
  },
  {
    id: 'rf-003',
    examType: 'rust-foundation',
    topic: 'Ownership',
    difficulty: 'medium',
    question: 'What will happen when this code runs?\nlet s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);',
    options: {
      A: 'It prints "hello" twice',
      B: 'It compiles and prints "hello" once',
      C: 'It fails to compile because s1 has been moved into s2',
      D: 'It panics at runtime with a use-after-move error',
    },
    answer: 'C',
    explanation:
      'String does not implement Copy. Assigning s1 to s2 moves ownership. Attempting to use s1 after the move causes a compile-time error: "value used here after move". Rust catches this statically, unlike languages with use-after-free bugs.',
  },
  {
    id: 'rf-004',
    examType: 'rust-foundation',
    topic: 'Structs',
    difficulty: 'easy',
    question: 'How do you access a field named age on a struct instance person?',
    options: {
      A: 'person->age',
      B: 'person[age]',
      C: 'person.age',
      D: 'get(person, age)',
    },
    answer: 'C',
    explanation:
      'Rust uses dot notation (person.age) to access struct fields, similar to many other languages. Unlike C/C++, you don\'t use -> for regular references — the dot operator automatically dereferences if needed.',
  },
  {
    id: 'rf-005',
    examType: 'rust-foundation',
    topic: 'Enums',
    difficulty: 'medium',
    question: 'What does Option<T> represent in Rust?',
    options: {
      A: 'A type that can hold either a success value or an error value',
      B: 'An optional configuration type for structs',
      C: 'A value that is either Some(T) (present) or None (absent), replacing null',
      D: 'A type for optional function arguments',
    },
    answer: 'C',
    explanation:
      'Option<T> is Rust\'s null-safe alternative. Some(value) wraps a present value; None represents absence. The compiler forces you to handle both cases, eliminating null pointer dereferences. Use Result<T, E> when absence should carry error information.',
  },
  {
    id: 'rf-006',
    examType: 'rust-foundation',
    topic: 'Pattern Matching',
    difficulty: 'medium',
    question: 'In a match expression, what does the _ pattern do?',
    options: {
      A: 'It matches only integer values',
      B: 'It is a catch-all pattern that matches any value not handled by earlier arms',
      C: 'It causes the match to panic if reached',
      D: 'It matches only None and Err variants',
    },
    answer: 'B',
    explanation:
      '_ is the wildcard pattern — it matches anything. Used as the last arm in a match, it serves as a catch-all for unhandled cases. Unlike a named binding, _ does not bind the value and explicitly signals "we don\'t care about this case".',
  },
  {
    id: 'rf-007',
    examType: 'rust-foundation',
    topic: 'Functions',
    difficulty: 'easy',
    question: 'What is the idiomatic way to return a value from a function in Rust without using the return keyword?',
    options: {
      A: 'Use yield value;',
      B: 'Assign the value to a special variable named result',
      C: 'Write the expression as the last statement in the function without a semicolon',
      D: 'Call output!(value) at the end of the function',
    },
    answer: 'C',
    explanation:
      'In Rust, the last expression in a function body is implicitly returned if it has no trailing semicolon. Adding a semicolon turns an expression into a statement returning (). This is idiomatic Rust — the explicit return keyword is reserved for early returns.',
  },
  {
    id: 'rf-008',
    examType: 'rust-foundation',
    topic: 'Loops',
    difficulty: 'easy',
    question: 'Which loop construct in Rust can return a value?',
    options: {
      A: 'while',
      B: 'for',
      C: 'loop',
      D: 'do-while',
    },
    answer: 'C',
    explanation:
      'The loop construct (an infinite loop) can return a value using break value;. This is unique to Rust and useful for retry patterns. while and for loops do not return values. Rust has no do-while; use loop with a break condition instead.',
  },
  {
    id: 'rf-009',
    examType: 'rust-foundation',
    topic: 'Vectors',
    difficulty: 'easy',
    question: 'How do you create a Vec<i32> containing the values 1, 2, 3?',
    options: {
      A: 'Vec::new([1, 2, 3])',
      B: 'vec![1, 2, 3]',
      C: 'Vec::from(1..=3)',
      D: 'Vec<i32>::create(1, 2, 3)',
    },
    answer: 'B',
    explanation:
      'The vec! macro is the most idiomatic way to create a Vec with initial values. Vec::from(1..=3) also works but is less common. Vec::new() creates an empty Vec; you then push() values.',
  },
  {
    id: 'rf-010',
    examType: 'rust-foundation',
    topic: 'HashMap',
    difficulty: 'medium',
    question: 'What does the entry API (HashMap::entry().or_insert()) do?',
    options: {
      A: 'It inserts a value and returns the old value if the key existed',
      B: 'It provides a way to insert a default value only if the key is not already present, returning a mutable reference to the value',
      C: 'It deletes the key if the value matches, otherwise inserts',
      D: 'It converts the HashMap to a sorted BTreeMap',
    },
    answer: 'B',
    explanation:
      'The entry API is idiomatic for conditional insertion. entry(key).or_insert(default) returns &mut V — if the key exists, you get a reference to its value; if not, it inserts default and returns a reference to it. Perfect for counting: *map.entry(word).or_insert(0) += 1;',
  },
  {
    id: 'rf-011',
    examType: 'rust-foundation',
    topic: 'Traits',
    difficulty: 'medium',
    question: 'What does #[derive(Debug)] add to a struct?',
    options: {
      A: 'Runtime debug logging whenever the struct is modified',
      B: 'An implementation of the Debug trait, enabling {:?} formatting',
      C: 'A breakpoint in the debugger when the struct is created',
      D: 'Bounds checking on all field accesses',
    },
    answer: 'B',
    explanation:
      '#[derive(Debug)] auto-generates a Debug implementation that prints the struct with its field names and values using {:?} in format strings. Required for println!("{:?}", my_struct) or dbg!(). Other derivable traits include Clone, PartialEq, Hash.',
  },
  {
    id: 'rf-012',
    examType: 'rust-foundation',
    topic: 'Error Handling',
    difficulty: 'medium',
    question: 'When should you use unwrap() vs expect() on a Result or Option?',
    options: {
      A: 'unwrap() is for production code; expect() is only for tests',
      B: 'Both panic on failure; expect() takes a message string so panics are more debuggable — prefer expect() in production if you must unwrap',
      C: 'unwrap() returns a default value on failure; expect() panics',
      D: 'They are identical; the naming difference is purely stylistic',
    },
    answer: 'B',
    explanation:
      'Both unwrap() and expect() panic on Err/None. expect(msg) includes your custom message in the panic output, making debugging easier. In production code, prefer proper error handling (?). When unwrapping is acceptable (tests, prototypes), prefer expect() for better error context.',
  },
  {
    id: 'rf-013',
    examType: 'rust-foundation',
    topic: 'Modules',
    difficulty: 'easy',
    question: 'What keyword makes a module item (function, struct, etc.) accessible from outside the module?',
    options: {
      A: 'export',
      B: 'extern',
      C: 'pub',
      D: 'visible',
    },
    answer: 'C',
    explanation:
      'pub makes items public. Without pub, items are private to their module by default. You can also use pub(crate) for crate-level visibility and pub(super) for parent module visibility. This is Rust\'s module privacy system.',
  },
  {
    id: 'rf-014',
    examType: 'rust-foundation',
    topic: 'Testing',
    difficulty: 'easy',
    question: 'Which attribute marks a function as a test in Rust?',
    options: {
      A: '#[unit_test]',
      B: '#[test]',
      C: '@test',
      D: 'test fn',
    },
    answer: 'B',
    explanation:
      'The #[test] attribute marks a function as a test case. Run with cargo test. The function must return () or impl Termination. Use assert!, assert_eq!, assert_ne! for assertions. Group tests in a #[cfg(test)] module to exclude from release builds.',
  },
  {
    id: 'rf-015',
    examType: 'rust-foundation',
    topic: 'Cargo',
    difficulty: 'easy',
    question: 'What does cargo check do?',
    options: {
      A: 'Runs all tests in the project',
      B: 'Compiles the project but skips code generation, checking for errors faster than cargo build',
      C: 'Checks for security vulnerabilities in dependencies',
      D: 'Verifies that Cargo.toml is syntactically valid',
    },
    answer: 'B',
    explanation:
      'cargo check performs type checking and borrow checking without generating machine code, making it significantly faster than cargo build. Use it during development for rapid error feedback. cargo build generates the actual binary.',
  },
  {
    id: 'rf-016',
    examType: 'rust-foundation',
    topic: 'Lifetimes',
    difficulty: 'hard',
    question: 'What is the \'static lifetime and when should you use it?',
    options: {
      A: 'A lifetime that lasts exactly for the duration of the current function',
      B: 'A lifetime denoting that a reference is valid for the entire program duration; string literals have \'static lifetime',
      C: 'A lifetime that prevents the compiler from performing lifetime checks',
      D: 'The lifetime of values stored in static variables, which are always 0 bytes',
    },
    answer: 'B',
    explanation:
      '\'static is the longest possible lifetime — the reference is valid for the entire program. String literals (&\'static str) are stored in the binary. Avoid over-using \'static as a workaround for lifetime errors; it often hides real ownership issues. Arc<T> does NOT automatically give \'static lifetime.',
  },
  {
    id: 'rf-017',
    examType: 'rust-foundation',
    topic: 'Closures',
    difficulty: 'medium',
    question: 'What does the move keyword do in a closure?',
    options: {
      A: 'Moves the closure itself into a new thread',
      B: 'Forces the closure to take ownership of captured variables instead of borrowing them',
      C: 'Allows the closure to mutate its captured variables',
      D: 'Moves the closure\'s return value to the heap',
    },
    answer: 'B',
    explanation:
      'The move keyword forces the closure to capture variables by value (moving ownership in) rather than by reference. Required when the closure outlives the scope where captures were created — common in thread::spawn or when returning closures from functions.',
  },
  {
    id: 'rf-018',
    examType: 'rust-foundation',
    topic: 'Iterators',
    difficulty: 'medium',
    question: 'What is the difference between a lazy iterator and an eager operation on iterators?',
    options: {
      A: 'Lazy iterators run in a separate thread; eager operations run synchronously',
      B: 'Lazy iterator adaptors (map, filter) do nothing until consumed; eager operations (collect, sum) drive the iteration and produce a result',
      C: 'Lazy iterators skip None values; eager operations process them',
      D: 'There is no difference; both execute immediately',
    },
    answer: 'B',
    explanation:
      'Iterator adaptors like map(), filter(), take() return new iterators but do no work. They are lazy. Consumers like collect(), sum(), for_each(), count() drive the iteration, causing all chained adaptors to execute. This enables zero-cost abstractions.',
  },
  {
    id: 'rf-019',
    examType: 'rust-foundation',
    topic: 'Enums',
    difficulty: 'medium',
    question: 'What is the main difference between Rust enums and C enums?',
    options: {
      A: 'Rust enums cannot have numeric values; C enums are just integers',
      B: 'Rust enum variants can hold data of different types (algebraic data types); C enums are just named integer constants',
      C: 'Rust enums are heap-allocated; C enums are stack-allocated',
      D: 'Rust enums support inheritance; C enums do not',
    },
    answer: 'B',
    explanation:
      'Rust enums are algebraic data types (sum types). Variants can hold different types of data: enum Shape { Circle(f64), Rectangle(f64, f64), Triangle { base: f64, height: f64 } }. This makes them far more powerful than C\'s integer-based enums and enables expressive pattern matching.',
  },
  {
    id: 'rf-020',
    examType: 'rust-foundation',
    topic: 'Slices',
    difficulty: 'medium',
    question: 'Why is &str preferred over String for function parameters in many cases?',
    options: {
      A: 'Because &str is always faster to process than String',
      B: 'Because &str can accept both string literals and String references, making the function more flexible without requiring ownership',
      C: 'Because &str supports UTF-16 while String only supports UTF-8',
      D: 'Because &str parameters are automatically cloned when passed to the function',
    },
    answer: 'B',
    explanation:
      'Using &str is more flexible: the caller can pass a &String (coerced via Deref) or a string literal &\'static str. If the function took String, callers with &str would need to clone(). Accept the least ownership needed — &str for read-only access, String only when you need to own/modify.',
  },
  {
    id: 'rf-021',
    examType: 'rust-foundation',
    topic: 'Cargo',
    difficulty: 'easy',
    question: 'What file defines a Rust project\'s metadata and dependencies?',
    options: {
      A: 'package.json',
      B: 'build.rs',
      C: 'Cargo.lock',
      D: 'Cargo.toml',
    },
    answer: 'D',
    explanation:
      'Cargo.toml is the manifest file — it defines package metadata (name, version, edition) and dependencies. Cargo.lock is auto-generated and locks exact dependency versions for reproducible builds. Build scripts go in build.rs.',
  },
  {
    id: 'rf-022',
    examType: 'rust-foundation',
    topic: 'Ownership',
    difficulty: 'hard',
    question: 'What is the NLL (Non-Lexical Lifetimes) improvement in Rust and why does it matter?',
    options: {
      A: 'It allows references to point to null values, making FFI easier',
      B: 'It extends lifetimes of references past their lexical scope using arena allocation',
      C: 'The borrow checker understands that borrows end at the last use point, not the end of the lexical scope, allowing more valid code to compile',
      D: 'It removes the need for lifetime annotations in all cases',
    },
    answer: 'C',
    explanation:
      'Pre-NLL Rust ended borrows at the closing brace of their block (lexical scope), rejecting valid code. NLL (stabilized in Rust 2018) uses control flow analysis to end borrows at their last actual use. This allows patterns like: let mut v = vec![1]; let r = &v[0]; v.push(2); where r is not used after push.',
  },

  // ─── ZK Certification Questions (R1CS, Groth16, soundness, Circom) ──────────
  {
    id: 'zk-001',
    examType: 'zk-cert',
    topic: 'ZK Fundamentals',
    difficulty: 'medium',
    question: 'What does ZK in Zero-Knowledge Proof mean?',
    options: {
      A: 'The proof uses zero memory during verification',
      B: 'The verifier learns zero knowledge about the witness beyond the fact that the prover knows it',
      C: 'The proof takes zero time to generate on modern hardware',
      D: 'The cryptographic keys are zero-length for efficiency',
    },
    answer: 'B',
    explanation:
      'A Zero-Knowledge Proof allows a prover to convince a verifier that a statement is true without revealing any information about why it is true (the witness). The verifier gains zero additional knowledge beyond the proof\'s validity. The three properties are: completeness, soundness, and zero-knowledge.',
  },
  {
    id: 'zk-002',
    examType: 'zk-cert',
    topic: 'R1CS',
    difficulty: 'hard',
    question: 'What does R1CS stand for and what does it represent in ZK proving systems?',
    options: {
      A: 'Recursive 1-Circuit System; a method for nesting ZK proofs inside each other',
      B: 'Rank-1 Constraint System; a set of constraints of the form (A · w)(B · w) = C · w over a finite field, representing a computation',
      C: 'Round-1 Cryptographic Standard; the first round of a multi-party computation protocol',
      D: 'Reduced 1-bit Commitment Scheme; a compact way to commit to boolean vectors',
    },
    answer: 'B',
    explanation:
      'R1CS (Rank-1 Constraint System) is a standard intermediate representation for ZK circuits. Each constraint has the form (linear combination A) * (linear combination B) = (linear combination C), where all linear combinations operate on witness vector w over a prime field. zkSNARK proving systems like Groth16 operate over R1CS.',
  },
  {
    id: 'zk-003',
    examType: 'zk-cert',
    topic: 'Groth16',
    difficulty: 'hard',
    question: 'What is the trusted setup in Groth16 and why is it a potential weakness?',
    options: {
      A: 'A multi-party ceremony that generates public parameters (CRS); if all participants are compromised, fake proofs can be generated undetectably',
      B: 'A trusted third party that validates proofs before they reach the verifier',
      C: 'The initial state of the random number generator used in proof generation',
      D: 'The process of trusting the circuit designer\'s code without auditing',
    },
    answer: 'A',
    explanation:
      'Groth16 requires a trusted setup: a Powers of Tau ceremony that generates a Common Reference String (CRS). If the toxic waste (trapdoor secrets) from the ceremony is kept, a malicious party could forge valid proofs for false statements. Multi-party ceremonies (like Zcash\'s Sapling ceremony) mitigate this — only one honest participant is needed.',
  },
  {
    id: 'zk-004',
    examType: 'zk-cert',
    topic: 'Groth16',
    difficulty: 'medium',
    question: 'What are the key properties of Groth16 proofs?',
    options: {
      A: 'Large proof size but fast verification; no trusted setup required',
      B: 'Constant proof size (3 group elements), fast verification, post-quantum secure',
      C: 'Constant proof size (3 group elements), fast verification, circuit-specific trusted setup required',
      D: 'Variable proof size, slow verification, universal trusted setup',
    },
    answer: 'C',
    explanation:
      'Groth16 produces very compact proofs (2 G1 elements + 1 G2 element, ~200 bytes), fast verification, and is one of the most efficient zkSNARKs. However, it requires a circuit-specific trusted setup (each circuit needs its own ceremony) and is not post-quantum secure (relies on elliptic curve pairings).',
  },
  {
    id: 'zk-005',
    examType: 'zk-cert',
    topic: 'Soundness',
    difficulty: 'medium',
    question: 'What is soundness in the context of ZK proof systems?',
    options: {
      A: 'The property that a valid proof can always be generated for a true statement',
      B: 'The property that a cheating prover cannot produce a valid proof for a false statement (except with negligible probability)',
      C: 'The property that the verifier learns nothing about the prover\'s secret',
      D: 'The property that the proof verification runs in polynomial time',
    },
    answer: 'B',
    explanation:
      'Soundness guarantees that if the statement is false, no efficient cheating prover can convince the verifier it is true, except with negligible probability (the soundness error). Computational soundness relies on hardness assumptions; statistical soundness holds even against computationally unbounded provers.',
  },
  {
    id: 'zk-006',
    examType: 'zk-cert',
    topic: 'Circom',
    difficulty: 'medium',
    question: 'What is Circom and what is its output?',
    options: {
      A: 'A ZK runtime for executing circuits on-chain; outputs EVM bytecode',
      B: 'A domain-specific language for writing ZK circuits; compiles to R1CS and WASM witness generator',
      C: 'A ZK verifier library for Solidity; outputs Solidity verification contracts',
      D: 'A trusted setup ceremony tool; outputs the proving and verification keys',
    },
    answer: 'B',
    explanation:
      'Circom is a DSL for writing arithmetic circuits that compile to R1CS constraints. The compiler produces: (1) a .r1cs file with constraints, (2) a witness calculator in WASM/C++. Combined with snarkjs, this enables full Groth16/PLONK proof generation and verification, including Solidity verifier contracts.',
  },
  {
    id: 'zk-007',
    examType: 'zk-cert',
    topic: 'Circom',
    difficulty: 'hard',
    question: 'In Circom, what is the difference between a signal and a variable?',
    options: {
      A: 'Signals are integers; variables are field elements',
      B: 'Signals are part of the circuit constraint system (appear in R1CS); variables are template-level constants used only during compilation',
      C: 'Variables can be arrays; signals can only be scalars',
      D: 'Signals support branching with if/else; variables do not',
    },
    answer: 'B',
    explanation:
      'In Circom, signals (declared with signal) are field elements that become part of the circuit witness and constraints (R1CS). Variables (var) are compile-time helpers for computing signal values — they don\'t appear in the constraint system. The critical rule: you cannot use a signal\'s value to control flow (if/for with signal conditions), as this would create non-deterministic circuits.',
  },
  {
    id: 'zk-008',
    examType: 'zk-cert',
    topic: 'ZK Fundamentals',
    difficulty: 'medium',
    question: 'What is the difference between interactive and non-interactive ZK proofs?',
    options: {
      A: 'Interactive proofs work on any computer; non-interactive proofs require specialized hardware',
      B: 'In interactive proofs, the verifier sends challenges to the prover in multiple rounds; zkSNARKs use the Fiat-Shamir transform to make proofs non-interactive',
      C: 'Interactive proofs are used for on-chain verification; non-interactive proofs are only for off-chain use',
      D: 'Non-interactive proofs are always larger than interactive proofs',
    },
    answer: 'B',
    explanation:
      'Interactive proofs require a challenge-response protocol (multiple rounds of communication). The Fiat-Shamir heuristic replaces verifier challenges with a hash of the transcript, creating a Non-Interactive Zero-Knowledge (NIZK) proof that can be verified by anyone, anytime — critical for blockchain applications.',
  },
  {
    id: 'zk-009',
    examType: 'zk-cert',
    topic: 'ZK Fundamentals',
    difficulty: 'hard',
    question: 'What is the difference between zkSNARKs and zkSTARKs?',
    options: {
      A: 'zkSNARKs are for private transactions; zkSTARKs are for public computations',
      B: 'zkSNARKs require a trusted setup and use elliptic curves; zkSTARKs are transparent (no trusted setup) and use hash functions, making them post-quantum secure but with larger proofs',
      C: 'zkSTARKs are strictly superior to zkSNARKs in all metrics',
      D: 'zkSNARKs prove arithmetic computations; zkSTARKs prove boolean computations',
    },
    answer: 'B',
    explanation:
      'zkSNARKs: small proofs (~200 bytes), fast verification, but require trusted setup and use elliptic curve pairings (not post-quantum). zkSTARKs: no trusted setup, post-quantum secure (hash-based), transparent, but larger proofs (10s-100s of KB) and slower verification. Ethereum uses both: Groth16 (zkSNARK) via precompiles, and STARKs in Layer 2s like StarkNet.',
  },
  {
    id: 'zk-010',
    examType: 'zk-cert',
    topic: 'R1CS',
    difficulty: 'hard',
    question: 'How does arithmetic circuit satisfiability relate to R1CS?',
    options: {
      A: 'Arithmetic circuits are a subset of R1CS; not all R1CS systems come from circuits',
      B: 'Any arithmetic circuit (over a field) can be compiled to R1CS; each multiplication gate becomes one R1CS constraint; addition is free',
      C: 'R1CS can only represent addition; multiplication requires QAP transformation first',
      D: 'Arithmetic circuits and R1CS are equivalent only for boolean computations',
    },
    answer: 'B',
    explanation:
      'An arithmetic circuit over a field consists of addition and multiplication gates. When compiling to R1CS: each multiplication gate (a * b = c) becomes one Rank-1 constraint. Addition gates are free (absorbed into linear combinations). The circuit\'s input/output wires become public inputs; intermediate wires become the witness. Constraint count ≈ multiplication gate count.',
  },
  {
    id: 'zk-011',
    examType: 'zk-cert',
    topic: 'Groth16',
    difficulty: 'hard',
    question: 'What is a QAP (Quadratic Arithmetic Program) and how does Groth16 use it?',
    options: {
      A: 'A quantum algorithm for polynomial interpolation used in the prover',
      B: 'A way to encode R1CS constraints as polynomial equations; Groth16 proves satisfiability by showing the prover knows polynomials satisfying the QAP without revealing them',
      C: 'A quality assurance protocol for verifying circuit correctness before trusted setup',
      D: 'A hash function used to commit to witness values in the proof',
    },
    answer: 'B',
    explanation:
      'A QAP encodes R1CS as polynomials. R1CS constraints (A·w)(B·w)=C·w become polynomial divisibility: h(x)·t(x) = p(x) where t(x) is the target polynomial. Groth16 uses Kate commitments (pairing-based) to prove the prover knows h(x) satisfying this, binding the prover to a specific witness without revealing it.',
  },
  {
    id: 'zk-012',
    examType: 'zk-cert',
    topic: 'ZK Applications',
    difficulty: 'medium',
    question: 'What is the main use case of ZK proofs in blockchain/Web3?',
    options: {
      A: 'Replacing consensus mechanisms with mathematical proofs',
      B: 'Proving correct execution of computations off-chain while verifying cheaply on-chain, enabling scalability and privacy',
      C: 'Encrypting all transaction data so miners cannot see amounts',
      D: 'Eliminating the need for validators by using proofs instead of signatures',
    },
    answer: 'B',
    explanation:
      'ZK proofs enable two key Web3 use cases: (1) zkRollups — run transactions off-chain, submit a validity proof to L1. Verifying one proof is cheaper than re-executing thousands of transactions. (2) Privacy — prove you know a secret (private key, balance > threshold) without revealing it. Examples: Zcash (privacy), zkSync/StarkNet (scalability).',
  },
  {
    id: 'zk-013',
    examType: 'zk-cert',
    topic: 'Soundness',
    difficulty: 'hard',
    question: 'What is the soundness error in a ZK proof system and why does it matter?',
    options: {
      A: 'The probability that a valid proof fails to verify due to hardware errors',
      B: 'The maximum probability that a cheating prover can convince the verifier of a false statement; must be negligibly small for the system to be secure',
      C: 'The percentage of provers who produce incorrect proofs due to software bugs',
      D: 'The time it takes for a proof to become invalid after generation',
    },
    answer: 'B',
    explanation:
      'Soundness error ε is the probability that a cheating prover succeeds in convincing the verifier of a false statement. For computational soundness, ε ≤ 1/2^λ where λ is the security parameter (e.g., 128 bits). Statistical soundness holds even against unbounded adversaries. The soundness error must be negligible — otherwise an adversary can fake proofs.',
  },
  {
    id: 'zk-014',
    examType: 'zk-cert',
    topic: 'Circom',
    difficulty: 'medium',
    question: 'What does the === operator do in Circom?',
    options: {
      A: 'It checks equality at runtime and panics if not equal',
      B: 'It generates an R1CS equality constraint, requiring the two expressions to be equal in the constraint system',
      C: 'It assigns a signal value without generating a constraint',
      D: 'It is strict equality for variables (not signals)',
    },
    answer: 'B',
    explanation:
      'In Circom, === generates an equality constraint in the R1CS system. The prover must satisfy a === b for the proof to be valid. Unlike = (which assigns values during witness computation) or <== (which both assigns and constrains), === only adds a constraint without assignment. Forgetting to constrain is a common soundness bug.',
  },
  {
    id: 'zk-015',
    examType: 'zk-cert',
    topic: 'ZK Fundamentals',
    difficulty: 'medium',
    question: 'What does it mean for a ZK proof to be "succinct"?',
    options: {
      A: 'The proof can be generated in constant time regardless of computation size',
      B: 'The proof size and verification time are sublinear (typically polylogarithmic) in the size of the computation being proved',
      C: 'The proof uses only addition operations, no multiplication',
      D: 'The proof can be compressed using standard zip algorithms',
    },
    answer: 'B',
    explanation:
      'The S in zkSNARK stands for "Succinct" — proof size and verification time grow much slower than the computation. For Groth16, proof size is constant (3 group elements, ~200 bytes) regardless of circuit size. Verification is O(public inputs) — a blockchain verifying thousands of transactions only checks one small proof.',
  },
];

export function getQuestionsByType(type: ExamQuestion['examType']): ExamQuestion[] {
  return EXAM_QUESTIONS.filter((q) => q.examType === type);
}

export function getRandomQuestions(
  type: ExamQuestion['examType'],
  count: number
): ExamQuestion[] {
  const pool = getQuestionsByType(type);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllTopics(): string[] {
  return [...new Set(EXAM_QUESTIONS.map((q) => q.topic))];
}

export function getQuestionsByTopic(topic: string): ExamQuestion[] {
  return EXAM_QUESTIONS.filter((q) => q.topic === topic);
}

export function getMixedRandomQuestions(count: number): ExamQuestion[] {
  const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
