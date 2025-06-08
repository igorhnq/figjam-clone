import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionMode,
    ConnectionLineType,
} from '@xyflow/react';
import colors from 'tailwindcss/colors' 

import { NODE_TYPES } from './constants/nodeTypes';

import '@xyflow/react/dist/style.css';
import './global.css';
 
const INITIAL_NODES = [
    {
        id: '1',
        type: 'square',
        position: {
            x: 0,
            y: 0,
        },
        data: {},
    },
    {
        id: '2',
        type: 'square',
        position: {
            x: 500,
            y: 0,
        },
        data: {},
    }
] satisfies Node[]

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'step',
    },
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'step',
    }
] 
 
export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection) => {
        const edge = { ...connection, type: 'step' };
        setEdges((eds) => addEdge(edge, eds));
    }, [setEdges]);

    return (
        <div className="w-screen h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={NODE_TYPES}
                connectionMode={ConnectionMode.Loose}
                connectionLineType={ConnectionLineType.Step}
            >
                <Controls />
                    <MiniMap />
                    <Background 
                    variant="dots" 
                    gap={12} 
                    size={2} 
                    color={colors.zinc[200]} 
                />
            </ReactFlow>
        </div>
    );
}