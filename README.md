# Advanced Task Manager
# Screenshots
![image](https://github.com/user-attachments/assets/4c34bb9c-9f5d-4906-a4cc-bcc1c5d0c3e9)
![image](https://github.com/user-attachments/assets/55f9f890-70a1-4b2d-8664-06ab55461fbc)

**Application Link: https://remarkable-melba-25440e.netlify.app/**


### Step 1: Understanding the Interface

When you open the app, you'll see:

- **Header:** `Task Tracker Pro` with statistics cards  
- **Statistics Dashboard:** Shows  
  - Total Tasks  
  - Completed Tasks  
  - High Priority Tasks  
- **Add New Task Section:** Two-step form for creating tasks  
- **Rule Builder Section:** For creating automation rules (collapsed by default)  
- **Search Bar:** For filtering tasks  
- **Task List:** Where your tasks appear  

### Step 2: Adding Your First Task

**Enter Task Name:**

- Type your task description in the **"Task Name"** field  
- Click **"Next Step"** (you'll get an error if the field is empty)

**Select Priority:**

- Choose from **High (red)**, **Medium (yellow)**, or **Low (green)** priority  
- Click **"Add Task"** to save, or **"Back"** to change the name
- ### Step 3: Managing Tasks

**To Complete a Task:**

- Click the checkbox next to any task to mark it complete/incomplete  
- Completed tasks appear with a strikethrough and reduced opacity

**To Edit a Task:**

- Click the pencil (Edit) icon on any task  
- Modify the name and/or priority  
- Click the save icon to confirm or **X** to cancel

**To Delete a Task:**

- Click the trash (Delete) icon on any task  
- The task is permanently removed

---

### Step 4: Using Search

- Type in the search bar to instantly filter tasks by name  
- The search is case-insensitive and matches partial text  
- Clear the search to see all tasks again

---

### Step 5: Creating Automation Rules

**Open Rule Builder:**

- Click on the **"Rule Builder"** section to expand it

**Add a New Rule:**

- Click **"Add New Rule"** button  
- Fill out the form:  
  - **Rule Name:** Give it a descriptive name  
  - **Field:** Choose what to check (Task Name, Priority, Completed, Task Count)  
  - **Condition:** Select the comparison type  
  - **Value:** Enter the value to match against  
  - **Action:** Choose what happens when the rule triggers

**Example Rules to Try:**

**Highlight Important Tasks:**

- **Rule Name:** "Highlight Urgent"  
- **Field:** Task Name  
- **Condition:** Contains  
- **Value:** "urgent"  
- **Action:** Highlight task

**Hide Completed Tasks:**

- **Rule Name:** "Hide Done"  
- **Field:** Completed  
- **Condition:** Equals  
- **Value:** Completed  
- **Action:** Hide task

---

### Step 6: Managing Rules

**Enable/Disable Rules:**

- Use the toggle switch next to each rule  
- Green toggle = active, gray toggle = inactive

**Delete Rules:**

- Click the trash icon next to any rule to remove it

**Handle Conflicts:**

- If rules conflict (e.g., one hides a task, another highlights it), you'll see a warning  
- Review and adjust conflicting rules as needed

---

### Step 7: Advanced Usage Tips

- **Task Count Rules:** Create rules based on how many tasks you have  
  _Example:_ "If more than 5 high priority tasks, show warning"

- **Combine Multiple Rules:** Tasks can match multiple rules simultaneously

- **Use Priority-Based Rules:** Automatically organize tasks by priority level

- **Search + Rules:** Use search to find tasks, then create rules based on patterns you notice

---

### Step 8: Data Persistence

- All your tasks and rules are automatically saved to your browser  
- Everything persists when you refresh the page or close/reopen the browser  
- No account needed — everything is stored locally

---

### 🚀 Quick Start Workflow

1. Add 3–5 sample tasks with different priorities  
2. Try searching for specific tasks  
3. Create a simple highlight rule (e.g., highlight tasks containing "work")  
4. Toggle the rule on/off to see the effect  
5. Experiment with hide/show rules to organize your view


