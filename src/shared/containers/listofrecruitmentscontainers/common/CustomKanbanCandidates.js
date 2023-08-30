import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Constants from "utils/Constants";
import { useHistory } from "react-router";
import useQuery from "hooks/use-query";
import Validator from "utils/Validator";
import styles from './CustomKanbanCandidates.module.scss';

export default function CustomKanbanCandidates(props) {
    const initialColumns = {
        todo: {
          id: 'todo',
          title: 'To Do',
          taskIds: ['task-1', 'task-2', 'task-3'],
        },
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          taskIds: [],
        },
        done: {
          id: 'done',
          title: 'Done',
          taskIds: [],
        },
      };
      
      const initialTasks = {
        'task-1': { id: 'task-1', content: 'Task 1 content' },
        'task-2': { id: 'task-2', content: 'Task 2 content' },
        'task-3': { id: 'task-3', content: 'Task 3 content' },
      };
      const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);

      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      setColumns({
        ...columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      });
    }
  };
    return (
        <div className={styles["App"]}>
      <div className={styles["kanban-board"]}>
        {Object.values(columns).map((column) => (
          <div key={column.id} className={styles["column"]}>
            <h3>{column.title}</h3>
            <div className={styles["task-list"]}>
              {column.taskIds.map((taskId, index) => (
                <div key={taskId} className={styles["task"]}>
                  {tasks[taskId].content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>


    );
}