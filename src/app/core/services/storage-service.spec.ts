import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { StorageService } from './storage-service';
import { TaskStore } from '../../features/dashboard/data-access/task-store';

describe('StorageService', () => {
  let service: StorageService;
  const nextTick = () => new Promise<void>((r) => setTimeout(r, 0));
  const storageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    getJson: vi.fn(),
    setJson: vi.fn(),
  };

  beforeEach(() => {
    storageMock.getJson.mockReset();
    storageMock.setJson.mockReset();
    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageMock }],
    });
    service = TestBed.inject(StorageService);
  });

  it('should load tasks from storage when valid data exists', () => {
    storageMock.getJson.mockReturnValue([
      { id: 10, title: 'Stored', done: false, description: '' },
    ]);

    const store = TestBed.inject(TaskStore);

    expect(store.tasks().length).toBe(1);
    expect(store.tasks()[0].id).toBe(10);
  });

  it('should persist tasks on changes', async () => {
    storageMock.getJson.mockReturnValue(null);

    const store = TestBed.inject(TaskStore);

    store.toggleTask(1);

    await nextTick();

    expect(storageMock.setJson).toHaveBeenCalled();
    expect(storageMock.setJson).toHaveBeenCalledWith('task-flow-lite.tasks.v1', store.tasks());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
