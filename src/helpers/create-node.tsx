export const createNewNode = (newNodeId : string , newPosition : { x : number , y : number } , label : string , nodeType : string ,title : string ) => {
     
    return {
        id: newNodeId,
        position: newPosition,
        data: { 
            label: title,
            data : title ,
        },
        type: nodeType
    };
    
}