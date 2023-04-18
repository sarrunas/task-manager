using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required"), MinLength(3, ErrorMessage = "Username must contain at least 3 characters")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required"), DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must contain at least 8 characters")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm password is required")]
        [DataType(DataType.Password), Compare(nameof(Password), ErrorMessage ="Passwords do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}