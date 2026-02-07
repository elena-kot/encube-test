# Technical and Product Decisions

## 1. Architectural Strategy: Simplified Feature-Sliced Design (FSD)

I chose a simplified version of Feature-Sliced Design (FSD) to organize the codebase. While full FSD can be heavy for a 4-5 hour task, using its core layers provides a foundation for any possible complex next steps.

### FSD Layer Hierarchy

- **Entity** = types + dumb UI components + API (uses **shared**)
- **Feature** = user action combining entities + logic (uses **entities** + **shared**)
- **Widget** = UI section combining other widgets + features + entities (uses **widgets** + **features** + **entities** + **shared**)

### Layers

- **`src/shared`**: Houses implementation-agnostic tools like the coordinate math utilities and generic UI atoms.
- **`src/entities`**: Defines the **Nouns** of the domain (e.g., Comment, DesignElement). This is where the data models, TypeScript types, and API logic live.
- **`src/features`**: Defines the **Verbs** or user actions (e.g. AddCommentThread). Interaction logic and state management are encapsulated here. 
- **`src/widgets`**: Defines the **Stages** where domain nouns and user verbs come together. Widgets orchestrate layout and composition, not business rules.

## 2. Coordinate System and Viewport Mapping

The most critical technical requirement was ensuring that comments remain fixed to the canvas during zoom and pan actions. I implemented a Canvas-to-Screen and vice versa and conversion utilities.
All coordinates are stored in canvas coordinates.

## 3. State Management

Given the time and task constraint, I utilized lightweight React Context and custom hooks to avoid passing down the props and unnessesary re-renderings.
In real life I'd prefer to use Redux or MobX for better data and UI separation, async handling,  debugging and observability. MobX reactions can be especially usefull for syncing canvas and store data.

## 4. Trade-offs: Rendering Engine

Aside from state managements, given the time constraint, I used a standard 2D HTML/SVG canvas for the initial prototype.
The FSD structure ensures that the rendering layer is decoupled enough to be swapped for a anything else in the future.
Comments – could be done using recursion and parentId, but for faster implementstion I treat them as if they are just sorted by date in backend.

## 5. What I Would Do With More Time

### Comments
– Implement adding comment and replies. Adding comment would open the comments pane with a textarea. Also comments pane should be able to show only one comments thread on click on a comment in canvas. For adding comments and replies I'd use CommentsProvider. In real life I'd use a powerful state management lib as i'm not a big fan of 100500 useState/useReducer/useMemo in the code – they are hard to read and maintain.

### Rest
– Set linters, auto formatting, pre-commit etc. up waaay better. I totally hate when they are not set up properly which results in poorly formatted code, and totally hate to commit such code.
- Use Three.js or anythting based on it for real 3D.
– Probably use Tanstack query for api requests. I can (and did in the past) implement things like retry, but thats lib has all you may need out of the box. The question is whether all that functionality is really required or not. Need more time and info about requirements to research.
– Add proper error handling, including reporting to Sentry/Rollbar etc. and UI for it.
- Improve UI design. I mainly focused on designing the architecture as close to production as possible. Yet users don't care about the code and architecture, they want a nice, smooth and intuitive UI.
