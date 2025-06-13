import type { NodeProps } from '@xyflow/react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { useState, useEffect } from 'react';

export default function Square({ selected, data, id }: NodeProps) {
    const showHandles = selected || data?.isConnectingTarget;
    const [text, setText] = useState(data?.label || '');

    useEffect(() => {
        setText(data?.label || '');
    }, [data?.label]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div className="bg-pink-300 rounded w-full h-full min-w-[200px] min-h-[200px] relative p-4">
            <NodeResizer
                minWidth={200}
                minHeight={200}
                isVisible={selected}
                lineClassName='!border-blue-400'
                handleClassName='!h-3 !w-3 !bg-white !border-2 !rounded !border-blue-400'
            />
            <textarea
                value={text}
                onChange={handleChange}
                className="bg-none text-black rounded  resize-none focus:outline-none w-full h-full text-left text-neutral-800"
                placeholder="Type anything... @mention anyone"
            />
            <Handle 
                id="top"
                type="source"
                position={Position.Top}
                className={`!-top-5 !w-3 !h-3 !bg-blue-400/80 ${showHandles ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <Handle 
                id="right" 
                type="source" 
                position={Position.Right}
                className={`!-right-5 !w-3 !h-3 !bg-blue-400/80 ${showHandles ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <Handle 
                id="bottom"
                type="source"
                position={Position.Bottom}
                className={`!-bottom-5 !w-3 !h-3 !bg-blue-400/80 ${showHandles ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <Handle 
                id="left" 
                type="source" 
                position={Position.Left}
                className={`!-left-5 !w-3 !h-3 !bg-blue-400/80 ${showHandles ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
        </div>
    );
}
