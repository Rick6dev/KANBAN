import { Draggable,DragDropContext,Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import { Card } from '../card/Card'
import './Kanban.scss'
import { useState } from 'react'
// Importados el arrastras y soltar
export const Kanban = () => {
    const [data,setData] = useState(mockData);
    const onDragEnd=(result)=>{
        if(!result.destination) return;
        const {source,destination}=result;
        if(source.droppableId!== destination.droppableId){
            // Extraemos el id del origen y del destino
            const sourceColIndex = data.findIndex(e=>e.id==source.droppableId);
            const destinationColIndex= data.findIndex(e=>e.id===destination.droppableId);
           console.log(destinationColIndex)
           
            const sourceCol=data[sourceColIndex]
            const destinationCol=data[destinationColIndex];
            // Coverimos un array a una lista
            const  sourceTask=[...sourceCol.tasks];
            const  destinationTask=[...destinationCol.tasks]

            const [removed]=sourceTask.splice(source.index,1)
            destinationTask.splice(destination.index,0,removed)

            data[sourceColIndex].tasks=sourceTask
            data[destinationColIndex].tasks=destinationTask

            setData(data)
        }
    }

    const onDragEnd7= (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
    
        if (source.droppableId !== destination.droppableId) {
          const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
          const destinationColIndex = data.findIndex(
            (e) => e.id === destination.droppableId
          );
    
          const sourceCol = data[sourceColIndex];
          const destinationCol = data[destinationColIndex];
    
          const sourceTask = [...sourceCol.tasks];
          const destinationTask = [...destinationCol.tasks];
    
          const [removed] = sourceTask.splice(source.index, 1);
          destinationTask.splice(destination.index, 0, removed);
    
          data[sourceColIndex].tasks = sourceTask;
          data[destinationColIndex].tasks = destinationTask;
    
          setData(data);
        }
      };
  return (
    <div>
<DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban__section"
                ref={provided.innerRef}
              >
                <div className="kanban__section__title">{section.title}</div>
                <div className="kanban__section__content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>

    </div>
  )
}
