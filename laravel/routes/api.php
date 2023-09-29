<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('all_tasks');
    Route::post('/save', [TaskController::class, 'save'])->name('save_task');
    Route::put('/update/{id}', [TaskController::class, 'save'])->name('update_task');
    Route::delete('/delete/{id}', [TaskController::class, 'delete'])->name('delete_task');
});