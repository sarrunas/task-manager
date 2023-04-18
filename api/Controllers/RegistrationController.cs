using api.Data;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("")]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public RegistrationController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Route("roles/add")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            var appRole = new ApplicationRole { Name = request.Role };
            var createRole = await _roleManager.CreateAsync(appRole);

            return Ok();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        [HttpGet]
        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var userExists = await _userManager.FindByNameAsync(request.Username);
                if(userExists != null) return new RegisterResponse { Message = "User already exists", Success = false };

                userExists = new ApplicationUser
                {
                    UserName = request.Username,
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                var createUser = await _userManager.CreateAsync(userExists, request.Password);
                if(!createUser.Succeeded) return new RegisterResponse 
                { 
                    Message = $"{createUser?.Errors?.First()?.Description}",
                    Success = false 
                };

                var addUserToRole = await _userManager.AddToRoleAsync(userExists, "USER");
                if(!addUserToRole.Succeeded) return new RegisterResponse
                {
                    Message = $"Could not add user to role {addUserToRole?.Errors?.First()?.Description}",
                    Success = false
                };

                return new RegisterResponse
                {
                    Success = true,
                    Message = "User registered successfully"
                };
            }
            catch(Exception ex)
            {
                return new RegisterResponse { Message = ex.Message, Success = false };
            }
        }

    }
}