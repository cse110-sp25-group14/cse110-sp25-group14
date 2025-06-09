| Status | Date | Decision-Makers | Consulted | Informed |
| --- | --- | --- | --- | --- |
| Accepted |  | Eric, Srideep, Gautam, Travis, Mark, Kilhoon | Nilay, Aarush | Victoria, Emily, Carl |

# Local Storage Implementation

## Context and Problem Statement

The game requires storing user records, such as sequences achieved and records broken. We considered using a network-based storage solution, but it was deemed too complex and resource-intensive.

## Decision Drivers

* Latency concerns: Reducing latency to improve user experience
* Reducing complexity in the codebase: Simplifying storage and retrieval mechanisms
* Time constraints: Meeting tight development timelines and avoiding additional dependencies

## Considered Options

* Using a network-based storage solution
* Storing user records in a database on the server-side
* Using global variables or a simple key-value store

## Decision Outcome

Chosen option: We decided to use local storage to store user records, leveraging the simplicity and speed of client-side storage.

## Decision Details

Local storage is used to store user records, including:

* **Sequence Management**:
	+ Storing sequences in local storage (`localStorage.getItem("sequence")`)
	+ Loading records from local storage (`loadRecords()` method)
	+ Saving recent records to local storage (`localStorage.setItem("sequence-recent")`)
* **Game State Tracking**:
	+ Game state tracking using various properties (e.g., `firstCard`, `secondCard`, `lockBoard`)
	+ Timing and stopwatch implementation using `setInterval` function
* **Record Management**:
	+ Loading records from local storage (`loadRecords()` method)
	+ Saving recent records to local storage (`localStorage.setItem("sequence-recent")`)
	+ Checking and updating record values in local storage

## Technical Details

* **`localStorage.getItem()`** and **`localStorage.setItem()`:**
	+ `localStorage.getItem("key")`: Retrieves the value associated with the given key.
	+ `localStorage.setItem("key", value)`: Stores a value in local storage, with the key-value pair specified.
	+ These functions are used extensively throughout the game code.

## Consequences

* Good, because local storage provides a simple and efficient way to store user records
* Bad, because it may not provide the same level of security as a network-based storage solution- users can edit records and similar simply by editing their local storage, so the records in the game cannot be verified. But this is not a competitive game, and records are not meant to be shared or competed for in any way. 

## Confirmation

This decision was confirmed through:

* Reviewing local storage limitations and benefits
* Comparing local storage to server-side solutions 
* Implementation of a simple yet effective local storage solution

## Alternative Storage Solutions

### Network-based Storage Solution (e.g., Firebase Realtime Database, AWS AppSync)

A network-based storage solution would provide better security and scalability, but it may introduce additional complexity and latency concerns.

### Storing User Records in a Database on the Server-side

Storing user records in a database on the server-side would provide better security and scalability, but it may require significant additional development and infrastructure resources.

### Using Global Variables or a Simple Key-Value Store

Using global variables or a simple key-value store would provide a lightweight solution, but it may not be suitable for storing small amounts of data or providing better security.