import { useQueueVisualizer } from './useQueueVisualizer';
import CodePanel from '../../UI/CodePanel';
import { QueueHeader } from './QueueHeader';
import { QueueVisualization } from './QueueVisualization';
import { QueueDirectionIndicator } from './QueueDirectionIndicator';
import { QueueControls } from './QueueControls';
import { QueueInfo } from './QueueInfo';
import { dataStructureCode } from '../../../data/dataStructureCode';

export default function QueueVisualizer() {
  const {
    items,
    inputValue,
    lastAction,
    highlightIndex,
    activeLines,
    inputRef,
    handleInputChange,
    handleEnqueue,
    handleDequeue,
    handlePeek,
    handleClear
  } = useQueueVisualizer();

  return (
    <div className="card">
      <QueueHeader />
      <h2 className="text-2xl font-bold mb-4">Queue (FIFO)</h2>
      
      <QueueVisualization items={items} highlightIndex={highlightIndex} />
      
      <QueueDirectionIndicator visible={items.length > 0} />
      
      <QueueControls
        inputValue={inputValue}
        lastAction={lastAction}
        inputRef={inputRef}
        onInputChange={handleInputChange}
        onEnqueue={handleEnqueue}
        onDequeue={handleDequeue}
        onPeek={handlePeek}
        onClear={handleClear}
      />
      
      <QueueInfo size={items.length} />

      <div className="mt-6">
        <CodePanel title="Queue" code={dataStructureCode.queue} activeLines={activeLines} />
      </div>
    </div>
  );
}