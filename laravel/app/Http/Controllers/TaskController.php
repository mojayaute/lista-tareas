<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Log;

class TaskController extends Controller
{

    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }


    public function save(Request $request, $id = null)
    {
        try {
            $task = Task::updateOrCreate(['id' => $id], $request->all() );
            return response()->json(['status' => true, 'message' => 'Tarea Guardada.', 'data' => $task], 200);

        } catch (\Exception $e) {
            Log::info("TaskController->save() | " . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }

    public function delete($id)
    {
        try {
            if (!Task::where('id', $id)->exists()) {
                return response()->json(['status' => false, 'message' => 'No existe esta tarea.', 'data' => null], 404);
            }
            $task = Task::findOrFail($id);

            if ($task->likes > 0){ 
                return response()->json(['status' => false, 'message' => 'Esta tarea tiene tareas relacionadas', 'data' => null], 200);
            }
            
            $task->delete();
            return response()->json(['status' => true, 'message' => 'Tarea borrada.', 'data' => $task], 200);
        } catch (\Exception $e) {
            Log::info("TaskController->delete() | " . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }
}