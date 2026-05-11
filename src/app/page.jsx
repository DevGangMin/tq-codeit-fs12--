"use client";

// useState: 상태 관리 / useEffect: 컴포넌트 마운트 시 사이드이펙트 실행
import { useState, useEffect } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "@/api/todos";

export default function Home() {
  // 초기값 설정
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 서버에서 할 일 목록을 가져와 상태를 업데이트하는 함수
  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
    // 데이터 로드 완료 후 로딩 상태 해제
    setIsLoading(false);
  };

  // 컴포넌트가 처음 렌더링될 때 1회만 실행
  useEffect(() => {
    loadTodos();
  }, []);

  // isLoading이 true인 동안 로딩 UI를 먼저 렌더링 (조기 반환)
  if (isLoading) {
    return (<div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>
      <div className="max-w-md mx-auto mt-8">
        {/* <TodoForm loadTodos={loadTodos} /> */}
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
