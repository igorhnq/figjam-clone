import React, { useCallback, useRef } from 'react'; 
import * as Toolbar from '@radix-ui/react-toolbar';
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
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import colors from 'tailwindcss/colors';

import { NODE_TYPES } from './constants/nodeTypes';

import './global.css';

export default function App() {
    const reactFlowWrapper = useRef(null); 
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback((connection) => {
        const edge = { ...connection, type: 'step' };
        setEdges((eds) => addEdge(edge, eds));
    }, [setEdges]);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode = {
            id: crypto.randomUUID(),
            type,
            position,
            data: {},
        };

        setNodes((nds) => nds.concat(newNode));
    }, [screenToFlowPosition, setNodes]);

    return (
        <div className="w-screen h-screen" ref={reactFlowWrapper} onDragOver={onDragOver} onDrop={onDrop}>
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
                <Background 
                    variant="dots" 
                    gap={12} 
                    size={2} 
                    color={colors.zinc[200]} 
                />
            </ReactFlow>
            <Toolbar.Root className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-3xl overflow-hidden">
                <Toolbar.Button
                    onDragStart={(event) => onDragStart(event, 'square')}
                    draggable
                    className="w-32 h-32 mt-6 bg-violet-500 rounded transition-transform hover:-translate-y-2 cursor-grab" 
                />
            </Toolbar.Root>
        </div>
    );
}