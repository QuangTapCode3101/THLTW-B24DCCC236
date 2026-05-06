import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
// Nếu lỗi React 18 thì đổi thành:
// from '@hello-pangea/dnd'

import { Card, Row, Col, Tag, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { getTasks, saveTasks } from '@/utils/taskStorage';
import { Task, TaskStatus } from '@/types/task';
import styles from './index.less';
import dayjs from 'dayjs';

const { Text } = Typography;

const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Cần làm' },
    { id: 'inprogress', title: 'Đang làm' },
    { id: 'done', title: 'Hoàn thành' },
];

export default function Kanban() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(getTasks());
    }, []);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        // Nếu kéo cùng cột thì bỏ qua
        if (destination.droppableId === source.droppableId) return;

        const updatedTasks = tasks.map((task) =>
            task.id.toString() === draggableId
                ? {
                      ...task,
                      status: destination.droppableId as TaskStatus,
                  }
                : task,
        );

        setTasks(updatedTasks);
        saveTasks(updatedTasks); // lưu localStorage
    };

    const renderPriorityTag = (priority: string) => {
        switch (priority) {
            case 'high':
                return <Tag color="red">Cao</Tag>;
            case 'medium':
                return <Tag color="orange">Trung bình</Tag>;
            case 'low':
                return <Tag color="green">Thấp</Tag>;
            default:
                return null;
        }
    };

    const isOverdue = (deadline: string) => {
        return dayjs(deadline).isBefore(dayjs(), 'day');
    };

    return (
        <div className={styles.kanbanWrapper}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Row gutter={16}>
                    {columns.map((col) => (
                        <Col span={8} key={col.id}>
                            <Card
                                title={col.title}
                                className={styles.columnCard}
                            >
                                <Droppable droppableId={col.id}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={styles.columnBody}
                                        >
                                            {tasks
                                                .filter(
                                                    (t) =>
                                                        t.status === col.id,
                                                )
                                                .map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <Card
                                                                size="small"
                                                                className={
                                                                    styles.taskCard
                                                                }
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.taskHeader
                                                                    }
                                                                >
                                                                    <Text strong>
                                                                        {
                                                                            task.title
                                                                        }
                                                                    </Text>
                                                                    {renderPriorityTag(
                                                                        task.priority,
                                                                    )}
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.taskTags
                                                                    }
                                                                >
                                                                    {task.tags?.map(
                                                                        (tag) => (
                                                                            <Tag
                                                                                key={
                                                                                    tag
                                                                                }
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </Tag>
                                                                        ),
                                                                    )}
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.deadline
                                                                    }
                                                                >
                                                                    <Text
                                                                        type={
                                                                            isOverdue(
                                                                                task.deadline,
                                                                            )
                                                                                ? 'danger'
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        Deadline:{' '}
                                                                        {dayjs(
                                                                            task.deadline,
                                                                        ).format(
                                                                            'DD/MM/YYYY',
                                                                        )}
                                                                    </Text>
                                                                </div>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))}

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </DragDropContext>
        </div>
    );
}