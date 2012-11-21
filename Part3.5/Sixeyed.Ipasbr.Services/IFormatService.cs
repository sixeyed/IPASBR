using System.ServiceModel;
using System.ServiceModel.Web;

namespace Sixeyed.Ipasbr.Services
{
    [ServiceContract(Namespace=TargetNamespace.SixeyedIpasbr)]
    public interface IFormatService
    {
        [OperationContract]
        [WebGet(UriTemplate = "reverse?string={input}", ResponseFormat=WebMessageFormat.Json)]
        string ReverseString(string input);
    }
}
