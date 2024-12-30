import React, { useState } from 'react';
import { Button} from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import Navbar from '../pages/Navbar';
import axios from 'axios';

function Home() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { toast } = useToast();  
  
   
const addTodoHandle = async () => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/todos/',
      { title, description },
      { withCredentials: true }
    );
    
      
      if (res.status === 200) {
          toast({
              title: "Success",
              description: res.data.message,
          });
          setTitle('');
          setDescription('');
      }
  } catch (err) {
      toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data?.message || 'An error occurred',
      });
      console.log(err);
  }
};

  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5 ml-5">
        <div className="w-fit">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter your TODO"
            className="w-fit"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write Description of your TODO"
            className="w-1/4 mt-2"
          />
        </div>
        <Button onClick={addTodoHandle}>Add TODO</Button>
      </div>
    </div>
  )
}

export default Home