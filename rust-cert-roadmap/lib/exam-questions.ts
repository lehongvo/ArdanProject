import { ExamQuestion } from '@/types';

export const examQuestions: ExamQuestion[] = [
  // ============================================================
  // OWNERSHIP & BORROWING (10 questions)
  // ============================================================
  {
    id: 'q001',
    topic: 'Ownership & Borrowing',
    difficulty: 'easy',
    question: 'What happens when you assign a `String` variable to another variable in Rust?',
    options: {
      A: 'The string data is copied to the new variable',
      B: 'The ownership is moved to the new variable, and the original is invalidated',
      C: 'Both variables share ownership of the string',
      D: 'A compile-time error occurs',
    },
    answer: 'B',
    explanation:
      'In Rust, assigning a `String` to another variable performs a move, not a copy. The original variable is invalidated and can no longer be used. This prevents double-free errors by ensuring exactly one owner at any time.',
    reference: 'The Rust Book, Chapter 4.1 - What Is Ownership?',
  },
  {
    id: 'q002',
    topic: 'Ownership & Borrowing',
    difficulty: 'easy',
    question: 'Which of the following types implements the `Copy` trait by default?',
    options: {
      A: 'String',
      B: 'Vec<i32>',
      C: 'i32',
      D: 'Box<u8>',
    },
    answer: 'C',
    explanation:
      'Primitive scalar types like `i32`, `f64`, `bool`, and `char` implement the `Copy` trait. Types that manage heap memory such as `String`, `Vec`, and `Box` do not implement `Copy` because they require special cleanup logic when dropped.',
    reference: 'The Rust Book, Chapter 4.1 - What Is Ownership?',
  },
  {
    id: 'q003',
    topic: 'Ownership & Borrowing',
    difficulty: 'medium',
    question:
      'Given: `let s = String::from("hello"); let r1 = &s; let r2 = &s; println!("{} {}", r1, r2);` — why does this compile?',
    options: {
      A: 'Because `s` is cloned for each reference',
      B: 'Because multiple immutable references to the same data are allowed simultaneously',
      C: 'Because `println!` takes ownership of the references',
      D: 'Because string literals are always copyable',
    },
    answer: 'B',
    explanation:
      'Rust allows any number of immutable references (`&T`) to exist simultaneously, because read-only access cannot cause data races. The restriction only applies when a mutable reference exists — at that point, no other references (mutable or immutable) are allowed.',
    reference: 'The Rust Book, Chapter 4.2 - References and Borrowing',
  },
  {
    id: 'q004',
    topic: 'Ownership & Borrowing',
    difficulty: 'medium',
    question:
      'What is the error in this code?\n```rust\nlet mut s = String::from("hello");\nlet r1 = &mut s;\nlet r2 = &s;\nprintln!("{} {}", r1, r2);\n```',
    options: {
      A: 'You cannot have a mutable and immutable reference at the same time while both are in use',
      B: 'The variable `s` must be declared as `let s` without `mut`',
      C: '`println!` cannot accept mixed reference types',
      D: 'You need to dereference `r1` before printing',
    },
    answer: 'A',
    explanation:
      'Rust\'s borrowing rules forbid having a mutable reference and an immutable reference active at the same time. Since both `r1` and `r2` are used in the `println!`, their lifetimes overlap, which violates the rule. This prevents data races at compile time.',
    reference: 'The Rust Book, Chapter 4.2 - References and Borrowing',
  },
  {
    id: 'q005',
    topic: 'Ownership & Borrowing',
    difficulty: 'hard',
    question:
      'Which lifetime annotation correctly expresses that the return reference must not outlive either input?\n```rust\nfn longest(x: &str, y: &str) -> &str { ... }\n```',
    options: {
      A: '`fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str`',
      B: '`fn longest<\'a, \'b>(x: &\'a str, y: &\'b str) -> &\'a str`',
      C: '`fn longest(x: &\'static str, y: &\'static str) -> &\'static str`',
      D: '`fn longest<\'a>(x: &\'a str, y: &str) -> &\'a str`',
    },
    answer: 'A',
    explanation:
      'By giving both parameters and the return type the same lifetime `\'a`, the compiler infers `\'a` as the shorter of the two input lifetimes. This ensures the returned reference is valid for the overlap of both inputs, preventing dangling references.',
    reference: 'The Rust Book, Chapter 10.3 - Validating References with Lifetimes',
  },
  {
    id: 'q006',
    topic: 'Ownership & Borrowing',
    difficulty: 'hard',
    question:
      'What does the following code print?\n```rust\nlet s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);\n```',
    options: {
      A: 'hello',
      B: 'An empty string',
      C: 'It does not compile because `s1` has been moved',
      D: 'It compiles but panics at runtime',
    },
    answer: 'C',
    explanation:
      'After `let s2 = s1;`, ownership of the heap-allocated string data moves to `s2`. The variable `s1` is now invalid. Attempting to use `s1` after the move causes a compile-time error, which is one of Rust\'s key safety guarantees.',
    reference: 'The Rust Book, Chapter 4.1 - What Is Ownership?',
  },
  {
    id: 'q007',
    topic: 'Ownership & Borrowing',
    difficulty: 'medium',
    question: 'What is a "dangling reference" and how does Rust prevent it?',
    options: {
      A: 'A reference to stack memory that has been freed; Rust uses garbage collection to prevent it',
      B: 'A reference that points to memory that has been deallocated; Rust prevents it through the borrow checker and lifetime analysis',
      C: 'A reference that is never used; Rust prevents it with dead-code warnings',
      D: 'A circular reference between two structs; Rust prevents it by disallowing recursive types',
    },
    answer: 'B',
    explanation:
      'A dangling reference points to memory that has been freed or gone out of scope. Rust\'s borrow checker enforces that references never outlive the data they point to by analyzing lifetimes at compile time. This eliminates an entire class of memory bugs without runtime overhead.',
    reference: 'The Rust Book, Chapter 4.2 - References and Borrowing',
  },
  {
    id: 'q008',
    topic: 'Ownership & Borrowing',
    difficulty: 'medium',
    question:
      'Which statement about the `Clone` trait is correct?',
    options: {
      A: '`Clone` is automatically derived for all types',
      B: '`Clone` performs a deep copy and must be called explicitly via `.clone()`',
      C: '`Clone` is the same as `Copy` but for heap-allocated types',
      D: '`Clone` transfers ownership without duplicating data',
    },
    answer: 'B',
    explanation:
      'The `Clone` trait provides the `.clone()` method for explicit deep copying. Unlike `Copy`, which happens implicitly on assignment, `Clone` must be invoked explicitly. This makes the cost of duplication visible in the source code, following Rust\'s principle of making expensive operations explicit.',
    reference: 'The Rust Book, Chapter 4.1 - What Is Ownership?',
  },
  {
    id: 'q009',
    topic: 'Ownership & Borrowing',
    difficulty: 'hard',
    question:
      'In which situation does Rust apply "non-lexical lifetimes" (NLL)?',
    options: {
      A: 'When a reference is used inside a loop, the compiler extends its lifetime to the end of the function',
      B: 'When the compiler detects that a reference is no longer used before scope end, it shortens the borrow to the last use point',
      C: 'When a reference is passed to an async function, NLL converts it to a \'static lifetime',
      D: 'NLL only applies to mutable references, not immutable ones',
    },
    answer: 'B',
    explanation:
      'Non-lexical lifetimes allow the borrow checker to end a borrow at the point of last use rather than at the end of the enclosing scope. This makes many previously rejected programs compile correctly. For example, you can take a mutable borrow, use it, and then take an immutable borrow in the same scope as long as they don\'t overlap.',
  },
  {
    id: 'q010',
    topic: 'Ownership & Borrowing',
    difficulty: 'easy',
    question: 'What does the `&` operator do when placed before a variable name?',
    options: {
      A: 'It dereferences the variable',
      B: 'It creates a reference (borrow) to the variable without taking ownership',
      C: 'It creates a mutable copy of the variable',
      D: 'It marks the variable for garbage collection',
    },
    answer: 'B',
    explanation:
      'The `&` operator creates an immutable reference to a value, which is called borrowing. The original owner retains ownership, and the reference allows read-only access. To create a mutable reference, you use `&mut`.',
    reference: 'The Rust Book, Chapter 4.2 - References and Borrowing',
  },

  // ============================================================
  // TYPE SYSTEM (10 questions)
  // ============================================================
  {
    id: 'q011',
    topic: 'Type System',
    difficulty: 'easy',
    question: 'How do you define a struct with named fields in Rust?',
    options: {
      A: '`struct Point { x: f64, y: f64 }`',
      B: '`class Point { x: f64, y: f64 }`',
      C: '`type Point = { x: f64, y: f64 }`',
      D: '`record Point(x: f64, y: f64)`',
    },
    answer: 'A',
    explanation:
      'Rust uses the `struct` keyword followed by the name and curly braces containing named fields with their types. Rust does not have classes, records, or object-oriented type declarations like some other languages.',
    reference: 'The Rust Book, Chapter 5.1 - Defining and Instantiating Structs',
  },
  {
    id: 'q012',
    topic: 'Type System',
    difficulty: 'easy',
    question: 'What is an enum in Rust?',
    options: {
      A: 'A type that can only hold integer constants',
      B: 'A type that defines a set of possible variants, each of which can optionally hold data',
      C: 'A type alias for union types from C',
      D: 'A macro for generating constant values',
    },
    answer: 'B',
    explanation:
      'Rust enums are algebraic data types (sum types) where each variant can carry different types and amounts of data. This makes them far more powerful than C-style enums, enabling patterns like `Option<T>` and `Result<T, E>`.',
    reference: 'The Rust Book, Chapter 6.1 - Defining an Enum',
  },
  {
    id: 'q013',
    topic: 'Type System',
    difficulty: 'medium',
    question:
      'What does the following trait definition mean?\n```rust\ntrait Summary {\n    fn summarize(&self) -> String;\n}\n```',
    options: {
      A: 'Any type implementing `Summary` must provide a `summarize` method that takes a reference to self and returns a `String`',
      B: 'The `Summary` trait automatically generates a `summarize` method for all types',
      C: 'It creates a new type called `Summary` with a `String` field',
      D: 'It defines a function `summarize` that can only be called on string types',
    },
    answer: 'A',
    explanation:
      'A trait definition declares a set of method signatures that implementing types must provide. The `&self` parameter means the method borrows the implementing type immutably. Any struct or enum that implements `Summary` must define a `summarize` method with the matching signature.',
    reference: 'The Rust Book, Chapter 10.2 - Traits: Defining Shared Behavior',
  },
  {
    id: 'q014',
    topic: 'Type System',
    difficulty: 'medium',
    question: 'What is the difference between `impl Trait` in argument position vs return position?',
    options: {
      A: 'There is no difference; they behave identically',
      B: 'In argument position it accepts any type implementing the trait; in return position it means the function returns a single concrete type that implements the trait',
      C: 'In argument position it requires a concrete type; in return position it allows multiple types',
      D: '`impl Trait` can only be used in return position',
    },
    answer: 'B',
    explanation:
      'In argument position, `impl Trait` is syntactic sugar for a generic bound and accepts any type implementing the trait (the caller chooses). In return position, it hides the concrete return type but the function must return exactly one concrete type. This is useful for returning closures or complex iterator chains.',
    reference: 'The Rust Book, Chapter 10.2 - Traits: Defining Shared Behavior',
  },
  {
    id: 'q015',
    topic: 'Type System',
    difficulty: 'medium',
    question:
      'What does `where` accomplish in this function signature?\n```rust\nfn process<T>(item: T) where T: Display + Clone { ... }\n```',
    options: {
      A: 'It specifies that `T` must implement both `Display` and `Clone` traits',
      B: 'It creates a runtime type check for `T`',
      C: 'It makes `T` optional',
      D: 'It restricts `T` to only primitive types',
    },
    answer: 'A',
    explanation:
      'The `where` clause provides trait bounds on generic type parameters. `T: Display + Clone` means the type `T` must implement both the `Display` and `Clone` traits. The `where` clause is an alternative to inline bounds and is preferred when bounds are complex for readability.',
    reference: 'The Rust Book, Chapter 10.2 - Traits: Defining Shared Behavior',
  },
  {
    id: 'q016',
    topic: 'Type System',
    difficulty: 'hard',
    question:
      'What is a "trait object" and when would you use one?',
    options: {
      A: 'A struct that implements a trait; you use it when you want compile-time polymorphism',
      B: 'A dynamically dispatched reference like `&dyn Trait` or `Box<dyn Trait>` used when you need runtime polymorphism for heterogeneous collections',
      C: 'A trait with default method implementations; you use it to avoid code duplication',
      D: 'A generic type parameter bounded by a trait; you use it for static dispatch',
    },
    answer: 'B',
    explanation:
      'Trait objects (`&dyn Trait` or `Box<dyn Trait>`) enable dynamic dispatch through a vtable, allowing different concrete types to be treated uniformly at runtime. They are used when you need heterogeneous collections or when the concrete type is not known at compile time, at the cost of a small runtime overhead for the vtable lookup.',
    reference: 'The Rust Book, Chapter 17.2 - Using Trait Objects',
  },
  {
    id: 'q017',
    topic: 'Type System',
    difficulty: 'hard',
    question: 'Which of the following traits is NOT object-safe and therefore cannot be used as a trait object?',
    options: {
      A: 'A trait with a method `fn name(&self) -> String`',
      B: 'A trait with a method `fn create() -> Self`',
      C: 'A trait with a method `fn process(&self, data: &[u8])`',
      D: 'A trait with a method `fn describe(&self) -> &str`',
    },
    answer: 'B',
    explanation:
      'A trait is not object-safe if it has methods that return `Self` or use generic type parameters, because the concrete type behind a trait object is erased at compile time. The method `fn create() -> Self` requires knowing the concrete type, which is impossible with dynamic dispatch. The other methods all use `&self` and concrete return types, so they are object-safe.',
    reference: 'The Rust Book, Chapter 17.2 - Using Trait Objects',
  },
  {
    id: 'q018',
    topic: 'Type System',
    difficulty: 'easy',
    question: 'What is a tuple struct in Rust?',
    options: {
      A: 'A struct whose fields are accessed by index rather than by name',
      B: 'A struct that can only contain two fields',
      C: 'A struct that is automatically derived from a tuple',
      D: 'A type alias for a tuple',
    },
    answer: 'A',
    explanation:
      'A tuple struct is defined like `struct Color(u8, u8, u8);` and its fields are accessed by index (e.g., `color.0`, `color.1`). They are useful for creating distinct types from existing types (the newtype pattern) and when field names are not necessary.',
    reference: 'The Rust Book, Chapter 5.1 - Defining and Instantiating Structs',
  },
  {
    id: 'q019',
    topic: 'Type System',
    difficulty: 'medium',
    question:
      'What does `#[derive(Debug, Clone, PartialEq)]` do on a struct?',
    options: {
      A: 'It manually implements the Debug, Clone, and PartialEq traits with custom logic',
      B: 'It automatically generates implementations of the Debug, Clone, and PartialEq traits using a procedural macro',
      C: 'It imports the Debug, Clone, and PartialEq modules',
      D: 'It makes the struct fields public for debugging purposes',
    },
    answer: 'B',
    explanation:
      'The `#[derive]` attribute invokes procedural macros that automatically generate trait implementations based on the struct\'s fields. For example, `Debug` generates a format string, `Clone` generates field-by-field cloning, and `PartialEq` generates field-by-field comparison. All fields must also implement the derived traits.',
    reference: 'The Rust Book, Appendix C - Derivable Traits',
  },
  {
    id: 'q020',
    topic: 'Type System',
    difficulty: 'hard',
    question:
      'What are associated types in traits and how do they differ from generic type parameters on the trait?',
    options: {
      A: 'They are the same thing with different syntax',
      B: 'Associated types specify the type inside the impl block, allowing only one implementation per type, whereas generic parameters allow multiple implementations for different type arguments',
      C: 'Associated types can only be primitive types, while generics can be any type',
      D: 'Associated types are resolved at runtime, while generics are resolved at compile time',
    },
    answer: 'B',
    explanation:
      'Associated types (e.g., `type Item;` in the `Iterator` trait) are specified by the implementor and allow only one implementation per type. Generic parameters on a trait (e.g., `trait Add<Rhs>`) allow the same type to implement the trait multiple times with different type arguments. Associated types improve readability when there should be exactly one implementation.',
    reference: 'The Rust Book, Chapter 19.2 - Advanced Traits',
  },

  // ============================================================
  // ERROR HANDLING (8 questions)
  // ============================================================
  {
    id: 'q021',
    topic: 'Error Handling',
    difficulty: 'easy',
    question: 'What are the two variants of `Result<T, E>`?',
    options: {
      A: '`Success(T)` and `Failure(E)`',
      B: '`Ok(T)` and `Err(E)`',
      C: '`Some(T)` and `None`',
      D: '`Value(T)` and `Error(E)`',
    },
    answer: 'B',
    explanation:
      '`Result<T, E>` has two variants: `Ok(T)` for successful values and `Err(E)` for error values. It is the standard way to handle recoverable errors in Rust and is used extensively throughout the standard library and ecosystem.',
    reference: 'The Rust Book, Chapter 9.2 - Recoverable Errors with Result',
  },
  {
    id: 'q022',
    topic: 'Error Handling',
    difficulty: 'easy',
    question: 'What does the `?` operator do when used on a `Result` value?',
    options: {
      A: 'It converts the Result into an Option',
      B: 'It unwraps the Ok value or returns the Err from the current function early',
      C: 'It panics if the Result is an Err',
      D: 'It logs the error and continues execution',
    },
    answer: 'B',
    explanation:
      'The `?` operator is shorthand for propagating errors. If the Result is `Ok(v)`, it evaluates to `v`. If it is `Err(e)`, it returns `Err(e.into())` from the enclosing function immediately. This makes error propagation concise and readable compared to explicit match blocks.',
    reference: 'The Rust Book, Chapter 9.2 - Recoverable Errors with Result',
  },
  {
    id: 'q023',
    topic: 'Error Handling',
    difficulty: 'medium',
    question: 'When should you use `panic!` versus returning a `Result`?',
    options: {
      A: '`panic!` should be used for all errors; `Result` is only for optional values',
      B: '`panic!` for unrecoverable errors and violated invariants; `Result` for expected, recoverable errors',
      C: '`Result` should be used for all errors; `panic!` is deprecated',
      D: '`panic!` is for release builds; `Result` is for debug builds',
    },
    answer: 'B',
    explanation:
      '`panic!` is for situations where the program reaches an unrecoverable state, such as index out of bounds or violated invariants that indicate a bug. `Result` should be used for expected failure cases like file not found or invalid input, where the caller can decide how to handle the error.',
    reference: 'The Rust Book, Chapter 9.3 - To panic! or Not to panic!',
  },
  {
    id: 'q024',
    topic: 'Error Handling',
    difficulty: 'medium',
    question:
      'What does `.unwrap_or_else(|e| default_value(e))` do on a `Result`?',
    options: {
      A: 'It panics with a custom error message',
      B: 'It returns the Ok value if present, or calls the closure with the error to produce a fallback value',
      C: 'It converts the Result into an Option',
      D: 'It logs the error and returns None',
    },
    answer: 'B',
    explanation:
      '`unwrap_or_else` returns the inner value if the Result is Ok, or evaluates the provided closure with the error value to produce a default. This is useful when computing the default value is expensive or when you want to handle the error in the fallback logic without propagating it.',
    reference: 'Rust std docs - Result::unwrap_or_else',
  },
  {
    id: 'q025',
    topic: 'Error Handling',
    difficulty: 'medium',
    question:
      'How do you define a custom error type that works with the `?` operator?',
    options: {
      A: 'Implement the `Error` trait and optionally `From` for automatic conversion',
      B: 'Derive the `Result` trait on your struct',
      C: 'Implement the `Panic` trait on your error type',
      D: 'Use `#[error]` attribute on any enum',
    },
    answer: 'A',
    explanation:
      'To create a custom error type, you typically implement `std::fmt::Display`, `std::fmt::Debug`, and `std::error::Error`. Implementing `From<OtherError>` allows the `?` operator to automatically convert other error types into your custom type. Crates like `thiserror` automate much of this boilerplate.',
    reference: 'The Rust Book, Chapter 9.2 - Recoverable Errors with Result',
  },
  {
    id: 'q026',
    topic: 'Error Handling',
    difficulty: 'hard',
    question:
      'What is the difference between `Box<dyn Error>` and a custom enum error type for error handling?',
    options: {
      A: 'There is no practical difference',
      B: '`Box<dyn Error>` is a trait object allowing any error type but loses specific variant information; a custom enum preserves variants for pattern matching but requires defining all cases upfront',
      C: '`Box<dyn Error>` is faster because it avoids vtable dispatch',
      D: 'Custom enum errors cannot implement the `Error` trait',
    },
    answer: 'B',
    explanation:
      '`Box<dyn Error>` is convenient for prototyping and applications where you just need to propagate errors, but you cannot match on specific error variants without downcasting. Custom enum errors give callers the ability to match on each variant and handle specific errors differently, making them better for library APIs.',
    reference: 'The Rust Book, Chapter 9.2 - Recoverable Errors with Result',
  },
  {
    id: 'q027',
    topic: 'Error Handling',
    difficulty: 'easy',
    question: 'What does `Option<T>` represent in Rust?',
    options: {
      A: 'A value that may or may not be present, with variants `Some(T)` and `None`',
      B: 'An error type with variants `Ok(T)` and `Err`',
      C: 'A nullable pointer like in C',
      D: 'A boolean that wraps a value',
    },
    answer: 'A',
    explanation:
      '`Option<T>` is Rust\'s way of expressing optional values without null pointers. It has two variants: `Some(T)` containing a value, and `None` representing the absence of a value. The compiler forces you to handle both cases, preventing null pointer dereference bugs.',
    reference: 'The Rust Book, Chapter 6.1 - Defining an Enum',
  },
  {
    id: 'q028',
    topic: 'Error Handling',
    difficulty: 'hard',
    question:
      'What does the following code do?\n```rust\nlet result: Result<i32, String> = Ok(5);\nlet mapped = result.and_then(|v| {\n    if v > 0 { Ok(v * 2) } else { Err("negative".into()) }\n});\n```',
    options: {
      A: 'It always returns `Err("negative")`',
      B: 'It returns `Ok(10)` because `and_then` applies the closure to the `Ok` value and the closure returns `Ok(5 * 2)`',
      C: 'It panics because `and_then` cannot change the value',
      D: 'It returns `Ok(5)` unchanged',
    },
    answer: 'B',
    explanation:
      '`and_then` (also known as flatmap) applies a closure to the `Ok` value and returns the Result produced by that closure. Since `result` is `Ok(5)` and 5 > 0, the closure returns `Ok(10)`. If `result` were `Err`, the closure would not be called and the error would pass through unchanged.',
    reference: 'Rust std docs - Result::and_then',
  },

  // ============================================================
  // MEMORY MANAGEMENT (8 questions)
  // ============================================================
  {
    id: 'q029',
    topic: 'Memory Management',
    difficulty: 'easy',
    question: 'Where are local variables of fixed size (like `i32` or `[u8; 4]`) stored in Rust?',
    options: {
      A: 'On the heap',
      B: 'On the stack',
      C: 'In static memory',
      D: 'In a garbage-collected region',
    },
    answer: 'B',
    explanation:
      'Local variables with a known, fixed size at compile time are allocated on the stack. Stack allocation is very fast because it only requires adjusting the stack pointer. Heap allocation is used for dynamically sized data like `String` and `Vec`.',
    reference: 'The Rust Book, Chapter 4.1 - What Is Ownership?',
  },
  {
    id: 'q030',
    topic: 'Memory Management',
    difficulty: 'easy',
    question: 'What does `Box<T>` provide in Rust?',
    options: {
      A: 'Shared ownership of heap-allocated data',
      B: 'A single-owner pointer to heap-allocated data',
      C: 'Thread-safe reference counting',
      D: 'Interior mutability',
    },
    answer: 'B',
    explanation:
      '`Box<T>` allocates data on the heap and provides single ownership. When the `Box` goes out of scope, the heap memory is deallocated. It is useful for recursive types, large data that should not be copied on the stack, and trait objects.',
    reference: 'The Rust Book, Chapter 15.1 - Using Box<T>',
  },
  {
    id: 'q031',
    topic: 'Memory Management',
    difficulty: 'medium',
    question: 'What is the difference between `Rc<T>` and `Arc<T>`?',
    options: {
      A: '`Rc<T>` is for single-threaded reference counting; `Arc<T>` is for thread-safe (atomic) reference counting',
      B: '`Rc<T>` is mutable; `Arc<T>` is immutable',
      C: '`Rc<T>` allocates on the stack; `Arc<T>` allocates on the heap',
      D: 'They are identical; `Arc` is just an alias for `Rc`',
    },
    answer: 'A',
    explanation:
      '`Rc<T>` (Reference Counted) uses non-atomic operations for its reference count, making it faster but unsafe to share across threads. `Arc<T>` (Atomically Reference Counted) uses atomic operations, making it safe to share across threads but with slightly more overhead. `Rc<T>` does not implement `Send`, preventing accidental cross-thread use.',
    reference: 'The Rust Book, Chapter 15.4 - Rc<T>',
  },
  {
    id: 'q032',
    topic: 'Memory Management',
    difficulty: 'medium',
    question: 'What does `RefCell<T>` provide and when is borrowing checked?',
    options: {
      A: 'Compile-time checked mutable access to shared data',
      B: 'Runtime-checked interior mutability, allowing mutable borrows of data behind an immutable reference',
      C: 'Thread-safe interior mutability using atomic operations',
      D: 'Automatic garbage collection for the wrapped value',
    },
    answer: 'B',
    explanation:
      '`RefCell<T>` enforces borrowing rules at runtime instead of compile time. It allows you to mutate data even when there are immutable references to the `RefCell`, by calling `.borrow_mut()`. If borrowing rules are violated at runtime, it panics. It is single-threaded only and is often combined with `Rc<T>`.',
    reference: 'The Rust Book, Chapter 15.5 - RefCell<T>',
  },
  {
    id: 'q033',
    topic: 'Memory Management',
    difficulty: 'hard',
    question:
      'How can `Rc<RefCell<T>>` cause a memory leak?',
    options: {
      A: 'It cannot; Rust prevents all memory leaks',
      B: 'By creating reference cycles where two `Rc` values point to each other, preventing the reference count from ever reaching zero',
      C: 'By calling `.borrow_mut()` without dropping the borrow',
      D: 'By cloning the `Rc` more than 255 times',
    },
    answer: 'B',
    explanation:
      'When two `Rc<RefCell<T>>` values reference each other, a reference cycle forms. Neither value\'s reference count will ever reach zero, so the memory is never freed. Rust provides `Weak<T>` to break such cycles by creating non-owning references that do not increment the strong reference count.',
    reference: 'The Rust Book, Chapter 15.6 - Reference Cycles Can Leak Memory',
  },
  {
    id: 'q034',
    topic: 'Memory Management',
    difficulty: 'medium',
    question: 'What does the `Drop` trait allow you to do?',
    options: {
      A: 'Manually deallocate memory at any point in the code',
      B: 'Customize the cleanup logic that runs when a value goes out of scope',
      C: 'Prevent a value from being deallocated',
      D: 'Convert heap memory to stack memory',
    },
    answer: 'B',
    explanation:
      'The `Drop` trait lets you specify custom code to run when a value goes out of scope, such as releasing file handles, network connections, or other resources. You cannot call `.drop()` directly, but you can use `std::mem::drop(value)` to drop a value early.',
    reference: 'The Rust Book, Chapter 15.3 - Running Code on Cleanup with the Drop Trait',
  },
  {
    id: 'q035',
    topic: 'Memory Management',
    difficulty: 'hard',
    question:
      'What is `std::mem::ManuallyDrop<T>` used for?',
    options: {
      A: 'It runs the destructor immediately when the wrapper is created',
      B: 'It prevents the compiler from automatically calling `Drop` on the inner value, giving you manual control over when and if the destructor runs',
      C: 'It disables the borrow checker for the wrapped value',
      D: 'It converts the value from heap-allocated to stack-allocated',
    },
    answer: 'B',
    explanation:
      '`ManuallyDrop<T>` wraps a value and inhibits the compiler\'s automatic destructor call. You must manually decide when to drop the inner value using `ManuallyDrop::drop()`. This is useful in unsafe code, FFI boundaries, and when implementing custom smart pointers where you need precise control over destruction order.',
  },
  {
    id: 'q036',
    topic: 'Memory Management',
    difficulty: 'medium',
    question: 'What happens when a `Vec<T>` grows beyond its current capacity?',
    options: {
      A: 'It panics with an out-of-memory error',
      B: 'It allocates a new, larger buffer on the heap, copies the existing elements, and frees the old buffer',
      C: 'It extends the existing buffer in place by requesting adjacent memory',
      D: 'It starts storing overflow elements on the stack',
    },
    answer: 'B',
    explanation:
      'When a `Vec` exceeds its capacity, it allocates a new contiguous block of memory (typically doubling the capacity), copies or moves the elements to the new buffer, and deallocates the old buffer. This is why `Vec::with_capacity` is useful when you know the approximate size in advance, as it avoids repeated reallocations.',
    reference: 'Rust std docs - Vec',
  },

  // ============================================================
  // CONCURRENCY (8 questions)
  // ============================================================
  {
    id: 'q037',
    topic: 'Concurrency',
    difficulty: 'easy',
    question: 'How do you spawn a new thread in Rust?',
    options: {
      A: '`Thread::new(|| { ... })`',
      B: '`std::thread::spawn(|| { ... })`',
      C: '`async { ... }`',
      D: '`fork(|| { ... })`',
    },
    answer: 'B',
    explanation:
      '`std::thread::spawn` takes a closure and executes it in a new OS thread, returning a `JoinHandle` that can be used to wait for the thread to finish. The closure must be `\'static` and `Send`, meaning it cannot borrow local variables that might go out of scope.',
    reference: 'The Rust Book, Chapter 16.1 - Using Threads',
  },
  {
    id: 'q038',
    topic: 'Concurrency',
    difficulty: 'medium',
    question: 'What does the `Send` trait indicate about a type?',
    options: {
      A: 'The type can be safely sent (moved) between threads',
      B: 'The type can be shared between threads by reference',
      C: 'The type implements serialization',
      D: 'The type can send messages through a channel',
    },
    answer: 'A',
    explanation:
      '`Send` is a marker trait indicating that ownership of the type can be safely transferred to another thread. Most types are `Send`, but types like `Rc<T>` are not because their reference count is not atomic. The compiler automatically implements `Send` for types composed entirely of `Send` types.',
    reference: 'The Rust Book, Chapter 16.4 - Extensible Concurrency with Send and Sync',
  },
  {
    id: 'q039',
    topic: 'Concurrency',
    difficulty: 'medium',
    question: 'What does `Mutex<T>` provide in Rust?',
    options: {
      A: 'A lock-free concurrent data structure',
      B: 'Mutual exclusion that allows only one thread to access the inner data at a time, returning a guard that auto-unlocks on drop',
      C: 'A read-write lock that allows multiple concurrent readers',
      D: 'An async-aware lock for use with the tokio runtime only',
    },
    answer: 'B',
    explanation:
      '`Mutex<T>` wraps data and provides exclusive access through `.lock()`, which returns a `MutexGuard`. The guard implements `Deref` and `DerefMut` to access the data, and automatically releases the lock when dropped. If another thread holds the lock, `.lock()` blocks until it becomes available.',
    reference: 'The Rust Book, Chapter 16.3 - Shared-State Concurrency',
  },
  {
    id: 'q040',
    topic: 'Concurrency',
    difficulty: 'medium',
    question:
      'Why is `Arc<Mutex<T>>` a common pattern for sharing mutable state across threads?',
    options: {
      A: '`Arc` provides atomic reference counting for shared ownership across threads, and `Mutex` provides synchronized mutable access',
      B: '`Arc` provides mutability and `Mutex` provides reference counting',
      C: 'It is the only way to share data between threads in Rust',
      D: '`Arc` prevents deadlocks and `Mutex` prevents data races',
    },
    answer: 'A',
    explanation:
      '`Arc<T>` allows multiple threads to own the same data through atomic reference counting (implementing both `Send` and `Sync`). `Mutex<T>` ensures only one thread can access the data mutably at a time. Together, `Arc<Mutex<T>>` provides safe, shared, mutable access across threads.',
    reference: 'The Rust Book, Chapter 16.3 - Shared-State Concurrency',
  },
  {
    id: 'q041',
    topic: 'Concurrency',
    difficulty: 'easy',
    question: 'What does `mpsc::channel()` create?',
    options: {
      A: 'A bidirectional communication pipe between two threads',
      B: 'A multiple-producer, single-consumer channel returning a `(Sender, Receiver)` pair',
      C: 'A shared memory region for inter-thread communication',
      D: 'A network socket for inter-process communication',
    },
    answer: 'B',
    explanation:
      '`std::sync::mpsc::channel()` creates a channel for message passing with multiple producers (the `Sender` can be cloned) and a single consumer (`Receiver`). Messages are sent with `.send()` and received with `.recv()`. This is Rust\'s implementation of the message-passing concurrency model.',
    reference: 'The Rust Book, Chapter 16.2 - Using Message Passing',
  },
  {
    id: 'q042',
    topic: 'Concurrency',
    difficulty: 'hard',
    question: 'What does the `Sync` trait indicate about a type?',
    options: {
      A: 'The type can be sent between threads',
      B: 'The type uses synchronized methods internally',
      C: 'It is safe for the type to be referenced from multiple threads simultaneously — i.e., `&T` is `Send`',
      D: 'The type uses atomic operations for all field access',
    },
    answer: 'C',
    explanation:
      '`Sync` means that references (`&T`) to the type can be safely shared across threads. Formally, a type `T` is `Sync` if `&T` is `Send`. Types like `Mutex<T>` are `Sync` (allowing multiple threads to hold `&Mutex<T>`), while `Cell<T>` and `RefCell<T>` are not `Sync` because their interior mutability is not thread-safe.',
    reference: 'The Rust Book, Chapter 16.4 - Extensible Concurrency with Send and Sync',
  },
  {
    id: 'q043',
    topic: 'Concurrency',
    difficulty: 'hard',
    question:
      'What is the purpose of `async`/`await` in Rust and how does it differ from OS threads?',
    options: {
      A: '`async`/`await` is just syntactic sugar for spawning OS threads',
      B: '`async` functions return futures that are lazily evaluated by an executor, enabling cooperative multitasking without the overhead of OS threads per task',
      C: '`async`/`await` automatically parallelizes code across CPU cores',
      D: '`async`/`await` provides preemptive multitasking managed by the Rust runtime',
    },
    answer: 'B',
    explanation:
      'Async functions return `Future` values that do nothing until polled by an async runtime (executor). This allows thousands of concurrent tasks on a small thread pool because suspended futures consume only the memory for their state, not an entire OS thread stack. Unlike OS threads, async tasks yield cooperatively at `.await` points.',
    reference: 'The Rust Book, Chapter 17 - Async and Await',
  },
  {
    id: 'q044',
    topic: 'Concurrency',
    difficulty: 'hard',
    question:
      'Why does this code fail to compile?\n```rust\nuse std::rc::Rc;\nlet data = Rc::new(5);\nstd::thread::spawn(move || {\n    println!("{}", data);\n});\n```',
    options: {
      A: 'Because `Rc<i32>` does not implement `Display`',
      B: 'Because `Rc<T>` does not implement `Send`, so it cannot be moved to another thread',
      C: 'Because the `move` keyword is not allowed with `thread::spawn`',
      D: 'Because you cannot print from a spawned thread',
    },
    answer: 'B',
    explanation:
      '`Rc<T>` uses non-atomic reference counting and is therefore not `Send`. The compiler prevents sending it across thread boundaries because concurrent non-atomic increments and decrements would be a data race. You should use `Arc<T>` instead, which uses atomic reference counting.',
    reference: 'The Rust Book, Chapter 16.4 - Extensible Concurrency with Send and Sync',
  },

  // ============================================================
  // PATTERN MATCHING (6 questions)
  // ============================================================
  {
    id: 'q045',
    topic: 'Pattern Matching',
    difficulty: 'easy',
    question: 'What does the `_` pattern match in a `match` expression?',
    options: {
      A: 'Only the None variant',
      B: 'Any value, acting as a catch-all wildcard',
      C: 'Only integer zero',
      D: 'Only the unit type `()`',
    },
    answer: 'B',
    explanation:
      'The underscore `_` is a wildcard pattern that matches any value without binding it to a variable. It is typically used as the last arm of a `match` expression to handle all remaining cases that are not explicitly matched.',
    reference: 'The Rust Book, Chapter 6.2 - The match Control Flow Construct',
  },
  {
    id: 'q046',
    topic: 'Pattern Matching',
    difficulty: 'easy',
    question: 'When would you use `if let` instead of `match`?',
    options: {
      A: 'When you need to match against all possible variants',
      B: 'When you only care about one specific pattern and want to ignore the rest',
      C: 'When you need to match more than three patterns',
      D: '`if let` and `match` cannot be used interchangeably',
    },
    answer: 'B',
    explanation:
      '`if let` is syntactic sugar for a `match` that handles one pattern and ignores all others. For example, `if let Some(x) = value { ... }` is more concise than a full `match` when you only care about the `Some` variant. It reduces boilerplate when you do not need exhaustive matching.',
    reference: 'The Rust Book, Chapter 6.3 - Concise Control Flow with if let',
  },
  {
    id: 'q047',
    topic: 'Pattern Matching',
    difficulty: 'medium',
    question:
      'What does this pattern match?\n```rust\nmatch point {\n    (0, 0) => "origin",\n    (x, 0) => "on x-axis",\n    (0, y) => "on y-axis",\n    (x, y) => "somewhere else",\n}\n```',
    options: {
      A: 'It only matches tuples of zeros',
      B: 'It destructures a tuple, binding variables and matching literal values, covering all possible `(i32, i32)` combinations',
      C: 'It creates four new tuples',
      D: 'It fails to compile because `x` and `y` are used without type annotations',
    },
    answer: 'B',
    explanation:
      'This `match` uses a combination of literal patterns (`0`) and variable bindings (`x`, `y`) to destructure a tuple. The first arm matches `(0, 0)`, the second binds `x` when the second element is `0`, the third binds `y` when the first is `0`, and the last arm is a catch-all that binds both values.',
    reference: 'The Rust Book, Chapter 18.3 - Pattern Syntax',
  },
  {
    id: 'q048',
    topic: 'Pattern Matching',
    difficulty: 'medium',
    question: 'What does a match guard do?',
    options: {
      A: 'It prevents a match arm from panicking',
      B: 'It adds an extra boolean condition to a match arm using `if` after the pattern',
      C: 'It ensures the match expression is exhaustive',
      D: 'It locks the matched value to prevent mutation',
    },
    answer: 'B',
    explanation:
      'A match guard is an `if` condition placed after a pattern, like `Some(x) if x > 5 => ...`. The arm matches only if both the pattern matches and the guard condition is true. Match guards allow more refined filtering than patterns alone, though the compiler cannot always verify exhaustiveness with guards.',
    reference: 'The Rust Book, Chapter 18.3 - Pattern Syntax',
  },
  {
    id: 'q049',
    topic: 'Pattern Matching',
    difficulty: 'hard',
    question:
      'What does the `@` operator do in a pattern?\n```rust\nmatch msg {\n    Message::Hello { id: id_var @ 3..=7 } => println!("Range id: {}", id_var),\n    _ => println!("other"),\n}\n```',
    options: {
      A: 'It dereferences the matched value',
      B: 'It binds the matched value to a variable while also testing it against a range or pattern',
      C: 'It converts the value to a reference',
      D: 'It creates a type alias for the pattern',
    },
    answer: 'B',
    explanation:
      'The `@` operator lets you bind a variable to a value at the same time as testing it against a pattern. In the example, `id_var @ 3..=7` checks that `id` is in the range 3 through 7 and simultaneously binds the matched value to `id_var` so it can be used in the arm body.',
    reference: 'The Rust Book, Chapter 18.3 - Pattern Syntax',
  },
  {
    id: 'q050',
    topic: 'Pattern Matching',
    difficulty: 'medium',
    question:
      'What does `while let` do?\n```rust\nwhile let Some(val) = stack.pop() {\n    println!("{}", val);\n}\n```',
    options: {
      A: 'It loops forever regardless of the pattern',
      B: 'It loops as long as the pattern matches, breaking when the pattern fails',
      C: 'It only runs once even if the pattern matches multiple times',
      D: 'It collects all matched values into a vector',
    },
    answer: 'B',
    explanation:
      '`while let` continues looping as long as the pattern successfully matches the expression. When `stack.pop()` returns `None`, the pattern `Some(val)` fails to match, and the loop terminates. This is a concise way to drain an iterator or repeatedly unwrap optional values.',
    reference: 'The Rust Book, Chapter 18.1 - All the Places Patterns Can Be Used',
  },

  // ============================================================
  // COLLECTIONS & ITERATORS (8 questions)
  // ============================================================
  {
    id: 'q051',
    topic: 'Collections & Iterators',
    difficulty: 'easy',
    question: 'How do you create an empty `Vec<i32>` and add elements to it?',
    options: {
      A: '`let v = Vec::new(); v.add(1);`',
      B: '`let mut v = Vec::new(); v.push(1);`',
      C: '`let v = []; v.append(1);`',
      D: '`let v = Vec::create(); v.insert(1);`',
    },
    answer: 'B',
    explanation:
      '`Vec::new()` creates an empty vector, and `.push()` appends an element to the end. The vector must be declared `mut` because `.push()` modifies it. You can also use the `vec![1, 2, 3]` macro to create a vector with initial values.',
    reference: 'The Rust Book, Chapter 8.1 - Storing Lists of Values with Vectors',
  },
  {
    id: 'q052',
    topic: 'Collections & Iterators',
    difficulty: 'easy',
    question: 'Which method converts a collection into an iterator that takes ownership of the elements?',
    options: {
      A: '`.iter()`',
      B: '`.iter_mut()`',
      C: '`.into_iter()`',
      D: '`.as_iter()`',
    },
    answer: 'C',
    explanation:
      '`.into_iter()` consumes the collection and returns an iterator that yields owned values. `.iter()` yields immutable references (`&T`), and `.iter_mut()` yields mutable references (`&mut T`). The choice depends on whether you need to keep the collection or consume it.',
    reference: 'The Rust Book, Chapter 13.2 - Processing a Series of Items with Iterators',
  },
  {
    id: 'q053',
    topic: 'Collections & Iterators',
    difficulty: 'medium',
    question:
      'What does this iterator chain produce?\n```rust\nlet result: Vec<i32> = (1..=5).filter(|x| x % 2 == 0).map(|x| x * x).collect();\n```',
    options: {
      A: '`[1, 4, 9, 16, 25]`',
      B: '`[4, 16]`',
      C: '`[2, 4]`',
      D: '`[1, 3, 5]`',
    },
    answer: 'B',
    explanation:
      'The range `1..=5` produces 1, 2, 3, 4, 5. The `filter` keeps only even numbers: 2, 4. The `map` squares them: 4, 16. Finally, `collect()` gathers the results into a `Vec<i32>`. Iterator adaptors are lazy — no computation happens until `collect()` is called.',
    reference: 'The Rust Book, Chapter 13.2 - Processing a Series of Items with Iterators',
  },
  {
    id: 'q054',
    topic: 'Collections & Iterators',
    difficulty: 'medium',
    question: 'What does the `fold` method do on an iterator?',
    options: {
      A: 'It splits an iterator into two halves',
      B: 'It accumulates a single value by applying a closure to each element along with a running accumulator',
      C: 'It sorts the iterator elements in place',
      D: 'It removes duplicate elements from the iterator',
    },
    answer: 'B',
    explanation:
      '`fold` takes an initial accumulator value and a closure that combines the accumulator with each element. For example, `(1..=4).fold(0, |acc, x| acc + x)` computes the sum 10. It consumes the entire iterator and returns the final accumulator value, similar to `reduce` in other languages.',
    reference: 'Rust std docs - Iterator::fold',
  },
  {
    id: 'q055',
    topic: 'Collections & Iterators',
    difficulty: 'medium',
    question: 'How do you look up a value in a `HashMap` safely?',
    options: {
      A: '`map[key]` — it returns a default value if the key is missing',
      B: '`map.get(&key)` — it returns `Option<&V>`',
      C: '`map.find(key)` — it returns `Result<V, E>`',
      D: '`map.lookup(key)` — it returns a nullable reference',
    },
    answer: 'B',
    explanation:
      '`HashMap::get(&key)` returns `Option<&V>` — `Some(&value)` if the key exists, or `None` if it does not. Using index syntax `map[&key]` will panic if the key is missing. The `get` method is preferred because it forces you to handle the missing-key case explicitly.',
    reference: 'The Rust Book, Chapter 8.3 - Storing Keys with Associated Values in Hash Maps',
  },
  {
    id: 'q056',
    topic: 'Collections & Iterators',
    difficulty: 'hard',
    question:
      'What is the difference between `.iter().map(...).collect()` and a `for` loop for transforming elements?',
    options: {
      A: 'They always produce identical machine code; the choice is purely stylistic',
      B: 'Iterator chains can be optimized by the compiler into efficient loops without intermediate allocations, and they compose better, but a `for` loop can be clearer for side-effect-heavy code',
      C: 'For loops are always faster because iterators have overhead',
      D: 'Iterators use heap allocation for every intermediate step',
    },
    answer: 'B',
    explanation:
      'Rust\'s iterator adaptors are zero-cost abstractions — the compiler often fuses the chain into a single loop with no intermediate allocations. Iterator chains also enable a more functional, composable style. For loops are better when the logic involves complex side effects or mutable state that would be awkward in a closure.',
    reference: 'The Rust Book, Chapter 13.4 - Comparing Performance',
  },
  {
    id: 'q057',
    topic: 'Collections & Iterators',
    difficulty: 'medium',
    question: 'What does `.entry(key).or_insert(default)` do on a `HashMap`?',
    options: {
      A: 'It always overwrites the existing value with the default',
      B: 'It returns a mutable reference to the value for the key, inserting the default value if the key was not present',
      C: 'It returns `Option<&V>` like `get`',
      D: 'It removes the key if the default matches the current value',
    },
    answer: 'B',
    explanation:
      'The entry API provides an efficient way to insert a value only if the key is absent. `.entry(key)` returns an `Entry` enum, and `.or_insert(default)` inserts the default if the entry is vacant, then returns a `&mut V` to the value. This avoids a separate lookup-then-insert pattern.',
    reference: 'The Rust Book, Chapter 8.3 - Storing Keys with Associated Values in Hash Maps',
  },
  {
    id: 'q058',
    topic: 'Collections & Iterators',
    difficulty: 'hard',
    question:
      'What does this code do?\n```rust\nlet names = vec!["Alice", "Bob", "Charlie"];\nlet result: String = names.iter().enumerate()\n    .map(|(i, name)| format!("{}. {}", i + 1, name))\n    .collect::<Vec<_>>()\n    .join("\\n");\n```',
    options: {
      A: 'It creates a comma-separated string of names',
      B: 'It builds a numbered list of names separated by newlines, like "1. Alice\\n2. Bob\\n3. Charlie"',
      C: 'It counts the number of names',
      D: 'It sorts the names alphabetically and joins them',
    },
    answer: 'B',
    explanation:
      '`.enumerate()` pairs each element with its index. `.map()` formats each pair as a numbered string. `.collect::<Vec<_>>()` gathers them into a vector of strings. `.join("\\n")` combines them with newline separators. This is a common pattern for building formatted output from iterators.',
  },

  // ============================================================
  // MODULES & CRATES (5 questions)
  // ============================================================
  {
    id: 'q059',
    topic: 'Modules & Crates',
    difficulty: 'easy',
    question: 'What does the `pub` keyword do in Rust?',
    options: {
      A: 'It makes an item public, accessible from outside its module',
      B: 'It publishes the crate to crates.io',
      C: 'It makes a variable mutable',
      D: 'It marks a function as the entry point of the program',
    },
    answer: 'A',
    explanation:
      'By default, all items in Rust (functions, structs, modules, etc.) are private to their parent module. The `pub` keyword makes an item visible to code outside its module. There are also more granular visibility modifiers like `pub(crate)` and `pub(super)`.',
    reference: 'The Rust Book, Chapter 7.3 - Paths for Referring to an Item in the Module Tree',
  },
  {
    id: 'q060',
    topic: 'Modules & Crates',
    difficulty: 'medium',
    question: 'What is the difference between a "crate" and a "module" in Rust?',
    options: {
      A: 'They are the same thing',
      B: 'A crate is the smallest unit of compilation (a library or binary); a module is a namespace within a crate for organizing code',
      C: 'A module is a separate compiled unit; a crate is a folder',
      D: 'A crate is only for libraries; modules are only for binaries',
    },
    answer: 'B',
    explanation:
      'A crate is Rust\'s compilation unit — it can be a binary (with `main`) or a library. Modules (defined with `mod`) organize code within a crate into a tree of namespaces. A crate can contain many modules, and modules control visibility and path organization.',
    reference: 'The Rust Book, Chapter 7.1 - Packages and Crates',
  },
  {
    id: 'q061',
    topic: 'Modules & Crates',
    difficulty: 'medium',
    question: 'What does `use std::collections::HashMap;` do?',
    options: {
      A: 'It downloads the HashMap crate from crates.io',
      B: 'It brings the `HashMap` type into the current scope so you can use it without the full path',
      C: 'It creates a new HashMap instance',
      D: 'It implements the HashMap trait for the current module',
    },
    answer: 'B',
    explanation:
      'The `use` declaration creates a shortcut so you can refer to `HashMap` directly instead of typing `std::collections::HashMap` every time. It does not import code — the standard library is always available. You can also use `use` with aliases via `as` and glob imports with `*`.',
    reference: 'The Rust Book, Chapter 7.4 - Bringing Paths into Scope with the use Keyword',
  },
  {
    id: 'q062',
    topic: 'Modules & Crates',
    difficulty: 'easy',
    question: 'What file does Cargo use to manage project dependencies and metadata?',
    options: {
      A: 'package.json',
      B: 'Cargo.toml',
      C: 'Makefile',
      D: 'build.rs',
    },
    answer: 'B',
    explanation:
      '`Cargo.toml` is the manifest file for Rust projects, specifying the package name, version, edition, dependencies, and build configuration. Cargo reads this file to download dependencies, compile the project, run tests, and more.',
    reference: 'The Rust Book, Chapter 1.3 - Hello, Cargo!',
  },
  {
    id: 'q063',
    topic: 'Modules & Crates',
    difficulty: 'hard',
    question: 'What does `pub(crate)` visibility mean?',
    options: {
      A: 'The item is public to all crates that depend on this one',
      B: 'The item is visible anywhere within the current crate but not to external crates',
      C: 'The item is visible only in the parent module',
      D: 'The item is public but only during compilation, not at runtime',
    },
    answer: 'B',
    explanation:
      '`pub(crate)` is a restricted visibility modifier that makes an item accessible from anywhere within the same crate but hidden from external consumers. This is useful for internal APIs that need to be shared across modules within a library without exposing them as part of the public API.',
    reference: 'The Rust Book, Chapter 7.3 - Paths for Referring to an Item in the Module Tree',
  },

  // ============================================================
  // UNSAFE RUST (5 questions)
  // ============================================================
  {
    id: 'q064',
    topic: 'Unsafe Rust',
    difficulty: 'medium',
    question: 'Which operations are allowed inside an `unsafe` block that are not allowed in safe Rust?',
    options: {
      A: 'Modifying mutable variables and calling regular functions',
      B: 'Dereferencing raw pointers, calling unsafe functions, accessing mutable statics, and implementing unsafe traits',
      C: 'Disabling the borrow checker entirely',
      D: 'Allocating memory on the heap and using generics',
    },
    answer: 'B',
    explanation:
      '`unsafe` blocks unlock five specific superpowers: dereferencing raw pointers, calling `unsafe` functions, accessing or modifying mutable static variables, implementing unsafe traits, and accessing fields of unions. The borrow checker and other safety checks still apply inside `unsafe` — it only relaxes these specific restrictions.',
    reference: 'The Rust Book, Chapter 19.1 - Unsafe Rust',
  },
  {
    id: 'q065',
    topic: 'Unsafe Rust',
    difficulty: 'easy',
    question: 'What are raw pointers in Rust?',
    options: {
      A: 'References that the borrow checker validates at compile time',
      B: '`*const T` and `*mut T` pointers that can be created in safe code but can only be dereferenced in an `unsafe` block',
      C: 'Smart pointers like `Box` and `Rc`',
      D: 'Function pointers used in callbacks',
    },
    answer: 'B',
    explanation:
      'Raw pointers (`*const T` for immutable and `*mut T` for mutable) are similar to C pointers. They can be created from references in safe code, but dereferencing them requires `unsafe` because the compiler cannot guarantee they point to valid memory. They are primarily used for FFI and low-level memory manipulation.',
    reference: 'The Rust Book, Chapter 19.1 - Unsafe Rust',
  },
  {
    id: 'q066',
    topic: 'Unsafe Rust',
    difficulty: 'medium',
    question: 'What is FFI in the context of Rust?',
    options: {
      A: 'Fast Function Inlining — a compiler optimization',
      B: 'Foreign Function Interface — a mechanism for calling functions written in other languages like C',
      C: 'Functional Feature Integration — a way to add closures to structs',
      D: 'File Format Inspection — a tool for reading binary files',
    },
    answer: 'B',
    explanation:
      'FFI (Foreign Function Interface) allows Rust code to call functions from other languages (most commonly C) and vice versa. Rust uses `extern "C"` blocks to declare foreign functions and `#[no_mangle]` with `extern "C" fn` to export Rust functions. FFI calls are inherently `unsafe` because the compiler cannot verify the foreign code\'s guarantees.',
    reference: 'The Rust Book, Chapter 19.1 - Unsafe Rust',
  },
  {
    id: 'q067',
    topic: 'Unsafe Rust',
    difficulty: 'hard',
    question:
      'What does it mean for a function to be marked `unsafe fn`?',
    options: {
      A: 'The function contains bugs that have not been fixed yet',
      B: 'The function has preconditions that the compiler cannot verify, and callers must uphold those invariants — calling it requires an `unsafe` block',
      C: 'The function will always cause undefined behavior',
      D: 'The function cannot be tested',
    },
    answer: 'B',
    explanation:
      'An `unsafe fn` declaration indicates that the function has preconditions (safety invariants) that must be upheld by the caller but cannot be checked by the compiler. For example, `slice::from_raw_parts` requires a valid pointer and correct length. The `unsafe` keyword is a contract — it documents the caller\'s responsibility, not that the function itself is broken.',
    reference: 'The Rust Book, Chapter 19.1 - Unsafe Rust',
  },
  {
    id: 'q068',
    topic: 'Unsafe Rust',
    difficulty: 'hard',
    question:
      'What is the correct way to create a safe abstraction over unsafe code?',
    options: {
      A: 'Wrap the unsafe code in a safe function that upholds all invariants internally, so callers cannot violate safety',
      B: 'Mark the entire module as `unsafe`',
      C: 'Use `#[allow(unsafe_code)]` to suppress warnings',
      D: 'There is no way to make unsafe code safe',
    },
    answer: 'A',
    explanation:
      'The standard practice is to encapsulate `unsafe` operations inside a safe public API that internally guarantees all required invariants. For example, `Vec` uses unsafe code internally for raw memory management but exposes a safe interface. This limits the surface area where bugs can cause undefined behavior and lets users rely on safe Rust\'s guarantees.',
    reference: 'The Rust Book, Chapter 19.1 - Unsafe Rust',
  },

  // ============================================================
  // TESTING & DOCUMENTATION (6 questions)
  // ============================================================
  {
    id: 'q069',
    topic: 'Testing & Documentation',
    difficulty: 'easy',
    question: 'How do you mark a function as a unit test in Rust?',
    options: {
      A: 'Name it with a `test_` prefix',
      B: 'Annotate it with `#[test]`',
      C: 'Place it in a file named `tests.rs`',
      D: 'Use the `assert!` macro anywhere in the code',
    },
    answer: 'B',
    explanation:
      'The `#[test]` attribute tells the Rust compiler and `cargo test` to run the annotated function as a test. Test functions take no arguments and return either `()` or `Result<(), E>`. They are compiled only when running tests, not in normal builds.',
    reference: 'The Rust Book, Chapter 11.1 - How to Write Tests',
  },
  {
    id: 'q070',
    topic: 'Testing & Documentation',
    difficulty: 'easy',
    question: 'What does `assert_eq!(a, b)` do in a test?',
    options: {
      A: 'It assigns `b` to `a`',
      B: 'It checks that `a` and `b` are equal, panicking with a descriptive message if they are not',
      C: 'It prints both values for debugging',
      D: 'It returns `true` if `a == b`, `false` otherwise',
    },
    answer: 'B',
    explanation:
      '`assert_eq!` compares two values for equality using `PartialEq` and panics if they differ, printing both values using their `Debug` implementation. There is also `assert_ne!` for inequality checks and `assert!` for boolean conditions. These macros are the primary tools for writing test assertions.',
    reference: 'The Rust Book, Chapter 11.1 - How to Write Tests',
  },
  {
    id: 'q071',
    topic: 'Testing & Documentation',
    difficulty: 'medium',
    question: 'What is a doc test in Rust?',
    options: {
      A: 'A test that checks whether documentation comments exist',
      B: 'A code example inside a `///` doc comment that `cargo test` compiles and runs to verify correctness',
      C: 'A test written in a separate documentation file',
      D: 'A test that generates HTML documentation',
    },
    answer: 'B',
    explanation:
      'Doc tests are code blocks inside `///` documentation comments that are automatically extracted and run by `cargo test`. They serve double duty as both usage examples in generated documentation and executable tests that verify the examples stay correct as the code evolves.',
    reference: 'The Rust Book, Chapter 14.2 - Publishing a Crate to Crates.io',
  },
  {
    id: 'q072',
    topic: 'Testing & Documentation',
    difficulty: 'medium',
    question: 'Where do integration tests live in a Rust project and how do they differ from unit tests?',
    options: {
      A: 'In the `tests/` directory at the crate root; they test the public API as an external consumer would',
      B: 'In the same file as the code they test; they can access private functions',
      C: 'In a `benches/` directory; they measure performance',
      D: 'In `Cargo.toml`; they are declarative test specifications',
    },
    answer: 'A',
    explanation:
      'Integration tests are placed in the `tests/` directory at the top level of a Cargo project. Each file there is compiled as a separate crate that can only access the library\'s public API. This ensures the public interface works correctly from an external perspective, unlike unit tests which can access private items via `#[cfg(test)]` modules.',
    reference: 'The Rust Book, Chapter 11.3 - Test Organization',
  },
  {
    id: 'q073',
    topic: 'Testing & Documentation',
    difficulty: 'medium',
    question: 'How do you test that a function should panic?',
    options: {
      A: 'Use `#[test] #[should_panic]` on the test function',
      B: 'Wrap the call in a `try/catch` block',
      C: 'Use `assert_panics!` macro',
      D: 'Test functions cannot verify panics',
    },
    answer: 'A',
    explanation:
      'The `#[should_panic]` attribute, placed alongside `#[test]`, marks a test as expected to panic. The test passes if the function panics, and fails if it completes without panicking. You can optionally specify `#[should_panic(expected = "message")]` to verify the panic message contains a specific substring.',
    reference: 'The Rust Book, Chapter 11.1 - How to Write Tests',
  },
  {
    id: 'q074',
    topic: 'Testing & Documentation',
    difficulty: 'hard',
    question:
      'What does `#[cfg(test)]` do on a module?',
    options: {
      A: 'It marks the module as deprecated',
      B: 'It conditionally compiles the module only when running `cargo test`, excluding it from normal builds',
      C: 'It makes the module public only during testing',
      D: 'It enables unsafe code inside the module',
    },
    answer: 'B',
    explanation:
      '`#[cfg(test)]` is a conditional compilation attribute that includes the annotated module only when the `test` configuration flag is active (i.e., during `cargo test`). This is the standard way to define unit test modules that can access private items in the parent module without bloating release binaries.',
    reference: 'The Rust Book, Chapter 11.3 - Test Organization',
  },
];

export function getQuestionsByTopic(topic: string): ExamQuestion[] {
  return examQuestions.filter(q => q.topic === topic);
}

export function getQuestionsByDifficulty(difficulty: ExamQuestion['difficulty']): ExamQuestion[] {
  return examQuestions.filter(q => q.difficulty === difficulty);
}

export function getRandomQuestions(count: number): ExamQuestion[] {
  const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const examTopics = [...new Set(examQuestions.map(q => q.topic))];
