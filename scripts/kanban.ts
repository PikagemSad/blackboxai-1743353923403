interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
}

class KanbanBoard {
    private tasks: Task[] = [];
    private taskDialog: HTMLDialogElement;
    private taskForm: HTMLFormElement;
    private addTaskBtn: HTMLButtonElement;

    constructor() {
        this.taskDialog = document.getElementById('task-dialog') as HTMLDialogElement;
        this.taskForm = document.getElementById('task-form') as HTMLFormElement;
        this.addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;

        this.initializeEventListeners();
        this.setupDragAndDrop();
        this.loadTasks();
    }

    private initializeEventListeners(): void {
        this.addTaskBtn.addEventListener('click', () => this.taskDialog.showModal());
        document.getElementById('cancel-btn')?.addEventListener('click', () => this.taskDialog.close());
        
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewTask();
        });
    }

    private setupDragAndDrop(): void {
        document.querySelectorAll('.tasks').forEach(taskList => {
            taskList.addEventListener('dragover', (e: Event) => {
                const dragEvent = e as DragEvent;
                e.preventDefault();
                const closestTask = this.getClosestTaskElement(dragEvent.clientY, taskList as HTMLElement);
                const draggedTask = document.querySelector('.dragging') as HTMLElement;
                
                if (closestTask) {
                    taskList.insertBefore(draggedTask, closestTask);
                } else {
                    taskList.appendChild(draggedTask);
                }
            });

            taskList.addEventListener('dragend', (e: Event) => {
                const taskElement = document.querySelector('.dragging') as HTMLElement;
                if (taskElement) {
                    taskElement.classList.remove('dragging');
                    const taskId = taskElement.dataset.taskId;
                    const newStatus = (taskList as HTMLElement).dataset.status as Task['status'];
                    
                    if (taskId && newStatus) {
                        this.updateTaskStatus(taskId, newStatus);
                    }
                }
            });
        });

        document.addEventListener('dragstart', (e: Event) => {
            const taskElement = (e.target as HTMLElement).closest('.task-card');
            if (taskElement) {
                taskElement.classList.add('dragging');
            }
        });
    }

    private getClosestTaskElement(y: number, taskList: HTMLElement): HTMLElement | null {
        const tasks = taskList.querySelectorAll('.task-card:not(.dragging)');
        let closestTask: HTMLElement | null = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        tasks.forEach(task => {
            const box = task.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task as HTMLElement;
            }
        });

        return closestTask;
    }

    private addNewTask(): void {
        const titleInput = document.getElementById('task-title') as HTMLInputElement;
        const descriptionInput = document.getElementById('task-description') as HTMLTextAreaElement;
        const prioritySelect = document.getElementById('task-priority') as HTMLSelectElement;

        const newTask: Task = {
            id: Date.now().toString(),
            title: titleInput.value,
            description: descriptionInput.value,
            priority: prioritySelect.value as Task['priority'],
            status: 'todo'
        };

        this.tasks.push(newTask);
        this.renderTask(newTask);
        this.saveTasks();
        this.taskForm.reset();
        this.taskDialog.close();
    }

    private updateTaskStatus(taskId: string, newStatus: Task['status']): void {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].status = newStatus;
            this.saveTasks();
        }
    }

    private renderTask(task: Task): void {
        const taskList = document.querySelector(`.tasks[data-status="${task.status}"]`);
        if (!taskList) return;

        const taskElement = document.createElement('div');
        taskElement.className = `task-card ${task.status}`;
        taskElement.dataset.taskId = task.id;
        taskElement.draggable = true;

        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <span class="priority ${task.priority}">${task.priority}</span>
        `;

        taskList.appendChild(taskElement);
    }

    private renderAllTasks(): void {
        document.querySelectorAll('.tasks').forEach(taskList => {
            taskList.innerHTML = '';
        });

        this.tasks.forEach(task => this.renderTask(task));
    }

    private saveTasks(): void {
        localStorage.setItem('kanban-tasks', JSON.stringify(this.tasks));
    }

    private loadTasks(): void {
        const savedTasks = localStorage.getItem('kanban-tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderAllTasks();
        }
    }
}

// Initialize the Kanban board when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KanbanBoard();
});