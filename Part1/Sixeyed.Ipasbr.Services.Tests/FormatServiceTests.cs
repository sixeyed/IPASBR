using System;
using System.Linq;
using System.Net;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Sixeyed.Ipasbr.Services.Tests
{
    [TestClass]
    public class FormatServiceTests
    {
        [TestMethod]
        public void ReverseString_REST()
        {
            var input = Guid.NewGuid().ToString();
            var expected = new string(input.Reverse().ToArray());
            var url = string.Format("http://localhost/Sixeyed.Ipasbr.Services/FormatService.svc/rest/reverse?string={0}", input);
            var client = new WebClient();
            var actual = client.DownloadString(url).Replace("\"", string.Empty);
            Assert.AreEqual(expected, actual);
        }
    }
}
