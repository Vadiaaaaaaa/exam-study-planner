# Exam Study Planner

A constraint-based study scheduling web application that generates structured study plans based on exam deadlines, topic difficulty, assignments, and daily time availability.

This project focuses on deterministic scheduling logic, state consistency, and real-world date handling in a client-side React environment.


## Overview

The application allows users to:

* Add exams with deadlines
* Add syllabus topics per subject with difficulty weights
* Add assignment due dates
* Define daily study hour limits
* Generate a balanced study calendar
* Automatically insert revision sessions prior to exams

The scheduling algorithm ensures that:

* Daily study time never exceeds the defined limit
* Topics are distributed proportionally to difficulty
* Revision time is reserved before exams
* Multiple subjects share daily availability without exceeding capacity


## Scheduling Algorithm

The planner uses a greedy, constraint-based allocation strategy.

### Inputs

* Exam date
* Topics (with difficulty score 1–10)
* Daily available hours
* Assignments with due dates

### Core Logic

1. Topics are filtered per subject.
2. Each topic is assigned a remaining effort equal to its difficulty.
3. Starting from the current date:

   * For each day before the exam:

     * Allocate remaining effort from topics
     * Respect global daily hour cap
4. A revision session is inserted on the day prior to the exam.
5. If multiple exams overlap, a shared `dayHoursLeft` structure prevents over-allocation.

### Constraints Enforced

* `totalAllocatedHoursPerDay <= hoursPerDay`
* No scheduling beyond exam date
* No negative topic effort
* Assignment and revision events are date-bound and non-iterative

### Complexity

Let:

* E = number of exams
* T = number of topics per subject
* D = number of days before exam

Worst-case time complexity is approximately:

O(E × T × D)

Given typical student-scale inputs, performance remains well within acceptable limits for client-side execution.


## Date Handling Strategy

To avoid timezone shift issues commonly caused by `Date.toISOString()`, the application:

* Parses dates manually using `new Date(year, month - 1, day)`
* Generates keys using local date formatting (`YYYY-MM-DD`)
* Normalizes all comparisons to midnight (00:00:00)

This prevents off-by-one errors in exam rendering and revision placement.


## State Architecture

State is centralized in `App.jsx` and includes:

* `exams`
* `topics`
* `assignments`
* `hoursPerDay`
* `calendar`
* `hydrated` (localStorage guard)

Derived state (`calendar`) is regenerated explicitly and invalidated when:

* Exams change
* Topics change
* Assignments change
* Daily availability changes

This avoids stale scheduling artifacts.


## Persistence Strategy

Data persistence uses `localStorage`.

Key design considerations:

* Hydration guard to prevent overwriting stored data on first render
* Explicit invalidation when dependencies change
* Regeneration-only approach (no incremental mutation of calendar state)


## Tech Stack

Frontend:

* React (functional components + hooks)
* JavaScript (ES6+)
* Tailwind CSS

Persistence:

* Browser LocalStorage

Deployment:

* Netlify


## Edge Cases Handled

* Timezone-induced date offset errors
* Daily hour over-allocation
* Deletion cascade (topics → calendar regeneration)
* Overlapping exams
* Revision scheduling conflicts
* Assignment display separation


## Local Development

```bash
git clone https://github.com/YOUR_USERNAME/exam-study-planner.git
cd exam-study-planner
npm install
npm run dev
```


## Potential Extensions

* Backend API + authentication
* Database persistence
* Conflict resolution prioritization strategy
* Scheduling optimization heuristics
* Unit tests for allocation logic
* Calendar export (iCal / PDF)
* Performance optimization for large input sets


