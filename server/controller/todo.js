import Todo from '../model/todo.js';

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newTodo = await Todo.create({ title, description });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: newTodo,
        });
    } catch (error) {
        console.error("Error in todo creation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find();
        console.log(todos);
        return res.status(200).json({
            success: true,
            todos
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const updateTodo = async(req, res) => {
    try{
        const todoId = req.params.todoId;
        const title = req.body.title;
        const todo = await Todo.findByIdAndUpdate(todoId, { title }, { new: true });
        return res.status(200).json({
            success: true,
            todo,
            message: "Todo updated successfully"
        });
          
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const deleteTodo = async(req, res) => {
    try{
        const todoId = req.params.todoId;
        await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });  
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
}