import {Handle, Position} from '@xyflow/react'
import { useCallback } from 'react'
import './style.css'

const handleStyle = { left: 10}

const TextUpdaterNode = ({data, isConnectable}) => {

  const onChange = useCallback(
    evt => console.log(evt.target.value)
  )

  return(
    <div className='text-updater-node'>
      <Handle 
        type='target' 
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input type="text" name='text' onChange={onChange}/>
      </div>
      <Handle 
        type='source' 
        position={Position.Bottom} 
        id='a'
        isConnectable={isConnectable}
      />
      <Handle 
        type='source' 
        position={Position.Bottom} 
        id='b'
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  )
}

export default TextUpdaterNode