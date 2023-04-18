using System.Security.Claims;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{   [Authorize]
    [ApiController]
    [Route("")]
    public class ListsController : ControllerBase
    {
        private readonly ListsService _listsService;
        private readonly TasksService _tasksService;
        private readonly UserManager<ApplicationUser> _userManager;

        public ListsController(ListsService listsService, TasksService tasksService, UserManager<ApplicationUser> userManager)
        {
            _listsService = listsService;
            _userManager = userManager;
            _tasksService = tasksService;
        }

        [HttpGet("lists")]
        public async Task<IActionResult> Get() 
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId is not null) 
            {
                List<Lists> lists = await _listsService.GetAsync(userId);
                return Ok(lists);
            }
            return NoContent();
        }

        [HttpGet("lists/{id}")]
        public async Task<IActionResult> GetOne(string id) 
        {
            Lists list = await _listsService.GetOneAsync(id);
            return list is null ? NotFound() : Ok(list);
        }

        [HttpPost("lists")]
        public async Task<IActionResult> Post([FromBody] Lists newList)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId is not null) newList._userId = userId;
            await _listsService.CreateAsync(newList);
            return Ok(newList);
        }

        [HttpPut("lists/{id}")]
        public async Task<IActionResult> Update(string id, Lists updatedList) 
        {
            var list = await _listsService.GetOneAsync(id);
            if(list is null) return NotFound();

            updatedList.Id = list.Id;
            updatedList._userId = list._userId;
            await _listsService.UpdateAsync(id, updatedList);

            return NoContent();
        }

        [HttpDelete("lists/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _listsService.RemoveAsync(id);
            await _tasksService.RemoveAllTasksByListAsync(id);
            return NoContent();
        }
    }
}