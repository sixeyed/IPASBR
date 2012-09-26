using System.Linq;

namespace Sixeyed.Ipasbr.Services
{
    public class FormatService : IFormatService
    {
        public string ReverseString(string input)
        {
            return new string(input.Reverse().ToArray());
        }
    }
}
