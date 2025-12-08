export const createNewNode = (newNodeId : string , newPosition : { x : number , y : number } , label : string , nodeType : string ,title : string ) => {
     
    return {
        id: newNodeId,
        position: {
            x : newPosition.x ,
            y : newPosition.y 
        },
        data: { 
            label: title,
            data : title ,
        },
        type: nodeType
    };
    
}