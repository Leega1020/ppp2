import threading
import time

def print_numbers():
    for i in range(5):
        #time.sleep(1)
        print(f"Thread 1: {i}")

def print_letters():
    for letter in 'ABCDE':
        #time.sleep(1)
        print(f"Thread 2: {letter}")

# 創建兩個執行緒
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_letters)

# 啟動執行緒
thread1.start()
thread2.start()

# 等待兩個執行緒完成
thread1.join()
thread2.join()

print("Main thread exiting.")
