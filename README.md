# Workflow Management App

A web-based workflow management application that allows users to create, configure, and manage workflow nodes using an interactive flowchart. The application provides a React Flow-based visual interface, a configuration panel for node properties, and a data table to track node details.

## Features
- **Interactive Workflow Editor**: Add, move, and delete nodes with a visual drag-and-drop interface.
- **Configurable Nodes**: Modify node properties dynamically using a right-side configuration panel.
- **Node Data Table**: View and edit node details in a structured tabular format.
- **Scroll-to-View Navigation**: Easily switch between the flow editor and the data table with smooth scrolling.
- **Node Type & Status Styling**: Different styles for task, condition, and notification nodes, as well as active/inactive statuses.

## Tech Stack
- **Frontend**: React, Tailwind CSS, @xyflow/react (React Flow)
- **State Management**: React Hooks
- **Form Handling**: react-hook-form
- **Table Rendering**: TanStack Table (react-table)

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/workflow-app.git
   cd workflow
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- **Creating Nodes**: Click on the canvas to add a new node.
- **Configuring Nodes**: Select a node to open the right panel and modify its properties.
- **Deleting Nodes**: Use the delete button in the node panel or table.
- **Viewing Data Table**: Scroll down or use the "View Table" button to access node details.
- **Navigating Back**: Click the "Back to Flow" button to return to the workflow editor.

## Future Enhancements
- Implement backend integration for persistent data storage.
- Add user authentication and role-based access control.
- Improve drag-and-drop interactions for better UX.
- Enhance table filtering and sorting capabilities.


