import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Text,
  theme,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])

  const addTask = e => {
    e.preventDefault();

    if (newTask.length > 0) {
      setTasks(prevState => [
        ...prevState,
        {text: newTask, isChecked: false}
      ])
      setNewTask('')
    }
  }

  const updateTask = (index, checked) => {
    let newTasks = [...tasks]
    newTasks[index].isChecked = checked
    setTasks(newTasks)
  }

  const removeTask = index => {
    let newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <ChakraProvider theme={theme}>
          <ColorModeSwitcher justifySelf="flex-end" />

          <>
            <Flex w='100%' h='100vh'>
            <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%'>
              <Text fontWeight='700' fontSize={30}>Tasks</Text>
              <form onSubmit={addTask}>
                <Flex mt='2%'>
                  <Input value={newTask} onChange={e => setNewTask(e.target.value)} variant='flushed' placeholder='Add task' w='50%' />
                  <Button onClick={addTask} ml={5} bg='cyan.700'>Add Task</Button>
                  </Flex>
              </form>
              <Tabs mt='2%' w='100%'>
                <TabList>
                  <Tab>Incomplete Tasks</Tab>
                  <Tab>Completed Tasks</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                   {tasks.map((task, index) => (
                    !task.isChecked ? <TaskItem removeTask={removeTask} updateTask={updateTask} key={index} task={task} index={index} /> : null
                   ))}
                  </TabPanel>
                  <TabPanel>
                  {tasks.map((task, index) => (
                    task.isChecked ? <TaskItem removeTask={removeTask} updateTask={updateTask} key={index} task={task} index={index} /> : null
                   ))}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
          </>
    </ChakraProvider>
  );
}

const TaskItem = ({task, index, updateTask, removeTask}) => {
  return(
    <Checkbox onChange={e => updateTask(index, e.target.checked)} colorScheme='green' mb={10} w='100%' fleDir='row' isChecked={task.isChecked}>
      <Flex w='100%' flexDir='row'>
        <Text alignSelf='center'>{task.text}</Text>
        <IconButton onClick={() => removeTask(index)} bg='red.600' pos='absolute' right={0} icon={<DeleteIcon />} />
      </Flex>
    </Checkbox>
  )
}

export default App;
