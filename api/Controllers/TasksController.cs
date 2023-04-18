using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("")]
    public class TasksController : ControllerBase
    {
        private readonly TasksService _tasksService;

        public TasksController(TasksService tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpGet("lists/{listId}/tasks")]
        public async Task<IActionResult> Get(string listId) 
        {
            List<Tasks> tasks = await _tasksService.GetAsync(listId);
            return tasks is null ? NotFound() : Ok(tasks);
        }

        [HttpGet("lists/{listId}/tasks/{taskId}")]
        public async Task<IActionResult> GetOne(string taskId) 
        {
            Tasks task = await _tasksService.GetOneAsync(taskId);
            return task is null ? NotFound() : Ok(task);
        }

        [HttpPost("lists/{listId}/tasks")]
        public async Task<IActionResult> Post([FromBody] Tasks newTask, string listId)
        {
            newTask.ListId = listId;
            await _tasksService.CreateAsync(newTask);
            return Ok();
        }

        [HttpPut("lists/{listId}/tasks/{taskId}")]
        public async Task<IActionResult> Update(string taskId, Tasks updatedTask, string listId) 
        {
            var task = await _tasksService.GetOneAsync(taskId);
            if(task is null) return NotFound();

            updatedTask.Id = taskId;
            updatedTask.ListId = listId;
            await _tasksService.UpdateAsync(taskId, updatedTask);

            return NoContent();
        }

        [HttpDelete("lists/{listId}/tasks/{taskId}")]
        public async Task<IActionResult> Delete(string taskId)
        {
            await _tasksService.RemoveAsync(taskId);
            return NoContent();
        }
        
    }
}